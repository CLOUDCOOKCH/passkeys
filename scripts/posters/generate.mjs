/* global window, document, Image */
import QRCode from 'qrcode'
import { loadEnv } from 'vite'
import { chromium } from '@playwright/test'
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { guideDesigns } from './guide.mjs'
import { buttonsDesign } from './buttons.mjs'
import { fineDesign } from './fine.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const output = join(root, 'public/posters')
const media = join(output, 'media')
const catalogue = JSON.parse(await readFile(join(root, 'src/content/posters.json'), 'utf8'))
const designs = [...guideDesigns, buttonsDesign, fineDesign]
await mkdir(media, { recursive: true })
const fonts = [
  ['@fontsource-variable/manrope', 'files/manrope-latin-wght-normal.woff2', 'manrope.woff2'],
  [
    '@fontsource/instrument-serif',
    'files/instrument-serif-latin-400-italic.woff2',
    'instrument-serif-italic.woff2',
  ],
]
for (const [pkg, font, filename] of fonts) {
  await copyFile(join(root, 'node_modules', pkg, font), join(media, filename))
  await copyFile(join(root, 'node_modules', pkg, 'LICENSE'), join(media, filename + '.LICENSE'))
}
const env = loadEnv('production', root, 'VITE_')
const origin = new URL(env.VITE_SITE_ORIGIN || 'https://cloudcookch.github.io')
if (!['https:', 'http:'].includes(origin.protocol))
  throw new Error('Use an HTTP(S) origin for printed lesson links')
const site = new URL((env.VITE_BASE_PATH || '/passkeys/').replace(/\/?$/, '/'), origin.origin)
const artworkNames = ['buttons.webp', 'fine.webp']
const art = (name) => {
  if (!artworkNames.includes(name)) throw new Error('Unknown poster illustration: ' + name)
  return '../media/' + name
}
const escape = (text) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')

async function documentFor(poster, design, lang) {
  const de = lang === 'de'
  const text = poster[lang]
  const lesson = new URL((de ? '' : 'en/') + '#' + poster.lesson, site)
  const code = await QRCode.toString(lesson.href, {
    type: 'svg',
    margin: 4,
    errorCorrectionLevel: 'M',
  })
  return `<!doctype html>
<html lang="${de ? 'de-CH' : 'en'}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>${escape(text.title)} · Passkeys</title>
<link rel="icon" href="../../favicon.svg"><link rel="stylesheet" href="../print.css">
<script defer src="../print.js"></script></head>
<body><nav class="print-tools" aria-label="${de ? 'Poster drucken' : 'Print poster'}">
<a href="../../${de ? '' : 'en/'}#library">${de ? 'Zur Posterbibliothek' : 'Back to the poster library'}</a>
<button type="button">${de ? 'Drucken' : 'Print'}</button></nav>
<main class="poster-viewport" aria-label="${escape(text.title)}"><div class="poster-sheet">
${design.render(lang, art)}</div>
<a class="print-source" href="${escape(lesson.href)}"><span>${de ? 'Zum interaktiven Guide' : 'Open the interactive guide'}<br>${escape(lesson.host + lesson.pathname)}</span><span aria-hidden="true">${code}</span></a>
</main></body></html>\n`
}

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
})
try {
  const page = await browser.newPage({
    viewport: { width: 800, height: 1050 },
    deviceScaleFactor: 1.35,
  })
  // Serve the exact Pages files to this browser without a dev server or a file:// origin.
  await page.route('http://posters.test/**', (route) => {
    const pathname = new URL(route.request().url()).pathname
    return route.fulfill({ path: join(root, 'public', pathname) })
  })
  await page.addInitScript(() => {
    window.print = () => {}
  })
  for (const lang of ['de', 'en']) {
    await mkdir(join(output, lang), { recursive: true })
    for (const poster of catalogue) {
      const design = designs.find((entry) => entry.id === poster.id)
      if (!design) throw new Error('Missing poster: ' + poster.id)
      const stem = join(output, lang, poster.id)
      await writeFile(stem + '.html', await documentFor(poster, design, lang))
      await page.goto('http://posters.test/posters/' + lang + '/' + poster.id + '.html')
      await page.evaluate(async () => {
        await document.fonts.ready
        await Promise.all(Array.from(document.images, (image) => image.decode()))
      })
      const png = await page
        .locator('.poster-sheet')
        .screenshot({ path: stem + '.png', animations: 'disabled' })
      const preview = await page.evaluate(async (data) => {
        const img = new Image()
        img.src = 'data:image/png;base64,' + data
        await img.decode()
        const canvas = document.createElement('canvas')
        canvas.width = 480
        canvas.height = 600
        const ctx = canvas.getContext('2d')
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        return canvas.toDataURL('image/webp', 0.86).split(',')[1]
      }, png.toString('base64'))
      await writeFile(stem + '.webp', Buffer.from(preview, 'base64'))
      await page.pdf({
        path: stem + '.pdf',
        printBackground: true,
        preferCSSPageSize: true,
        tagged: true,
      })
      console.log('Rendered ' + lang + '/' + poster.id)
    }
  }
} finally {
  await browser.close()
}
