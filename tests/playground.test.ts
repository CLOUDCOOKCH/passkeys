import { describe, expect, it } from 'vitest'
import { initialLab, updateLab } from '../src/lib/playground'
import { discovery } from '../src/content/discovery'
import { playground } from '../src/content/playground'

describe('playground simulations', () => {
  it('lets a learner try again after selecting the unrelated domain', () => {
    const domain = updateLab(initialLab, { type: 'choose', experiment: 'domain' })
    const wrong = updateLab(domain, { type: 'domain', address: 'atelier-help.example' })
    expect(wrong).toMatchObject({ wrongDomain: true, step: 0 })
    expect(updateLab(wrong, { type: 'domain', address: 'atelier.example' })).toMatchObject({ wrongDomain: false, step: 1 })
  })
  it('resets the illustrated connection when switching from USB to NFC', () => {
    const detected = updateLab(initialLab, { type: 'advance' })
    expect(updateLab(detected, { type: 'option', choice: 'nfc' })).toMatchObject({ connection: 'nfc', step: 0 })
  })
  it.each(['de', 'en'] as const)('covers each comparison, crypto and lab state in %s', lang => {
    expect(discovery[lang].howSteps).toHaveLength(6)
    expect(discovery[lang].password.steps).toHaveLength(4)
    const lab = playground[lang]
    for (const path of [lab.phone, lab.usb, lab.nfc, lab.syncJourney, lab.boundJourney]) {
      expect(path.slice(0, -1).every(step => Boolean(step.action && step.text))).toBe(true)
      expect(path.at(-1)?.action).toBeUndefined()
    }
  })
})
