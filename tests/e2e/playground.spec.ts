import { readFile } from 'node:fs/promises'
import { expect, test, type Page } from '@playwright/test'

async function observeCredentialRequests(page: Page) {
  const credentialsRequested: string[] = []
  await page.exposeFunction('reportCredentialRequest', (method: string) => credentialsRequested.push(method))
  await page.addInitScript(() => {
    for (const method of ['create', 'get']) {
      Object.defineProperty(navigator.credentials, method, {
        value: () => (window as unknown as {reportCredentialRequest: (method: string) => Promise<void>}).reportCredentialRequest(method),
      })
    }
  })
  return credentialsRequested
}

test('all five playground stations record completion with keyboard and reduced motion', async ({ page }) => {
  const credentialsRequested = await observeCredentialRequests(page)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('en/#playground')
  const demo = page.locator('#playground')
  const activate = async (name: string) => {
    const button = demo.getByRole('button', { name, exact: true })
    await button.focus()
    await expect(button).toBeFocused()
    await page.keyboard.press('Enter')
  }
  const progress = (count: number) => demo.getByText(new RegExp(`\\b${count}\\s*/\\s*5\\b`))
  await expect(progress(0)).toBeVisible()
  await activate('Security key')
  await activate('Insert the key')
  await activate('Simulate verification')
  await expect(demo.getByRole('button', { name: 'Try again' })).toBeVisible()
  await expect(progress(1)).toBeVisible()
  await activate('Phone unlock')
  await activate('Start sign-in')
  await activate('Simulate fingerprint')
  await expect(demo.getByRole('button', { name: 'Try again' })).toBeVisible()
  await expect(progress(2)).toBeVisible()
  await activate('Find the genuine domain')
  await activate('atelier-help.example')
  await expect(progress(2)).toBeVisible()
  await activate('atelier.example')
  await expect(demo.getByRole('button', { name: 'Try again' })).toBeVisible()
  await expect(progress(3)).toBeVisible()
  await activate('Passkey journey')
  await activate('Create passkey')
  await activate('Show storage')
  await activate('Try another device')
  await expect(demo.getByRole('button', { name: 'Try again' })).toBeVisible()
  await expect(progress(4)).toBeVisible()
  await activate('Signature studio')
  await activate('Sign message')
  await expect(demo.getByRole('button', { name: 'Verify signature' })).toBeEnabled()
  await activate('Verify signature')
  await expect(progress(5)).toBeVisible()
  expect(credentialsRequested).toEqual([])
})

test('both sign-in comparisons reach the success state with fictional inputs', async ({ page }) => {
  await page.goto('en/#compare')
  const comparison = page.locator('#compare')
  for (const action of ['Use example username', 'Use example password', 'Confirm example code', 'Choose Mika’s account', 'Simulate confirmation']) {
    await comparison.getByRole('button', { name: action, exact: true }).click()
  }
  await expect(comparison.getByText('Signed in', { exact: true })).toHaveCount(2)
})

test('hero simulation can be completed and replayed with the keyboard under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('en/')
  const hero = page.getByRole('figure', { name: 'Signing in with a passkey' })
  const liveStatus = hero.locator('[aria-live="polite"]')
  const control = hero.getByRole('button')
  const playgroundLink = page.getByRole('link', { name: 'Try a simulation', exact: true })
  await playgroundLink.focus()
  await page.keyboard.press('Tab')
  await expect(control).toBeFocused()

  for (const [action, key, result] of [
    ['Use a passkey', 'Enter', 'Passkey selected'],
    ['Confirm locally', 'Space', 'You’re signed in'],
    ['Replay', 'Enter', 'Password sign-in'],
  ]) {
    await expect(control).toHaveAccessibleName(action)
    await page.keyboard.press(key)
    await expect(liveStatus).toHaveText(result)
    await expect(control).toBeFocused()
  }
})

