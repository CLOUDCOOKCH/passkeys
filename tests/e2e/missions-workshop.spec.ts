import { expect, test } from '@playwright/test'

test.use({ reducedMotion: 'reduce' })

for (const lang of ['en', 'de'] as const) {
  const entry = lang === 'en' ? 'en/' : './'

  test(`the ${lang} recovery mission replays one changed decision and survives switching modes`, async ({ page }) => {
    await page.goto(entry + '#playground')
    const modes = page.locator('#playground .lab-modes')
    const experiments = modes.locator('a[href="#playground"]')
    const missions = modes.locator('a[href="#playground-missions"]')
    await expect(experiments).toHaveAttribute('aria-current', 'location')
    await missions.press('Enter')
    await expect(missions).toHaveAttribute('aria-current', 'location')
    const recovery = page.locator('#recovery-mission')
    const selectRecovery = page.locator('#playground button[data-mission="recovery"]')
    await selectRecovery.press('Enter')
    await expect(selectRecovery).toHaveAttribute('aria-pressed', 'true')
    await recovery.locator('input[name="rm-storage"][value="synced"]').check()
    await recovery.locator('input[name="rm-spare"][value="no"]').check()
    await recovery.locator('[data-action="friday-login"]').press('Enter')
    await recovery.locator('[data-route="provider"]').press('Enter')
    await recovery.locator('[data-provider-access="no"]').press('Enter')
    await expect(recovery.locator('[data-outcome="provider-locked"]')).toBeVisible()
    await expect(recovery.locator('[data-comparison]')).toBeHidden()
    await recovery.locator('[data-rewind="provider"]').press('Enter')
    await expect(recovery.locator('[data-outcome="provider-ok"]')).toBeVisible()
    const comparison = recovery.locator('[data-comparison]')
    await expect(comparison).toBeVisible()
    await expect(comparison).toHaveText(/\S/)

    const workshop = modes.locator('a[href="#playground-workshop"]')
    await workshop.press('Enter')
    await expect(workshop).toHaveAttribute('aria-current', 'location')
    await expect(recovery).toBeHidden()
    await missions.press('Enter')
    await expect(comparison).toBeVisible()
    await recovery.locator('[data-action="restart"]').press('Enter')
    await expect(comparison).toBeHidden()
    await expect(recovery.locator('[data-action="friday-login"]')).toBeEnabled()
  })

  test(`the ${lang} help desk uses evidence and an appropriate remedy for all three tickets`, async ({ page }) => {
    await page.goto(entry + '#help-desk-mission')
    const desk = page.locator('#help-desk-mission')
    await expect(page.locator('#playground button[data-mission="helpdesk"]')).toHaveAttribute('aria-pressed', 'true')
    await expect(desk).toBeInViewport()
    const active = desk.locator('.hd-case')
    for (const [i, ticket] of ['account', 'provider', 'key'].entries()) {
      await desk.locator(`[data-ticket="${ticket}"]`).press('Enter')
      await expect(active).toHaveAttribute('data-phase', 'questions')
      const diagnose = desk.locator('[data-stage-action="diagnose"]')
      await expect(diagnose).toBeDisabled()
      if (i === 1) {
        // Guessing the cause after a single unrelated clue is insufficient.
        await desk.locator('[data-question="key"]').press('Enter')
        await diagnose.press('Enter')
        await desk.locator('[data-diagnosis="provider"]').press('Enter')
        await expect(active).toHaveAttribute('data-phase', 'diagnosis')
        await expect(desk.locator('.hd-feedback[role="status"]')).toContainText(/\S/)
        await desk.locator('[data-stage-action="ask"]').press('Enter')
      }
      await desk.locator(`[data-question="${ticket}"]`).press('Enter')
      await expect(desk.locator('.hd-clues li')).toHaveCount(i === 1 ? 2 : 1)
      if (i === 0) {
        await desk.locator('[data-ticket="provider"]').press('Enter')
        await desk.locator('[data-ticket="account"]').press('Enter')
        await expect(desk.locator('.hd-clues li')).toHaveCount(1)
      }
      await desk.locator('[data-stage-action="diagnose"]').press('Enter')
      await expect(active).toHaveAttribute('data-phase', 'diagnosis')
      if (i === 0) {
        await desk.locator('[data-diagnosis="key"]').press('Enter')
        await expect(active).toHaveAttribute('data-phase', 'diagnosis')
        await expect(desk.locator('.hd-feedback[role="status"]')).toContainText(/\S/)
      }
      await desk.locator(`[data-diagnosis="${ticket}"]`).press('Enter')
      await expect(active).toHaveAttribute('data-phase', 'action')
      if (i === 1) {
        await desk.locator('[data-remedy="account"]').press('Enter')
        await expect(active).toHaveAttribute('data-phase', 'action')
      }
      await desk.locator(`[data-remedy="${ticket}"]`).press('Enter')
      await expect(active).toHaveAttribute('data-phase', 'done')
      await expect(desk.locator('.hd-score')).toContainText(`${i+1} / 3`)
    }
    await desk.locator('[data-stage-action="restart"]').press('Enter')
    await expect(desk.locator('.hd-score')).toContainText('0 / 3')
    await expect(active).toHaveAttribute('data-phase', 'questions')
  })
}

