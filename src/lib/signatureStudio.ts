export interface StudioPayload {
  readonly message: string
  readonly challenge: string
}

const curve = { name: 'ECDSA', namedCurve: 'P-256' }
const algorithm = { name: 'ECDSA', hash: 'SHA-256' }

export function hex(bytes: ArrayBuffer | Uint8Array): string {
  return Array.from(new Uint8Array(bytes), n => n.toString(16).padStart(2, '0')).join('')
}

export function freshChallenge(): string {
  return hex(crypto.getRandomValues(new Uint8Array(16)))
}

export function generateStudioKeys(): Promise<CryptoKeyPair> {
  return crypto.subtle.generateKey(curve, false, ['sign', 'verify'])
}

function encode({ message, challenge }: StudioPayload): Uint8Array<ArrayBuffer> {
  // A JSON tuple keeps the two fields unambiguous and preserves exact Unicode text.
  return new TextEncoder().encode(JSON.stringify([message, challenge]))
}

export function signPayload(privateKey: CryptoKey, payload: StudioPayload): Promise<ArrayBuffer> {
  return crypto.subtle.sign(algorithm, privateKey, encode(payload))
}

export function verifyPayload(publicKey: CryptoKey, signature: ArrayBuffer, payload: StudioPayload): Promise<boolean> {
  return crypto.subtle.verify(algorithm, publicKey, signature, encode(payload))
}
