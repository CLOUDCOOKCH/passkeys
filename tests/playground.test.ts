import { describe, expect, it } from 'vitest'
import { initialLab, updateLab } from '../src/lib/playground'
import { discovery } from '../src/content/discovery'
import { playground } from '../src/content/playground'

describe('playground simulations', () => {
  it('lets a learner try again after selecting the unrelated domain', () => {
    const domain = updateLab(initialLab, { type: 'choose', experiment: 'domain' })
    const wrong = updateLab(domain, { type: 'domain', address: 'atelier-help.example' })
    expect(wrong).toMatchObject({ wrongDomain: true, step: 0 })
    expect(updateLab(wrong, { type: 'domain', address: 'atelier.example' })).toMatchObject({
      wrongDomain: false,
      step: 1,
    })
  })
  it('resets the illustrated connection when switching from USB to NFC', () => {
    const detected = updateLab(initialLab, { type: 'advance' })
    expect(updateLab(detected, { type: 'option', choice: 'nfc' })).toMatchObject({
      connection: 'nfc',
      step: 0,
    })
  })
  it.each(['de', 'en'] as const)('covers each comparison, crypto and lab state in %s', (lang) => {
    expect(discovery[lang].howSteps).toHaveLength(6)
    expect(discovery[lang].password.steps).toHaveLength(4)
    const lab = playground[lang]
    for (const path of [lab.phone, lab.usb, lab.nfc, lab.syncJourney, lab.boundJourney]) {
      expect(path.slice(0, -1).every((step) => Boolean(step.action && step.text))).toBe(true)
      expect(path.at(-1)?.action).toBeUndefined()
    }
  })
})

describe('playground experiment conditions', () => {
  it('produces no response for a cancelled verification and accepts a new device PIN approval', () => {
    const phone = updateLab(initialLab, { type: 'choose', experiment: 'phone' })
    const verification = updateLab(phone, { type: 'advance' })
    const pin = updateLab(verification, { type: 'verification', method: 'pin' })
    const stopped = updateLab(pin, { type: 'cancel' })
    expect(updateLab(stopped, { type: 'advance' })).toBe(stopped)
    const resumed = updateLab(stopped, { type: 'resume' })
    expect(updateLab(resumed, { type: 'advance' })).toMatchObject({
      step: 2,
      verification: 'pin',
      cancelled: false,
    })
  })

  it.each(['synced', 'bound'] as const)(
    'requires a separately registered method when %s storage is inaccessible',
    (storage) => {
      const journey = updateLab(initialLab, { type: 'choose', experiment: 'journey' })
      const selected = updateLab(journey, { type: 'option', choice: storage })
      const stored = updateLab(updateLab(selected, { type: 'advance' }), { type: 'advance' })
      const missing = updateLab(stored, { type: 'availability', unavailable: true })
      expect(updateLab(missing, { type: 'backup' })).toBe(missing)
      const blocked = updateLab(missing, { type: 'advance' })
      expect(blocked).toMatchObject({ step: 2, blocked: true })
      expect(updateLab(blocked, { type: 'advance' })).toBe(blocked)
      const backup = updateLab(blocked, { type: 'backup' })
      expect(backup).toMatchObject({ step: 3, usedBackup: true, unavailable: true })
      expect(updateLab(backup, { type: 'restart' })).toMatchObject({
        step: 0,
        storage,
        blocked: false,
        usedBackup: false,
        unavailable: false,
      })
    },
  )

  it('treats a path as irrelevant when checking the two example services', () => {
    const domain = updateLab(initialLab, { type: 'choose', experiment: 'domain' })
    const urls = updateLab(domain, { type: 'addresses', full: true })
    expect(updateLab(urls, { type: 'domain', address: 'atelier-help.example' })).toMatchObject({
      step: 0,
      wrongDomain: true,
    })
    expect(updateLab(urls, { type: 'domain', address: 'atelier.example' })).toMatchObject({
      step: 1,
      wrongDomain: false,
    })
  })
})
