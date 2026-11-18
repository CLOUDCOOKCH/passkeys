import { expect, test } from '@playwright/test'

test('all four simulations work with the keyboard and reduced motion', async ({ page }) => {
  const credentialsRequested: string[] = []
  await page.exposeFunction('reportCredentialRequest', (method: string) => credentialsRequested.push(method))
  await page.addInitScript(() => {
    for (const method of ['create', 'get']) {
      Object.defineProperty(navigator.credentials, method, {
        value: () => (window as unknown as {reportCredentialRequest: (method: string) => Promise<void>}).reportCredentialRequest(method),
      })
    }
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('en/#playground')
  const demo = page.locator('#playground')
  const activate = async (name: string) => {
    const button = demo.getByRole('button', { name, exact: true })
    await button.focus()
    await expect(button).toBeFocused()
    await page.keyboard.press('Enter')
  }
  await activate('Security key')
  await activate('Insert the key')
  await activate('Simulate verification')
  await expect(demo.getByRole('button', { name: 'Try again' })).toBeVisible()
  await activate('Phone unlock')
  await activate('Start sign-in')
  await activate('Simulate fingerprint')
  await expect(demo.getByRole('button', { name: 'Try again' })).toBeVisible()
  await activate('Find the genuine domain')
  await activate('atelier.example')
  await expect(demo.getByRole('button', { name: 'Try again' })).toBeVisible()
  await activate('Passkey journey')
  await activate('Create passkey')
  await activate('Show storage')
  await activate('Try another device')
  await expect(demo.getByRole('button', { name: 'Try again' })).toBeVisible()
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
