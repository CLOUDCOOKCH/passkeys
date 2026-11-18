import { expect, test } from '@playwright/test'
import { switchLanguage } from './language-link'

test('the quiz keeps feedback across a reload and can restart after completion', async ({ page }) => {
  await page.goto('en/#quiz')
  const quiz = page.locator('#quiz')
  for (let question = 1; question <= 6; question++) {
    await quiz.locator('button[aria-pressed]').first().click()
    if (question === 1) {
      await page.reload()
      await expect(quiz.locator('button[aria-pressed="true"]')).toHaveCount(1)
    }
    await quiz.getByRole('button', { name: question === 6 ? 'Show result' : 'Next question' }).click()
  }
  await expect(quiz.getByRole('heading', { name: 'Quiz complete' })).toBeVisible()
  await quiz.getByRole('button', { name: 'Try again' }).click()
  await expect(quiz.locator('button[aria-pressed="true"]')).toHaveCount(0)
  await expect(quiz.locator('button[aria-pressed]').first()).toBeEnabled()
})

test('search filters FAQ entries and clearing restores the full list', async ({ page }) => {
  await page.goto('en/#faq')
  const faq = page.locator('#faq')
  const search = faq.getByRole('searchbox')
  const questions = faq.locator('details:visible')
  const available = await questions.count()
  expect(available).toBeGreaterThan(1)
  await search.fill('a-term-without-matches')
  await expect(questions).toHaveCount(0)
  await search.fill('')
  await expect(questions).toHaveCount(available)
  await questions.first().locator('summary').click()
  await expect(questions.first()).toHaveAttribute('open', '')
})

test('the wizard recommends a provider and opens its walkthrough', async ({ page }) => {
  await page.goto('en/#wizard')
  const wizard = page.locator('#wizard')
  for (const [i, choice] of ['Android', 'No, not yet', 'Signing in with devices I already use', 'Myself'].entries()) {
    await wizard.getByRole('radio', { name: choice, exact: true }).check()
    await wizard.getByRole('button', { name: i === 3 ? 'Show recommendation' : 'Continue' }).click()
  }
  await expect(wizard.getByRole('heading', { name: 'Google Password Manager' })).toBeVisible()
  await wizard.getByRole('link', { name: 'Explore this option' }).click()
  await expect(page.locator('#setup')).toBeInViewport()
  await expect(page.locator('#setup-google')).toHaveAttribute('aria-current', 'true')
})

test('all six walkthroughs reach sign-in verification and expose provider help', async ({ page }) => {
  await page.goto('en/#setup')
  const setup = page.locator('#setup')
  for (const id of ['apple', 'google', 'proton', 'bitwarden', '1password', 'hardware']) {
    const link = setup.locator(`#setup-${id}`)
    await link.click()
    await expect(link).toHaveAttribute('aria-current', 'true')
    await expect(setup.getByRole('heading', { name: 'Get ready' })).toBeVisible()
    for (const name of ['Start on the website', 'Confirm where to save', 'Test your sign-in']) {
      await setup.getByRole('button', { name: 'Next step' }).click()
      await expect(setup.getByRole('heading', { name })).toBeVisible()
    }
    await expect(setup.getByRole('link', { name: 'Provider help' })).toHaveAttribute('href', /^https:/)
  }
  await setup.getByText('My setup checklist', { exact: true }).click()
  const check = setup.getByRole('checkbox', { name: 'Tested a fresh sign-in successfully' })
  await check.check()
  await expect(check).toBeChecked()
})

test('a selected provider stays selected when switching languages', async ({ page, baseURL }) => {
  await page.goto('en/#options')
  const explorer = page.locator('#options')
  await explorer.getByRole('button', { name: 'Password managers', exact: true }).click()
  await explorer.getByRole('button', { name: 'Bitwarden', exact: true }).click()
  await switchLanguage(page, 'de-CH')
  await expect(page).toHaveURL(new URL('#provider-bitwarden', baseURL).href)
  await expect(explorer.getByRole('button', { name: 'Bitwarden', exact: true })).toHaveAttribute('aria-pressed', 'true')
})
