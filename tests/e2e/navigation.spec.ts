import { expect, test } from '@playwright/test'
import { switchLanguage } from './language-link'

for (const [target, lesson] of [
  ['compare', 'first sign-in comparison'],
  ['business', 'business adoption guide'],
  ['how-technical', 'technical explanation'],
] as const) {
  test(`learning path opens the ${lesson} and survives a language switch`, async ({ page, baseURL }) => {
    await page.goto('./')
    await expect(page.locator('html')).toHaveAttribute('lang', 'de-CH')
    await page.locator(`#paths a[href$="#${target}"]`).click()
    const section = page.locator(`#${target}`)
    await expect(section).toBeInViewport()
    await switchLanguage(page, 'en')
    await expect(page).toHaveURL(new URL(`en/#${target}`, baseURL).href)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(section).toBeInViewport()
    if (target === 'how-technical') await expect(section).toHaveAttribute('open', '')
    await page.reload()
    await expect(section).toBeInViewport()
    await switchLanguage(page, 'de-CH')
    await expect(page).toHaveURL(new URL(`#${target}`, baseURL).href)
  })
}

for (const width of [375, 768, 1440]) {
  test(`production page loads and fits a ${width}px viewport`, async ({ page, baseURL }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    page.on('response', response => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
    })
    await page.setViewportSize({ width, height: 850 })
    await page.goto('./')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const sections = ['compare', 'how', 'options', 'wizard', 'setup', 'business', 'playground', 'quiz', 'faq']
    for (const id of sections) await page.locator(`#${id}`).scrollIntoViewIfNeeded()
    await page.evaluate(() => document.fonts.ready.then(() => undefined))
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
    }))
    expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport + 1)
    const assetPaths = await page.evaluate(() => performance.getEntriesByType('resource').map(entry => entry.name))
    expect(assetPaths.filter(url => url.startsWith(new URL(baseURL!).origin) && !url.startsWith(baseURL!))).toEqual([])
    expect(errors).toEqual([])
  })
}

test('language switching preserves a manually reached section', async ({ page, baseURL }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  await page.getByRole('heading', { level: 1 }).waitFor()
  await page.evaluate(() => document.fonts.ready.then(() => undefined))
  const quiz = page.locator('#quiz')
  await quiz.evaluate(element => element.scrollIntoView({ block: 'start' }))
  await expect(quiz.getByRole('heading', { level: 2 })).toBeInViewport()
  await switchLanguage(page, 'en')
  await expect(page).toHaveURL(new URL('en/#quiz', baseURL).href)
  await expect(quiz.getByRole('heading', { level: 2 })).toBeInViewport()
})
