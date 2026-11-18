import { readFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'

const issues = ['m365-missing-passkey', 'm365-phone-only', 'm365-forgot-pin', 'm365-key-rejected']

for (const language of ['en', 'de'] as const) {
  const route = language === 'en' ? 'en/' : './'
  test(`the ${language} first-day guide links the lessons and offers keyboard troubleshooting`, async ({ page }) => {
    await page.goto(route + '#microsoft-365')
    const hub = page.locator('#microsoft-365')
    for (const id of ['m365-practice', 'm365-help', 'm365-authenticator', 'm365-key']) {
      await expect(hub.locator(`a[href="#${id}"]`)).toHaveAccessibleName(/\S/)
      await expect(page.locator(`#${id}`)).toHaveCount(1)
    }
    await hub.locator('a[href="#m365-help"]').click()
    const help = page.locator('#m365-help')
    await expect(help).toBeInViewport()
    for (const id of issues) {
      const symptom = help.locator(`details#${id}`)
      const summary = symptom.locator('summary')
      await expect(summary).toHaveText(/\S/)
      await summary.focus()
      await page.keyboard.press('Enter')
      await expect(symptom).toHaveAttribute('open', '')
      await expect(symptom.locator('p, li').first()).toBeVisible()
      await page.keyboard.press('Enter')
      await expect(symptom).not.toHaveAttribute('open', '')
    }
  })

  test(`the library and ${language} guide download the same local first-day handout`, async ({ page, baseURL }) => {
    await page.goto(route + '#microsoft-365')
    const filename = `m365-first-day-${language}.pdf`
    const url = new URL('handouts/' + filename, baseURL).href
    for (const section of ['#microsoft-365', '#library']) {
      const link = page.locator(`${section} a[href$="/${filename}"]`)
      await expect(link).toHaveJSProperty('href', url)
      await expect(link).toHaveAccessibleName(/\S/)
    }
    const done = page.waitForEvent('download')
    await page.locator(`#library a[href$="/${filename}"]`).click()
    const download = await done
    expect(download.url()).toBe(url)
    const path = await download.path()
    if (!path) throw new Error('The first-day handout was not saved')
    const file = await readFile(path)
    expect(file.toString('ascii', 0, 5)).toBe('%PDF-')
  })
}

const practice = {
  en: {
    correct: ['More options', 'Security key', 'Simulate PIN and touch', 'Finish registration', 'Start a fresh sign-in', 'Office key', 'Confirm sign-in'],
    firstDevice: 'This device', phone: 'Phone or tablet', spareKey: 'Spare key',
    complete: 'Mika is signed in', replay: 'Practise again',
  },
  de: {
    correct: ['Weitere Optionen', 'Sicherheitsschlüssel', 'PIN und Berührung simulieren', 'Registrierung abschliessen', 'Neue Anmeldung starten', 'Büroschlüssel', 'Anmeldung bestätigen'],
    firstDevice: 'Dieses Gerät', phone: 'Handy oder Tablet', spareKey: 'Ersatzschlüssel',
    complete: 'Mika ist angemeldet', replay: 'Noch einmal üben',
  },
}

for (const language of ['en', 'de'] as const) {
  test(`the ${language} security-key simulation allows corrections and a fresh sign-in without authenticator access`, async ({ page }) => {
    const copy = practice[language]
    const calls: string[] = []
    const record = (method: string) => calls.push(method)
    await page.exposeFunction('recordCredentialCall', record)
    await page.addInitScript(() => {
      for (const method of ['get', 'create']) {
        Object.defineProperty(navigator.credentials, method, {
          value: () => (window as unknown as { recordCredentialCall: (name: string) => void }).recordCredentialCall(method),
        })
      }
    })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto((language === 'en' ? 'en/' : './') + '#m365-practice')
    const demo = page.locator('#m365-practice')
    const wrongChoices = new Map([[0, copy.firstDevice], [1, copy.phone], [5, copy.spareKey]])
    for (const [step, action] of copy.correct.entries()) {
      const wrong = wrongChoices.get(step)
      if (wrong) {
        await demo.getByRole('button', { name: wrong, exact: true }).click()
        await expect(demo.getByRole('status')).toHaveText(/\S/)
      }
      const choice = demo.getByRole('button', { name: action, exact: true })
      await choice.focus()
      await page.keyboard.press('Enter')
    }
    await expect(demo.getByRole('heading', { name: copy.complete })).toBeVisible()
    await demo.getByRole('button', { name: copy.replay }).click()
    await expect(demo.getByRole('button', { name: copy.correct[0], exact: true })).toBeVisible()
    expect(calls).toEqual([])
  })
}

for (const language of ['en', 'de'] as const) {
  test(`the ${language} Authenticator guide adapts to phone and sign-in location`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto((language === 'en' ? 'en/' : './') + '#m365-authenticator')
    const guide = page.locator('#m365-authenticator')
    const sameName = language === 'en' ? 'On this phone' : 'Auf diesem Handy'
    const otherName = language === 'en' ? 'On another device' : 'Auf einem anderen Gerät'
    const same = guide.getByRole('button', { name: sameName, exact: true })
    const other = guide.getByRole('button', { name: otherName, exact: true })
    const ios = guide.getByRole('button', { name: 'iPhone', exact: true })
    const android = guide.getByRole('button', { name: 'Android', exact: true })
    await expect(ios).toHaveAttribute('aria-pressed', 'true')
    await expect(same).toHaveAttribute('aria-pressed', 'true')
    await android.click()
    await expect(android).toHaveAttribute('aria-pressed', 'true')
    await expect(guide.getByText(language === 'en' ? /Android 14.*work profile/i : /Android 14.*Arbeitsprofil/)).toBeVisible()
    await other.click()
    await expect(other).toHaveAttribute('aria-pressed', 'true')
    const steps = guide.getByRole('list', { name: 'Android · ' + otherName })
    await expect(steps).toContainText(/Bluetooth/)
    await expect(steps).toContainText(/QR/)
    await ios.click()
    const iosSteps = guide.getByRole('list', { name: 'iPhone · ' + otherName })
    await expect(iosSteps).toContainText(language === 'en' ? /Camera app/i : /Kamera-App/)
    await same.click()
    await expect(guide.getByRole('list', { name: 'iPhone · ' + sameName })).not.toContainText(/QR/)
  })
}