for (const locale of ['en', 'de'] as const) {
  test(`the ${locale} signature studio verifies exact messages and fresh challenges locally`, async ({ page }) => {
    const isEnglish = locale === 'en'
    const credentialsRequested = await observeCredentialRequests(page)
    // Record outcomes from Chromium's actual implementation without replacing its decisions.
    const nativeResults: boolean[] = []
    await page.exposeFunction('reportSignatureResult', (result: boolean) => nativeResults.push(result))
    await page.addInitScript(() => {
      const subtle = crypto.subtle
      const verify = subtle.verify.bind(subtle)
      subtle.verify = async (...args) => {
        const valid = await verify(...args)
        const observer = window as unknown as { reportSignatureResult(valid: boolean): Promise<void> }
        await observer.reportSignatureResult(valid)
        return valid
      }
    })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(isEnglish ? 'en/#playground' : './#playground')
    const playground = page.locator('#playground')
    const signature = playground.locator('[data-station="signature"]')
    await expect(signature).toHaveAttribute('aria-pressed', 'true')
    const studio = playground.locator('#signature-studio')
    const message = studio.getByRole('textbox', { name: isEnglish ? 'Message' : 'Nachricht' })
    const check = studio.getByRole('button', { name: isEnglish ? 'Verify signature' : 'Signatur prüfen' })
    const save = studio.getByRole('button', {
      name: isEnglish ? 'Save trace as SVG' : 'Kurve als SVG speichern', disabled: false,
    })
    const result = studio.locator('.sig-result[role="status"]')
    const challenge = studio.locator('.sig-challenge code')
    const originalText = await message.inputValue()
    const originalChallenge = await challenge.innerText()
    await expect(result).toHaveAttribute('data-phase', 'ready')
    await expect(check).toBeDisabled()
    await expect(save).toHaveCount(0)
    const text = isEnglish ? 'Studio <West> & Co., 8:00.' : 'Atelier <West> & Co., 8:00 Uhr.'
    await message.fill(text)
    await studio.getByRole('button', { name: isEnglish ? 'Sign message' : 'Nachricht signieren' }).press('Enter')
    await expect(result).toHaveAttribute('data-phase', 'signed')
    await expect(save).toBeVisible()
    await check.press('Enter')
    await expect(result).toHaveAttribute('data-phase', 'verified')

    const curves = await studio.locator('.signature-scope-ribbon path, .signature-scope-overlay path')
      .evaluateAll(paths => paths.map(path => path.getAttribute('d')))
    expect(curves.length).toBeGreaterThan(0)
    const downloaded = page.waitForEvent('download')
    await save.click()
    const file = await downloaded
    expect(file.suggestedFilename()).toMatch(new RegExp(`-${locale}\\.svg$`))
    const savedPath = await file.path()
    if (!savedPath) throw new Error('The browser did not save the signature trace')
    const svg = await page.evaluate((xml) => {
      const document = new DOMParser().parseFromString(xml, 'image/svg+xml')
      return {
        error: document.querySelector('parsererror')?.textContent,
        tag: document.documentElement.localName,
        text: document.documentElement.textContent,
        curves: [...document.querySelectorAll('path[stroke-linejoin="round"]')].map(path => path.getAttribute('d')),
      }
    }, await readFile(savedPath, 'utf8'))
    expect(svg.error).toBeUndefined()
    expect(svg.tag).toBe('svg')
    expect(svg.text).toContain(text)
    expect(svg.curves).toEqual(curves)

    await message.fill(text.replace('8', '9'))
    await expect(result).toHaveAttribute('data-phase', 'changed')
    await expect(save).toHaveCount(0)
    await message.fill(text)
    await expect(result).toHaveAttribute('data-phase', 'verified')

    await playground.locator('[data-station="hardware"]').press('Enter')
    await expect(studio).toBeHidden()
    await signature.press('Enter')
    await expect(message).toHaveValue(text)
    await expect(result).toHaveAttribute('data-phase', 'verified')
    await studio.getByRole('button', { name: isEnglish ? 'New challenge' : 'Neue Challenge' }).press('Space')
    await expect(challenge).not.toHaveText(originalChallenge)
    await expect(result).toHaveAttribute('data-phase', 'changed')
    const nextChallenge = await challenge.innerText()
    await studio.getByRole('button', { name: isEnglish ? 'Sign again' : 'Erneut signieren' }).press('Enter')
    await expect(result).toHaveAttribute('data-phase', 'signed')
    await check.press('Enter')
    await expect(result).toHaveAttribute('data-phase', 'verified')
    await studio.getByRole('button', { name: isEnglish ? 'Start over' : 'Neu starten' }).press('Enter')
    await expect(result).toHaveAttribute('data-phase', 'ready')
    await expect(challenge).not.toHaveText(nextChallenge)
    await expect(message).toHaveValue(originalText)
    await expect(check).toBeDisabled()
    expect(nativeResults).toContain(true)
    expect(nativeResults).toContain(false)
    expect(credentialsRequested).toEqual([])
    await page.reload()
    await expect(playground.getByText(/\b0\s*\/\s*5\b/)).toBeVisible()
  })
}

test('cancelling a phone prompt or losing vault access requires a recovery action before completion', async ({ page }) => {
  await page.goto('en/#playground')
  const lab = page.locator('#playground')
  const choose = (name: string) => lab.getByRole('button', { name, exact: true }).click()
  await choose('Phone unlock')
  await choose('Start sign-in')
  await choose('Device PIN')
  await choose('Cancel request')
  await expect(lab.getByRole('heading', { name: 'Request cancelled' })).toBeVisible()
  await expect(lab.getByText(/\b0\s*\/\s*5\b/)).toBeVisible()
  await choose('Resume verification')
  await choose('Simulate device PIN')
  await expect(lab.getByText(/\b1\s*\/\s*5\b/)).toBeVisible()
  await choose('Passkey journey')
  await choose('Create passkey')
  await choose('Show storage')
  await choose('Vault locked')
  await choose('Try another device')
  await expect(lab.getByText(/\b1\s*\/\s*5\b/)).toBeVisible()
  await choose('Use registered backup')
  await expect(lab.getByRole('heading', { name: 'Signed in with the backup' })).toBeVisible()
  await expect(lab.getByText(/\b2\s*\/\s*5\b/)).toBeVisible()
})