const workshopControls = {
  en: {
    start: 'Start workshop', pause: 'Pause for a vote', reveal: 'Reveal outcome',
    compare: 'Compare both routes', next: 'Next round', finish: 'Finish workshop',
    presenter: 'Presenter view', exit: 'Exit presenter view', restart: 'Restart workshop',
    card: 'Make a first-day card',
  },
  de: {
    start: 'Workshop starten', pause: 'Per Handzeichen abstimmen', reveal: 'Folge aufdecken',
    compare: 'Beide Wege vergleichen', next: 'Nächste Runde', finish: 'Workshop abschliessen',
    presenter: 'Präsentationsansicht', exit: 'Präsentationsansicht beenden', restart: 'Workshop neu starten',
    card: 'Startkarte für den ersten Tag gestalten',
  },
}

for (const lang of ['en', 'de'] as const) {
  test(`the ${lang} workshop keeps choices hidden until the vote and hands off to the card builder`, async ({ page }) => {
    const labels = workshopControls[lang]
    await page.goto(lang === 'en' ? 'en/#live-workshop' : './#playground-workshop')
    const workshop = page.locator('#live-workshop')
    await expect(workshop.getByRole('button', { name: labels.start, exact: true })).toBeVisible()
    const presenter = workshop.getByRole('button', { name: labels.presenter, exact: true })
    const dialog = page.getByRole('dialog')
    await presenter.press('Enter')
    await expect(dialog).toBeVisible()
    if (lang === 'en') await page.keyboard.press('Escape')
    else await dialog.getByRole('button', { name: labels.exit, exact: true }).press('Enter')
    await expect(dialog).toBeHidden()
    await expect(presenter).toBeFocused()

    await workshop.getByRole('button', { name: labels.start, exact: true }).press('Enter')
    await workshop.getByRole('button', { name: labels.pause, exact: true }).press('Enter')
    await workshop.locator('.workshop-option[data-route="a"]').press('Enter')
    await workshop.getByRole('button', { name: labels.restart, exact: true }).press('Enter')
    await expect(workshop.locator('.workshop-outcome:visible')).toHaveCount(0)

    await presenter.press('Enter')
    for (let round = 0; round < 3; round++) {
      const reveal = dialog.getByRole('button', { name: labels.reveal, exact: true })
      const outcomes = dialog.locator('.workshop-outcome:visible')
      await dialog.getByRole('button', { name: labels.pause, exact: true }).press('Enter')
      await expect(outcomes).toHaveCount(0)
      await expect(reveal).toBeDisabled()
      const choice = dialog.locator(`.workshop-option[data-route="${round === 1 ? 'b' : 'a'}"]`)
      await choice.press('Enter')
      await expect(choice).toHaveAttribute('aria-pressed', 'true')
      await expect(outcomes).toHaveCount(0)
      await reveal.press('Enter')
      await expect(outcomes).toHaveCount(1)
      await dialog.getByRole('button', { name: labels.compare, exact: true }).press('Enter')
      await expect(outcomes).toHaveCount(2)
      await dialog.getByRole('button', { name: round < 2 ? labels.next : labels.finish, exact: true }).press('Enter')
    }
    const handoff = dialog.getByRole('link', { name: labels.card, exact: true })
    await expect(handoff).toHaveAttribute('href', '#m365-card-builder')
    await handoff.press('Enter')
    await expect(dialog).toBeHidden()
    await expect(page).toHaveURL(/#m365-card-builder$/)
    await expect(page.locator('#m365-card-builder')).toBeInViewport()
  })
}
