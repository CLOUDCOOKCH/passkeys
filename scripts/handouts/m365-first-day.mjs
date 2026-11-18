/* global document */
// Run from any directory with: node scripts/handouts/m365-first-day.mjs
// Set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH to use an installed Chromium browser.
import { mkdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { chromium } from '@playwright/test'
import QRCode from 'qrcode'

const root = fileURLToPath(new URL('../../', import.meta.url))
const out = resolve(root, 'public/handouts')
const font = await readFile(resolve(root, 'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2'))
const { VITE_SITE_ORIGIN = 'https://passkey.cloudcook.ch', VITE_BASE_PATH = '/' } = process.env
const site = new URL(VITE_BASE_PATH.replace(/\/?$/, '/'), VITE_SITE_ORIGIN)
const portal = 'https://mysignins.microsoft.com/security-info'

const copy = {
  de: {
    title: 'Dein Schlüssel für Microsoft 365',
    front: 'Schlüssel-PIN einrichten',
    intro: 'Diese PIN entsperrt deinen FIDO2-Schlüssel. Sie gehört zum Schlüssel, auch wenn du ihn an einem anderen Computer verwendest.',
    system: 'Windows 11',
    pinSteps: [
      'Öffne <b>Einstellungen → Konten → Anmeldeoptionen → Sicherheitsschlüssel → Verwalten</b>.',
      'Verbinde den Schlüssel per USB oder NFC. Berühre ihn, wenn du dazu aufgefordert wirst.',
      'Wähle unter <b>Sicherheitsschlüssel-PIN</b> die Option <b>Hinzufügen</b>. Gib deine neue PIN zweimal ein.',
    ],
    existing: '<b>Schon eine PIN?</b> Verwende sie weiter. Ein Zurücksetzen löscht die auf dem Schlüssel gespeicherten FIDO-Anmeldedaten.',
    other: 'Anderes Betriebssystem? Folge dem Systemdialog bei der Registrierung oder frage deine IT.',
    back: 'Schlüssel registrieren',
    open: 'Öffne die Microsoft-Sicherheitsinformationen:',
    register: [
      'Melde dich mit deinem Geschäftskonto und deiner bisherigen MFA-Methode oder dem befristeten Zugriffspass deiner IT an.',
      'Wähle <b>Anmeldemethode hinzufügen → Passkey</b>, dann <b>Sicherheitsschlüssel</b>. Die Auswahl kann unter «Weitere Optionen» stehen.',
      'Verbinde den Schlüssel, gib seine PIN im Systemdialog ein und berühre ihn auf Aufforderung. Gib dem Schlüssel einen Namen.',
    ],
    test: '<b>Teste die Anmeldung.</b> Öffne ein privates Browserfenster, melde dich mit dem Schlüssel bei Microsoft 365 an und bestätige den Kontozugriff. Behalte deine Ersatzmethode.',
    guide: 'Zur Anleitung und Hilfe',
    turn: 'Weiter auf der Rückseite →',
  },
  en: {
    title: 'Your Microsoft 365 security key',
    front: 'Set your key PIN',
    intro: 'This PIN unlocks your FIDO2 security key. It belongs to the key, even when you use it on another computer.',
    system: 'Windows 11',
    pinSteps: [
      'Open <b>Settings → Accounts → Sign-in options → Security key → Manage</b>.',
      'Connect the key by USB or NFC. Touch it when prompted.',
      'Under <b>Security Key PIN</b>, choose <b>Add</b>. Enter your new PIN twice.',
    ],
    existing: '<b>Already have a key PIN?</b> Keep using it. Resetting the key erases the FIDO credentials stored on it.',
    other: 'Using another operating system? Follow the system prompt during registration or ask your IT team.',
    back: 'Register your key',
    open: 'Open Microsoft’s Security info page:',
    register: [
      'Sign in with your work account and your existing MFA method or a Temporary Access Pass from IT.',
      'Choose <b>Add sign-in method → Passkey</b>, then <b>Security key</b>. Look under “More options” if needed.',
      'Connect the key, enter its PIN in the system prompt and touch the key when asked. Give the key a name.',
    ],
    test: '<b>Test sign-in.</b> Open a private browser window, sign in to Microsoft 365 using the key and confirm you can access your account. Keep your backup method.',
    guide: 'Walkthrough and help',
    turn: 'Continue on the back →',
  },
}

const key = `<svg class="key" aria-hidden="true" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(-24 34 24)" stroke="#1c4338" stroke-width="2.7" stroke-linejoin="round">
    <rect x="32" y="16" width="27" height="17" rx="2" fill="#ffefca"/>
    <path d="M48 20h6v3h-6zm0 7h6v2h-6z" stroke="none" fill="#1c4338"/>
    <rect x="4" y="10" width="39" height="28" rx="12" fill="#a0dfbc"/>
    <circle cx="13" cy="24" r="2.4" fill="white"/><circle cx="29" cy="24" r="7" fill="#ffdf90"/>
  </g>
</svg>`
const css = `
  @font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font.toString('base64')}) format('woff2');font-weight:200 800}
  @page{size:105mm 148mm;margin:0}
  *{box-sizing:border-box}
  body{margin:0;color:#172f29;font:9pt/1.32 Manrope,Arial,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  article{width:105mm;height:148mm;padding:6mm 7mm;position:relative;break-after:page;display:flex;flex-direction:column}
  article:last-child{break-after:auto}
  header{display:flex;align-items:center;justify-content:space-between;border-bottom:.36mm solid #254b40;padding-bottom:2.1mm;gap:3mm}
  header b{font-weight:800;font-size:10pt;letter-spacing:-.045em}
  header span{font-size:8pt;font-weight:700}
  h1,h2{margin:3.3mm 0 2mm;font-weight:800;letter-spacing:-.05em;line-height:1.05}
  h1{font-size:21pt;padding-right:13mm} h2{font-size:19pt}
  p{margin:0} a{color:inherit}
  .key{position:absolute;right:6mm;top:15mm;width:14mm}
  h3{font-size:9pt;margin:4mm 0 0} ol{list-style:none;margin:2mm 0 3mm;padding:0;display:grid;gap:2.2mm;counter-reset:step}
  li{display:grid;grid-template-columns:5mm 1fr;gap:2.1mm;counter-increment:step} li::before{content:counter(step);border:.35mm solid #325b4e;border-radius:50%;height:5mm;width:5mm;display:grid;place-content:center;line-height:1;font-size:7.5pt;font-weight:800}
  .note{border-left:1mm solid #62a387;padding:2mm 3mm;background:#edf5ef}
  .fine{font-size:8.2pt;margin-top:2.8mm}
  footer{margin-top:auto;display:flex;align-items:center;justify-content:space-between;border-top:.3mm solid #b8c8bf;padding-top:2mm}
  .flip{font-weight:700;font-size:8pt}
  .back header{margin-bottom:1mm}
  .portal{display:inline-block;font-size:10pt;font-weight:800;text-underline-offset:.8mm;margin:.5mm 0 1.2mm}
  .guide{display:flex;align-items:center;gap:2.4mm;margin-top:auto;padding-top:1.4mm;border-top:.3mm solid #b8c8bf}
  .guide svg{width:21mm;height:21mm;flex:none} .guide a{font-weight:750;font-size:8pt;text-decoration:none}
  .guide span{display:block;font-weight:500;font-size:7.8pt;overflow-wrap:anywhere;line-height:1.2;margin-top:.8mm}
`
function steps(items) {
  return '<ol>' + items.map(item => '<li><div>' + item + '</div></li>').join('') + '</ol>'
}
await mkdir(out, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH })
try {
  const page = await browser.newPage()
  for (const [lang, t] of Object.entries(copy)) {
    const url = new URL((lang === 'en' ? 'en/' : '') + '#microsoft-365', site).href
    const qr = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'M', margin: 4 })
    await page.setContent(`<!doctype html><html lang="${lang === 'en' ? 'en' : 'de-CH'}"><head><meta charset="utf-8">
      <title>${t.title}</title><style>${css}</style></head><body>
      <article class="front"><header><b>Passkeys.</b><span>Microsoft 365 · 1/2</span></header>
        ${key}<h1>${t.front}</h1><p>${t.intro}</p><h3>${t.system}</h3>${steps(t.pinSteps)}
        <p class="note">${t.existing}</p><p class="fine">${t.other}</p>
        <footer><b class="flip">${t.turn}</b></footer></article>
      <article class="back"><header><b>Passkeys.</b><span>Microsoft 365 · 2/2</span></header>
        <h2>${t.back}</h2><p>${t.open}</p><a class="portal" href="${portal}">mysignins.microsoft.com/security-info</a>
        ${steps(t.register)}<p class="note">${t.test}</p>
        <div class="guide">${qr}<a href="${url}">${t.guide}<span>${url.replace(/^https?:\/\//,'')}</span></a></div>
      </article></body></html>`)
    await page.evaluate(() => document.fonts.ready)
    const fit = await page.locator('article').evaluateAll(sheets => sheets.every(sheet =>
      Array.from(sheet.children).every(child => child.getBoundingClientRect().bottom <= sheet.getBoundingClientRect().bottom - 12)))
    if (!fit) throw new Error('Text overflow in ' + lang + ' handout')
    await page.locator('.front').screenshot({ path: resolve(out, 'm365-first-day-' + lang + '.png') })
    await page.pdf({ path: resolve(out, 'm365-first-day-' + lang + '.pdf'), printBackground: true, preferCSSPageSize: true, tagged: true })
  }
} finally {
  await browser.close()
}
