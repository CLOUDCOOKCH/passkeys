// Original printed illustrations. Keep every caption live for translation and print.
const drake = {
  de: {
    title: 'Ganz mein Login.',
    description:
      'Die Ente im Daunenmantel hat eine klare Meinung zu Passwörtern. Ihr Fingerabdruck bleibt auf dem Gerät.',
    reject: 'Das Passwort schon wieder eintippen.',
    approve: 'Den Passkey per Fingerabdruck freigeben.',
    takeaway: 'Dein Fingerabdruck bleibt auf dem Gerät. Die Website erhält eine signierte Antwort.',
    alt: [
      'Die Ente im orangen Daunenmantel winkt ab.',
      'Dieselbe Ente zeigt begeistert auf die zweite Option.',
    ],
  },
  en: {
    title: 'My kind of login.',
    description:
      'A duck in a puffer jacket has a strong opinion about typing passwords. Its fingerprint stays on the device.',
    reject: 'Type that password. Again.',
    approve: 'Unlock my passkey with a fingerprint.',
    takeaway: 'Your fingerprint stays on your device. The website receives a signed response.',
    alt: [
      'A duck in an orange puffer jacket raises a wing in rejection.',
      'The same duck points approvingly at the second choice.',
    ],
  },
}

const brain = {
  de: {
    title: 'Passkey-Erleuchtung.',
    description:
      'Vom ersten Aha bis zum getesteten Ersatzweg: Vier Erkenntnisse, ein immer helleres Gehirn.',
    levels: [
      'Von Passkeys gehört.',
      'Einen Passkey erstellt.',
      'Die Anmeldung ausprobiert.',
      'Einen unabhängigen Ersatzweg getestet.',
    ],
    takeaway:
      'Für den Fall, dass dein Gerät ausfällt: Registriere zum Beispiel einen zweiten Sicherheitsschlüssel und teste ihn.',
    alt: [
      'Ein kleines blaues Gehirn.',
      'Das Gehirn leuchtet türkis.',
      'Violette Strahlen umgeben das Gehirn.',
      'Ein goldenes Gehirn strahlt wie eine Sonne.',
    ],
  },
  en: {
    title: 'Passkey enlightenment.',
    description:
      'Four lightbulb moments, from hearing about passkeys to testing an independent way back in.',
    levels: [
      'Heard of passkeys.',
      'Created a passkey.',
      'Tried signing in.',
      'Tested an independent backup method.',
    ],
    takeaway:
      'Plan for a lost device. For example, register a second security key with the service and test it.',
    alt: [
      'A small blue brain.',
      'The brain lights up in turquoise.',
      'Violet rays surround the brain.',
      'A golden brain shines like a sun.',
    ],
  },
}

function catalogue(copy, lang) {
  const { title, description } = copy[lang]
  return { title, description }
}

function renderDrake(lang, art) {
  const c = drake[lang]
  const cells = [
    ['no', c.reject, c.alt[0]],
    ['yes', c.approve, c.alt[1]],
  ]
    .map(
      ([state, text, alt]) => `<div class="duck-row duck-${state}">
    <img src="${art('a-drake-' + state + '.webp')}" alt="${alt}">
    <p>${text}</p>
  </div>`,
    )
    .join('')
  return `<style>
    .duck-print, .duck-print * { box-sizing:border-box }
    .duck-print {
      --ink:#172e23; --paper:#fff5cf;
      width:800px; height:1000px; margin:0; padding:0 25px;
      background:var(--paper); color:var(--ink); font-family:Manrope,sans-serif;
      display:grid; grid-template-rows:156px 702px 142px; overflow:hidden;
    }
    .duck-head { align-self:end; padding:0 0 16px }
    .duck-print .duck-mark { display:block; font-weight:800; font-size:21px; line-height:1; letter-spacing:-.05em }
    .duck-print h1 { font:800 80px/.96 Manrope,sans-serif; letter-spacing:-.07em; margin:9px 0 0; white-space:nowrap }
    .duck-grid { display:grid; grid-template-rows:1fr 1fr; border:3px solid var(--ink) }
    .duck-row { display:grid; grid-template-columns:57% 43%; min-height:0; }
    .duck-no { border-bottom:3px solid var(--ink); background:#f5d675 }
    .duck-yes { background:#d5e894 }
    .duck-print .duck-row img { min-height:0; min-width:0; height:100%; width:100%; object-fit:cover; border-right:3px solid var(--ink) }
    .duck-no img { object-position:15% center }
    .duck-yes img { object-position:68% center }
    .duck-print .duck-row p {
      display:flex; align-items:center; margin:0; padding:20px;
      font:800 44px/1.07 Manrope,sans-serif; letter-spacing:-.052em;
      overflow-wrap:break-word; hyphens:manual;
    }
    .duck-print .duck-yes p { font:italic 58px/1 'Instrument Serif',Georgia,serif; letter-spacing:-.036em }
    .duck-print .duck-caption { display:flex; align-items:center; margin:0; padding:0 5px 2px; font:600 25px/1.28 Manrope,sans-serif; letter-spacing:-.023em; max-width:700px; text-wrap:pretty; }
  </style>
  <article class="duck-print"><header class="duck-head"><span class="duck-mark">Passkeys.</span><h1>${c.title}</h1></header>
  <div class="duck-grid">${cells}</div><p class="duck-caption">${c.takeaway}</p></article>`
}

