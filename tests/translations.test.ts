import { describe, expect, it } from 'vitest'
import { home } from '../src/i18n/home'
import { discovery } from '../src/content/discovery'
import { playground } from '../src/content/playground'

function contentFields(value: unknown, path: string): string[] {
  if (typeof value === 'string') {
    if (!value.trim()) throw new Error('Empty translation at ' + path)
    return [path]
  }
  if (!value || typeof value !== 'object') return []
  return Object.entries(value).flatMap(([key, child]) => contentFields(child, path + '.' + key))
}

describe('language switching', () => {
  for (const [name, copy] of Object.entries({ home, discovery, playground })) {
    it('provides matching German and English labels, steps and choices for ' + name, () => {
      expect(contentFields(copy.de, name).sort()).toEqual(contentFields(copy.en, name).sort())
    })
  }
})
