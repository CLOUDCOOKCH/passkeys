import {
  PDFDocument, PDFHexString, PDFName, PDFOperator, PDFOperatorNames, PDFString,
  StandardFonts, endMarkedContent, rgb,
  type PDFFont, type PDFPage,
} from 'pdf-lib'
import type { CardModel } from './customCard'

const mm = 72 / 25.4
const width = 105 * mm
const height = 148 * mm
const edge = 7 * mm
const textWidth = width - 2 * edge
const rule = rgb(0.69, 0.77, 0.72)
const canvasInk = '#183d32'

interface TextFace {
  font: PDFFont
  weight: 400 | 700
  characters: Set<number>
}

function textFace(font: PDFFont, weight: TextFace['weight']): TextFace {
  return { font, weight, characters: new Set(font.getCharacterSet()) }
}

function supported(text: string, face: TextFace) {
  return Array.from(text).every(character => face.characters.has(character.codePointAt(0)!))
}

function drawingContext() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas is unavailable for PDF text rendering')
  return ctx
}

// Use local browser fonts for consistent print glyphs, including mixed scripts.
// The text layer keeps the original Unicode available for searching and copying.
function typesetter(doc: PDFDocument) {
  const measure = drawingContext()
  const fontStyle = (face: TextFace, size: number) =>
    face.weight + ' ' + size + 'px "Manrope Variable", system-ui, sans-serif'
  const metrics = (line: string, face: TextFace, size: number) => {
    measure.font = fontStyle(face, size)
    return measure.measureText(line).width
  }
  function wrap(text: string, face: TextFace, size: number, max: number) {
    const lines: string[] = []
    let line = ''
    for (const word of text.trim().split(/\s+/u)) {
      const joined = line ? line + ' ' + word : word
      if (metrics(joined, face, size) <= max) { line = joined; continue }
      if (line) lines.push(line)
      line = ''
      if (metrics(word, face, size) <= max) { line = word; continue }
      // Keep emoji sequences, accent marks and Indic clusters together on wrap.
      const clusters = typeof Intl.Segmenter === 'function'
        ? Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(word), item => item.segment)
        : Array.from(word)
      for (const cluster of clusters) {
        if (line && metrics(line + cluster, face, size) > max) {
          lines.push(line)
          line = ''
        }
        line += cluster
      }
    }
    if (line) lines.push(line)
    return lines
  }
  async function draw(page: PDFPage, line: string, face: TextFace, size: number, x: number, baseline: number) {
    const y = height - baseline
    const scale = 5 // 360 dpi glyphs with a searchable text layer.
    const ctx = drawingContext()
    const w = metrics(line, face, size)
    const pad = 2
    ctx.canvas.width = Math.ceil((w + 2 * pad) * scale)
    ctx.canvas.height = Math.ceil((size * 1.8 + 2 * pad) * scale)
    ctx.scale(scale, scale)
    ctx.font = fontStyle(face, size)
    ctx.fillStyle = canvasInk
    ctx.textAlign = 'left'
    const ascent = size * 1.2 + pad
    ctx.fillText(line, pad, ascent)
    const image = await doc.embedPng(ctx.canvas.toDataURL('image/png'))
    page.pushOperators(PDFOperator.of(PDFOperatorNames.BeginMarkedContentSequence, [
      PDFName.of('Span'), '<< /ActualText ' + PDFHexString.fromText(line).toString() + ' >>',
    ]))
    page.drawText(supported(line, face) ? line : ' ', { x, y, size, font: face.font, opacity: 0 })
    page.drawImage(image, {
      x: x - pad, y: y + ascent - image.height / scale,
      width: image.width / scale, height: image.height / scale,
    })
    page.pushOperators(endMarkedContent())
  }
  return { metrics, wrap, draw }
}