function renderBrain(lang, art) {
  const c = brain[lang]
  const rows = c.levels
    .map(
      (text, i) => `<li>
    <div class="brain-caption"><span class="brain-count" aria-hidden="true">0${i + 1}</span><p>${text}</p></div>
    <img src="${art('a-brain-' + i + '.webp')}" alt="${c.alt[i]}">
  </li>`,
    )
    .join('')
  return `<style>
    .brain-print, .brain-print * { box-sizing:border-box }
    .brain-print {
      --space:#100921; --paper:#f4eedf;
      display:grid; grid-template-rows:137px 756px 107px; overflow:hidden;
      margin:0; padding:0 28px; width:800px; height:1000px;
      background:var(--space); color:var(--paper); font-family:Manrope,sans-serif;
    }
    .brain-head { display:flex; flex-direction:column; justify-content:end; gap:5px; padding:0 0 12px }
    .brain-print .brain-mark { font:800 20px/1 Manrope,sans-serif; letter-spacing:-.05em; color:#ddd3e7 }
    .brain-print h1 { margin:0; font:italic 73px/1 'Instrument Serif',Georgia,serif; letter-spacing:-.035em; white-space:nowrap }
    .brain-print ol { list-style:none; padding:0; margin:0; display:grid; grid-template-rows:repeat(4,1fr); border-top:1px solid #655772 }
    .brain-print li { --tone:#a0c6db; display:grid; grid-template-columns:minmax(0,1fr) 267px; min-height:0; border-bottom:1px solid #655772; }
    .brain-print li:nth-child(2) { --tone:#78e8e6 }
    .brain-print li:nth-child(3) { --tone:#ed9be8 }
    .brain-print li:nth-child(4) { --tone:#ffcd69 }
    .brain-print .brain-caption { display:flex; align-items:center; padding:6px 25px 6px 2px; gap:15px }
    .brain-print .brain-count { align-self:center; flex:none; font:600 22px/1 Manrope,sans-serif; font-variant-numeric:tabular-nums; color:var(--tone); border-top:2px solid currentColor; padding-top:5px; }
    .brain-print .brain-caption p { margin:0; font:700 39px/1.1 Manrope,sans-serif; letter-spacing:-.045em; text-wrap:balance; }
    .brain-print li:last-child p { color:var(--tone) }
    .brain-print li img { width:100%; height:100%; min-height:0; object-fit:cover; object-position:center 39%; }
    .brain-print .brain-note { align-self:center; margin:0; font:540 22px/1.34 Manrope,sans-serif; letter-spacing:-.015em; color:#e2dae5; text-wrap:pretty }
  </style>
  <article class="brain-print"><header class="brain-head"><span class="brain-mark">Passkeys.</span><h1>${c.title}</h1></header><ol>${rows}</ol><p class="brain-note">${c.takeaway}</p></article>`
}

export const setA = [
  {
    id: 'drake',
    kind: 'meme',
    lesson: 'setup',
    de: catalogue(drake, 'de'),
    en: catalogue(drake, 'en'),
    render: renderDrake,
  },
  {
    id: 'expanding-brain',
    kind: 'meme',
    lesson: 'recovery',
    de: catalogue(brain, 'de'),
    en: catalogue(brain, 'en'),
    render: renderBrain,
  },
]
