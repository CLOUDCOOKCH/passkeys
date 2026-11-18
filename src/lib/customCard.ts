import { cardContent, cardLabels } from '../content/customCard'
import type { Lang } from '../i18n/home'

export type CardMethod = 'key' | 'authenticator'

interface CardFace {
  title: string
  steps: readonly string[]
}

export interface CardModel {
  lang: Lang
  method: CardMethod
  company: string
  contact: string
  guideUrl: string
  qr: string
  front: CardFace
  back: CardFace
  labels: { brand: string; support: string; guide: string; front: string; back: string }
}

const canonicalSite = 'https://passkey.cloudcook.ch/'
const qrCodes = new Map<string, Promise<string>>()

function deployedBase(): URL {
  const configuredOrigin = import.meta.env.VITE_SITE_ORIGIN
  if (configuredOrigin) return new URL(import.meta.env.BASE_URL, configuredOrigin)
  if (typeof window === 'undefined') return new URL(canonicalSite)

  const current = window.location
  const loopback = /^(?:localhost|.*\.localhost|127(?:\.\d+){3}|0\.0\.0\.0|\[::1\])$/
  if (loopback.test(current.hostname) || current.protocol === 'file:') {
    return new URL(canonicalSite)
  }
  return new URL(import.meta.env.BASE_URL, current.origin)
}

function guideQR(url: string): Promise<string> {
  const cached = qrCodes.get(url)
  if (cached) return cached

  // Only the public lesson URL enters the QR code. Reuse it as the contact fields change.
  const image = import('qrcode')
    .then(({ default: QRCode }) => QRCode.toDataURL(url, {
      type: 'image/png',
      errorCorrectionLevel: 'M',
      margin: 4,
      scale: 8,
    }))
    .catch((error: unknown) => {
      qrCodes.delete(url)
      throw error
    })
  qrCodes.set(url, image)
  return image
}

export async function buildCard(
  lang: Lang,
  method: CardMethod,
  company: string,
  contact: string,
): Promise<CardModel> {
  const base = deployedBase()
  const url = new URL(lang === 'en' ? 'en/' : './', base)
  url.hash = method === 'key' ? 'm365-key' : 'm365-authenticator'
  return {
    lang,
    method,
    company: company.trim(),
    contact: contact.trim(),
    guideUrl: url.href,
    qr: await guideQR(url.href),
    ...cardContent[method][lang],
    labels: cardLabels[lang],
  }
}
