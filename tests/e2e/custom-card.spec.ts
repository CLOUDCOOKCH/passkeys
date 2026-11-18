import { readFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'
import { PDFDocument } from 'pdf-lib'

const uiText = {
  de: { front: 'Vorderseite', back: 'Rückseite', download: 'PDF herunterladen' },
  en: { front: 'Front', back: 'Back', download: 'Download PDF' },
}

for (const ui of ['de', 'en'] as const) {
  const route = ui === 'de' ? './' : 'en/'
  const cardLang = ui === 'de' ? 'en' : 'de'

  test(`the ${ui} guide and poster library both lead to the card builder`, async ({ page }) => {
    for (const entry of ['microsoft-365', 'library']) {
      await page.goto(route + '#' + entry)
      const link = page.locator(`#${entry} a[href="#m365-card-builder"]`).first()
      await expect(link).toHaveAccessibleName(/\S/)
      await link.click()
      await expect(page).toHaveURL(/#m365-card-builder$/)
      await expect(page.locator('#m365-card-builder')).toBeInViewport()
    }
  })

  test(`a ${ui} reader can personalise and download a two-sided ${cardLang} card`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(route + '#m365-card-builder')
    const builder = page.locator('#m365-card-builder')
    const preview = builder.locator('.custom-card-preview')
    const method = builder.locator('#card-method')
    const language = builder.locator('#card-language')
    const company = builder.locator('#card-company')
    const contact = builder.locator('#card-contact')
    for (const control of [method, language, company, contact]) {
      await expect(control).toHaveAccessibleName(/\S/)
    }
    await language.selectOption(cardLang)
    await expect(page.locator('html')).toHaveAttribute('lang', ui === 'de' ? 'de-CH' : 'en')
    await expect(preview).toHaveAttribute('lang', cardLang === 'de' ? /^de(?:-CH)?$/ : 'en')

    const companyName = 'Atelier Zürich'
    const helpDesk = 'Service Desk 4242'
    await company.fill(companyName)
    await contact.fill(helpDesk)
    const text = uiText[ui]
    const front = builder.getByRole('button', { name: text.front, exact: true })
    const back = builder.getByRole('button', { name: text.back, exact: true })
    await front.click()
    await expect(front).toHaveAttribute('aria-pressed', 'true')
    await method.selectOption('key')
    await expect(preview).toContainText(cardLang === 'en' ? /security key/i : /Sicherheitsschlüssel/i)
    await expect(preview).toContainText(companyName)
    await expect(preview).not.toContainText(helpDesk)
    await method.selectOption('authenticator')
    await expect(preview).toContainText('Authenticator')
    await back.focus()
    await page.keyboard.press('Enter')
    await expect(back).toHaveAttribute('aria-pressed', 'true')
    await expect(preview).toContainText(companyName)
    await expect(preview).toContainText(helpDesk)
    const guideUrl = new URL(await preview.getByRole('link').getAttribute('href') ?? '')
    expect(guideUrl.hash).toBe('#m365-authenticator')
    expect(guideUrl.pathname.endsWith('/en/')).toBe(cardLang === 'en')

    const ready = page.waitForEvent('download')
    await builder.getByRole('button', { name: text.download, exact: true }).click()
    const download = await ready
    expect(download.suggestedFilename()).toBe(`passkeys-first-day-authenticator-${cardLang}.pdf`)
    const saved = await download.path()
    if (!saved) throw new Error('The customised card was not downloaded')
    const pdf = await PDFDocument.load(await readFile(saved))
    expect(pdf.getPageCount()).toBe(2)
    for (const side of pdf.getPages()) {
      expect(side.getWidth() * 25.4 / 72).toBeCloseTo(105, 1)
      expect(side.getHeight() * 25.4 / 72).toBeCloseTo(148, 1)
    }
  })
}

test('print uses both personalised sides of the selected card', async ({ page }) => {
  await page.addInitScript(() => {
    window.print = () => {
      const sheets = [...document.querySelectorAll<HTMLElement>('.custom-card-print .card-sheet')]
      document.body.dataset.observedPrint = JSON.stringify({
        selected: document.body.hasAttribute('data-print-custom-card'),
        sides: sheets.map(sheet => sheet.textContent),
      })
    }
  })
  await page.goto('en/#m365-card-builder')
  const builder = page.locator('#m365-card-builder')
  await builder.locator('#card-company').fill('Atlas Workshop')
  await builder.locator('#card-contact').fill('Support 707')
  await builder.getByRole('button', { name: 'Print card', exact: true }).click()
  await expect(page.locator('body')).toHaveAttribute('data-observed-print', /Atlas Workshop/)
  const observed = JSON.parse((await page.locator('body').getAttribute('data-observed-print'))!) as {
    selected: boolean; sides: string[]
  }
  expect(observed.selected).toBe(true)
  expect(observed.sides).toHaveLength(2)
  expect(observed.sides[0]).toContain('Atlas Workshop')
  expect(observed.sides[1]).toContain('Support 707')
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('.custom-card-print .card-sheet:visible')).toHaveCount(2)
  await expect(page.locator('.rs-print')).toBeHidden()
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')))
  await expect(page.locator('body')).not.toHaveAttribute('data-print-custom-card', '')
})
