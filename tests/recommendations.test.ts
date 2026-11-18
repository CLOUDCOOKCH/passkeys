import { describe, expect, it } from 'vitest'
import { recommend, type Answers } from '../src/lib/recommend'
import { providers } from '../src/content/providers'

const defaults: Answers = { platform:'apple', usesManager:false, prefersHardware:false }
describe('recommendations', () => {
  it.each(['apple', 'google', 'windows'] as const)('matches a single %s ecosystem', platform => {
    expect(recommend({...defaults, platform})).toBe(platform)
  })
  it('offers a compatible manager for mixed devices or an existing vault', () => {
    expect(recommend({...defaults, platform:'mixed'})).toBe('manager')
    expect(recommend({...defaults, usesManager:true})).toBe('manager')
  })
  it('respects an explicit hardware preference even with an existing vault', () => {
    expect(recommend({...defaults, usesManager:true, prefersHardware:true})).toBe('hardware')
  })
  it('provides named, dated, bilingual instructions for each storage option', () => {
    expect(new Set(providers.map(p => p.id)).size).toBe(7)
    for (const p of providers) {
      expect(p.url).toMatch(/^https:/)
      expect(p.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      for (const language of ['de','en'] as const) {
        for (const text of [p.overview,p.tradeoff,p.prepare,p.save,p.troubleshoot]) expect(text[language].length).toBeGreaterThan(25)
      }
    }
  })
})