export async function downloadCardPdf(model: CardModel): Promise<void> {
  await document.fonts.ready
  const doc = await PDFDocument.create()
  doc.setTitle(model.front.title)
  doc.setSubject('Microsoft 365 · ' + model.back.title)
  doc.setLanguage(model.lang === 'de' ? 'de-CH' : 'en')
  doc.setCreator('Passkeys.')
  const regular = textFace(await doc.embedFont(StandardFonts.Helvetica), 400)
  const bold = textFace(await doc.embedFont(StandardFonts.HelveticaBold), 700)
  const qr = await doc.embedPng(model.qr)
  const text = typesetter(doc)

  for (const side of ['front', 'back'] as const) {
    const page = doc.addPage([width, height])
    const back = side === 'back'
    page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(1, 0.992, 0.965) })
    await text.draw(page, model.labels.brand, bold, 13, edge, edge + 9)
    const sideLabel = back ? 'Microsoft 365 · 2/2' : 'Microsoft 365 · 1/2'
    await text.draw(page, sideLabel, regular, 8.5, width - edge - text.metrics(sideLabel, regular, 8.5), edge + 8)
    const divider = (top: number) => page.drawLine({
      start: { x: edge, y: height - top }, end: { x: width - edge, y: height - top },
      color: rule, thickness: 0.7,
    })
    divider(edge + 17)

    const qrSize = 22 * mm
    const contactLines = back && model.contact ? text.wrap(model.contact, regular, 9, textWidth) : []
    let footerTop = height - edge
    if (back) {
      if (contactLines.length) {
        footerTop -= 17 + contactLines.length * 11.5
        await text.draw(page, model.labels.support, bold, 8.8, edge, footerTop + 10)
        for (const [i, line] of contactLines.entries()) {
          await text.draw(page, line, regular, 9, edge, footerTop + 23 + i * 11.5)
        }
      }
      footerTop -= qrSize + 8
      divider(footerTop)
      page.drawImage(qr, { x: edge, y: height - footerTop - qrSize - 4, width: qrSize, height: qrSize })
      const urlX = edge + qrSize + 7
      const guideLines = text.wrap(model.guideUrl.replace(/^https?:\/\//, ''), regular, 8, width - edge - urlX)
      const labelTop = footerTop + 4 + Math.max(12, (qrSize - guideLines.length * 10) / 2)
      await text.draw(page, model.labels.guide, bold, 10.4, urlX, labelTop)
      for (const [i, line] of guideLines.entries()) {
        await text.draw(page, line, regular, 8, urlX, labelTop + 13 + 10 * i)
      }
      const link = doc.context.obj({
        Type: 'Annot', Subtype: 'Link', Border: [0, 0, 0],
        Rect: [edge, height - footerTop - qrSize - 5, width - edge, height - footerTop],
        A: { Type: 'Action', S: 'URI', URI: PDFString.of(model.guideUrl) },
      })
      page.node.addAnnot(doc.context.register(link))
    }

    const companyLines = text.wrap(model.company, bold, 10.5, textWidth)
    let cursor = edge + 33
    for (const line of companyLines) {
      await text.draw(page, line, bold, 10.5, edge, cursor)
      cursor += 13
    }
    const titleLines = text.wrap(model[side].title, bold, 21, textWidth)
    cursor += 17
    for (const line of titleLines) {
      await text.draw(page, line, bold, 21, edge, cursor)
      cursor += 23
    }
    cursor += 4
    const available = footerTop - cursor
    const indent = 22
    const layout = (size: number) => {
      const lines = model[side].steps.map(step => text.wrap(step, regular, size, textWidth - indent))
      const lineHeight = size * 1.34
      const gap = Math.min(14, size)
      const total = lines.reduce((sum, block) => sum + block.length * lineHeight + gap, -gap)
      return { size, lines, lineHeight, gap, total }
    }
    let body = layout(11)
    while (body.total > available && body.size > 7.5) body = layout(body.size - 0.25)
    if (body.total > available) throw new Error('Personalised text does not fit on the A6 card')
    for (const [i, lines] of body.lines.entries()) {
      const radius = 7
      page.drawCircle({ x: edge + radius, y: height - cursor + 3, size: radius, color: rgb(0.85, 0.94, 0.87) })
      const numeral = String(i + 1)
      await text.draw(page, numeral, bold, 8.5, edge + radius - text.metrics(numeral, bold, 8.5) / 2, cursor)
      for (const line of lines) {
        await text.draw(page, line, regular, body.size, edge + indent, cursor)
        cursor += body.lineHeight
      }
      cursor += body.gap
    }
  }
  const bytes = await doc.save()
  const blob = new Blob([new Uint8Array(bytes).buffer], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'passkeys-first-day-' + model.method + '-' + model.lang + '.pdf'
  document.body.appendChild(link)
  try {
    link.click()
  } finally {
    link.remove()
    // Allow the browser to finish opening the download before releasing its URL.
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
  }
}
