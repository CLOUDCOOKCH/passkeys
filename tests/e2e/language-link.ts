import { expect, type Page } from '@playwright/test'

// A reader can click the sticky header without moving their reading position.
// Locator.click() can scroll the page even when this header is already visible.
export async function switchLanguage(page: Page, locale: 'en' | 'de-CH') {
  const link = page.locator(`header a[hreflang="${locale}"]`)
  await expect(link).toBeInViewport()
  const box = await link.boundingBox()
  if (!box) throw new Error('Language switcher has no visible bounds')
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
}
