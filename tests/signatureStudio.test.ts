import { describe, expect, it } from 'vitest'
import { freshChallenge, generateStudioKeys, signPayload, verifyPayload } from '../src/lib/signatureStudio'

describe('local signature studio', () => {
  it('makes a throwaway P-256 key whose private material cannot be exported', async () => {
    const keys = await generateStudioKeys()
    expect(keys.privateKey.extractable).toBe(false)
    expect(keys.privateKey.algorithm).toMatchObject({ name: 'ECDSA', namedCurve: 'P-256' })
    await expect(crypto.subtle.exportKey('jwk', keys.privateKey)).rejects.toThrow()
  })

  it('checks the exact encoded message and challenge, including Unicode and whitespace', async () => {
    const keys = await generateStudioKeys()
    const original = { message: 'Café am Gleis 2', challenge: freshChallenge() }
    expect(original.challenge).toMatch(/^[0-9a-f]{32}$/)
    const signature = await signPayload(keys.privateKey, original)
    for (const message of [original.message + ' ', original.message.normalize('NFD'), 'Café am Gleis 3']) {
      expect(await verifyPayload(keys.publicKey, signature, { ...original, message })).toBe(false)
    }
    expect(await verifyPayload(keys.publicKey, signature, { ...original, challenge: freshChallenge() })).toBe(false)
    expect(await verifyPayload(keys.publicKey, signature, original)).toBe(true)
    const afterReset = await generateStudioKeys()
    expect(await verifyPayload(afterReset.publicKey, signature, original)).toBe(false)
  })
})
