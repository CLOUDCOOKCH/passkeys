import { messageTracePaths, signatureTracePaths } from './signatureTrace'
import type { Lang } from '../i18n/home'

interface SignaturePrint {
  lang: Lang
  phase: 'signed' | 'verified'
  message: string
  challenge: string
  signature: string
}

const captions = {
  de: {
    title: 'Signaturspur',
    note: 'Die Linien visualisieren Demo-Daten. Sie sind kein Signaturnachweis.',
    input: 'Nachricht + Challenge', output: 'Signaturdaten', message: 'Signierte Nachricht',
    signed: 'Signiert', verified: 'Signatur geprüft',
    description: 'Eine Kurve zeigt Nachricht und Challenge, die zweite die dazu erzeugten Signaturdaten.',
  },
  en: {
    title: 'Signature trace',
    note: 'The lines illustrate demo data. This print is not proof of a signature.',
    input: 'Message + challenge', output: 'Signature data', message: 'Signed message',
    signed: 'Signed', verified: 'Signature verified',
    description: 'One curve represents the message and challenge. The other represents their signature data.',
  },
}

// Keep narrow and wide scripts legible in the same space, including long unbroken words.
// XML 1.0 disallows control characters and unpaired surrogate code units in text nodes.
function printLines(message: string) {
  const lines: string[] = []
  let line = ''
  let columns = 0
  for (const char of message.slice(0, 96)) {
    const cp = char.codePointAt(0)!
    const valid = cp >= 32 && !(cp >= 0xd800 && cp <= 0xdfff) && cp !== 0xfffe && cp !== 0xffff
    const display = valid ? char : '�'
    const width = cp > 255 ? 2 : 1
    if (columns + width > 52) {
      lines.push(line)
      line = ''
      columns = 0
    }
    columns += width
    line += display
  }
  lines.push(line)
  return lines
}

export function signaturePrintSvg({ lang, phase, message, challenge, signature }: SignaturePrint): string {
  const copy = captions[lang]
  const ns = 'http://www.w3.org/2000/svg'
  const doc = document.implementation.createDocument(ns, 'svg')
  const root = doc.documentElement
  root.setAttribute('viewBox', '0 0 800 850')
  root.setAttribute('width', '800')
  root.setAttribute('height', '850')
  root.setAttribute('role', 'img')
  root.setAttribute('aria-labelledby', 'title description')
  root.setAttribute('lang', lang === 'de' ? 'de-CH' : 'en')

  function shape(tag: string, attrs: Record<string, number | string>, parent: Element = root) {
    const node = doc.createElementNS(ns, tag)
    for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, String(value))
    parent.appendChild(node)
    return node
  }
  function label(text: string, x: number, y: number, size: number, extra: Record<string, string> = {}) {
    const node = shape('text', { x, y, fill: '#20392e', 'font-family': 'sans-serif', 'font-size': size, ...extra })
    node.textContent = text
  }

  const dark = '#102c26'
  const foreground = phase === 'verified' ? '#9de4c6' : '#a8c6d6'
  const id = challenge.slice(0, 8).toUpperCase()
  shape('title', { id: 'title' }).textContent = copy.title
  shape('desc', { id: 'description' }).textContent = copy.description
  shape('rect', { width: 800, height: 850, fill: '#f5f3e8' })
  label('Passkeys.', 40, 45, 24, { 'font-weight': 'bold' })
  label('ECDSA  /  P-256  /  SHA-256', 760, 42, 15, { 'text-anchor': 'end', 'font-family': 'monospace' })
  shape('path', { d: 'M40 65H760', stroke: '#93a69a' })
  label(copy.title, 40, 151, 71, { 'font-family': 'Georgia, serif', 'font-style': 'italic' })
  label(copy[phase], 760, 145, 19, { 'text-anchor': 'end', fill: '#285740', 'font-weight': 'bold' })

  const plot = shape('g', { transform: 'translate(40 180)' })
  shape('rect', { width: 720, height: 348, fill: dark }, plot)
  let grid = ''
  for (let x = 36; x < 720; x += 36) grid += `M${x} 0v348`
  for (let y = 12; y < 348; y += 36) grid += `M0 ${y}h720`
  shape('path', { d: grid, fill: 'none', stroke: '#395047', 'stroke-width': .8 }, plot)
  shape('path', { d: 'M0 174H720M360 0V348', stroke: '#587165' }, plot)
  const attrs = { fill: 'none', 'stroke-linejoin': 'round' }
  for (const [i, d] of messageTracePaths(message, challenge).entries()) {
    shape('path', { d, ...attrs, stroke: i % 5 === 0 ? '#dceba5' : '#b1c77b', 'stroke-width': i % 5 === 0 ? 1.5 : 1 }, plot)
  }
  for (const [i, d] of signatureTracePaths(signature).entries()) {
    shape('path', { d, ...attrs, stroke: foreground, 'stroke-width': i === 1 ? 2.1 : 1 }, plot)
  }
  shape('rect', { x: 40, y: 528, width: 720, height: 47, fill: '#243e34' })
  for (const [x, color, caption] of [[57, '#dceba5', copy.input], [406, foreground, copy.output]] as const) {
    shape('path', { d: `M${x} 552h24`, stroke: color, 'stroke-width': 3 })
    label(caption, x + 35, 558, 17, { fill: '#edf2db' })
  }
  label(copy.message, 40, 618, 16, { 'font-weight': 'bold' })
  label(`Challenge · ${id}`, 760, 618, 16, { 'text-anchor': 'end', 'font-family': 'monospace' })
  for (const [i, line] of printLines(message).entries()) {
    label(line, 40, 657 + i * 29, 21, { 'font-family': 'monospace', 'xml:space': 'preserve' })
  }
  shape('path', { d: 'M40 786H760', stroke: '#93a69a' })
  label(copy.note, 40, 819, 17)
  return new XMLSerializer().serializeToString(doc)
}

export function saveSignaturePrint(print: SignaturePrint) {
  const svg = signaturePrintSvg(print)
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
  const link = document.createElement('a')
  link.download = `passkeys-trace-${print.challenge.slice(0, 8)}-${print.lang}.svg`
  link.href = url
  document.body.appendChild(link)
  try {
    link.click()
  } finally {
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
  }
}
