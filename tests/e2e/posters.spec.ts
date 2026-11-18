import { readFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'

const featured = ['drake', 'expanding-brain', 'always-has-been', 'one-does-not']
const posters = [
  ...featured,
  'theyre-the-same', 'change-my-mind', 'stonks', 'spider-pointing',
  'is-this-a-pigeon', 'waiting-skeleton', 'only-here', 'right-site', 'this-is-fine', 'two-buttons',
]
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

for (const locale of ['de', 'en']) {
  test(`the ${locale} mobile library serves the featured memes and all fourteen downloadable editions`, async ({ page, request, baseURL }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(locale === 'de' ? './#library' : 'en/#library')
    const library = page.getByRole('region', { name: locale === 'de' ? 'Posterbibliothek' : 'Poster library' })
    const cards = library.getByRole('article')
    await expect(cards).toHaveCount(4)
    for (const id of featured) await expect(library.locator(`#poster-${id}`)).toBeVisible()
    await library.getByRole('button', {
      name: locale === 'de' ? 'Alle 14 Poster anzeigen' : 'Show all 14 posters',
    }).click()
    await expect(cards).toHaveCount(posters.length)
    await expect(library.getByText('Meme', { exact: true })).toHaveCount(12)
    for (const id of posters) {
      const card = library.locator(`#poster-${id}`)
      const title = await card.getByRole('heading').innerText()
      await expect(card).toHaveAccessibleName(title)
      const thumbnail = card.getByRole('img')
      await thumbnail.scrollIntoViewIfNeeded()
      await expect(thumbnail).toHaveAccessibleName(/\S/)
      const edition = new URL(`posters/${locale}/${id}`, baseURL)
      await expect(thumbnail).toHaveJSProperty('src', edition.href + '.webp')
      await expect.poll(() => thumbnail.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)

      const printLink = card.locator('a[href$=".html"]')
      await expect(printLink).toHaveJSProperty('href', edition.href + '.html')
      await expect(printLink).toHaveAttribute('target', '_blank')

      for (const format of ['pdf', 'png']) {
        const link = card.locator(`a[download][href$=".${format}"]`)
        await expect(link).toHaveAccessibleName(new RegExp(format, 'i'))
        await expect(link).toHaveJSProperty('href', edition.href + '.' + format)
        const asset = await request.get(edition.href + '.' + format)
        expect(asset.ok()).toBe(true)
        const bytes = await asset.body()
        if (format === 'pdf') expect(bytes.toString('ascii', 0, 5)).toBe('%PDF-')
        else {
          expect(bytes.subarray(0, 8)).toEqual(pngSignature)
          expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([1080, 1350])
        }
        await asset.dispose()
      }

      const links = card.getByRole('link')
      const bounds = await links.evaluateAll(elements => elements.map(link => {
        const { left, right, height } = link.getBoundingClientRect()
        return left >= 0 && right <= document.documentElement.clientWidth && height >= 24
      }))
      expect(bounds.every(Boolean)).toBe(true)
    }
  })
}

test('activating the PDF download saves the chosen poster and keeps the library open', async ({ page }) => {
  await page.goto('./#library')
  const link = page.locator('#poster-drake a[download][href$=".pdf"]')
  const event = page.waitForEvent('download')
  await link.click()
  const download = await event
  expect(download.suggestedFilename()).toBe('passkeys-drake-de.pdf')
  const path = await download.path()
  if (!path) throw new Error('The browser did not save the PDF')
  expect((await readFile(path)).toString('ascii', 0, 5)).toBe('%PDF-')
  await expect(page).toHaveURL(/#library$/)
})

test('keyboard print opens only the selected poster, waits for artwork and allows printing again', async ({ page, context, baseURL }) => {
  await context.addInitScript(() => {
    window.print = () => {
      const { dataset } = document.documentElement
      dataset.printCalls = String(Number(dataset.printCalls ?? 0) + 1)
      dataset.printReady = String(document.fonts.status === 'loaded' &&
        [...document.images].every(image => image.complete && image.naturalWidth > 0))
    }
  })
  await page.goto('en/#poster-waiting-skeleton')
  const card = page.locator('#poster-waiting-skeleton')
  await expect(card).toBeInViewport()
  const title = await card.getByRole('heading').innerText()
  await card.locator('a[download][href$=".png"]').focus()
  await page.keyboard.press('Tab')
  const printLink = card.getByRole('link', { name: /^Print ·/ })
  await expect(printLink).toBeFocused()
  const popup = page.waitForEvent('popup')
  await page.keyboard.press('Enter')
  const view = await popup
  await expect(view).toHaveURL(new URL('posters/en/waiting-skeleton.html', baseURL).href)
  await expect(view.locator('html')).toHaveAttribute('data-print-calls', '1')
  await expect(view.locator('html')).toHaveAttribute('data-print-ready', 'true')
  await expect(page.locator('html')).not.toHaveAttribute('data-print-calls', /\d/)
  await expect(view.getByRole('main')).toHaveAccessibleName(title)
  await expect(view.locator('.poster-sheet')).toHaveCount(1)
  await view.getByRole('button', { name: 'Print', exact: true }).click()
  await expect(view.locator('html')).toHaveAttribute('data-print-calls', '2')
  await view.emulateMedia({ media: 'print' })
  await expect(view.locator('.poster-sheet')).toBeVisible()
  await expect(view.locator('.print-tools')).toBeHidden()
  await expect(view.locator('#business, .rs-print')).toHaveCount(0)
})
