// The two illustrations carry the scene. All dialogue, addresses and teaching copy
// stay in the page so both languages print with sharp, selectable type.
const spaceCopy = {
  de: {
    title: 'Schon immer.',
    description: 'Zwei Astronauten, ein Fingerabdruck und eine Frage an das eigene Gerät.',
    question: 'Moment. Mein Fingerabdruck',
    ending: 'bleibt hier?',
    reply: 'Schon immer.',
    lesson: 'Dein Gerät prüft deinen Fingerabdruck und gibt den Passkey frei. Die Website erhält eine signierte Antwort.',
    alt: 'Zwei Astronauten blicken vom Mond auf die Erde. Einer zeigt auf das Gerät an seinem Handgelenk.',
  },
  en: {
    title: 'Always has.',
    description: 'Two astronauts look back at Earth and discover where a fingerprint stays.',
    question: 'Wait, my fingerprint',
    ending: 'stays here?',
    reply: 'Always has.',
    lesson: 'Your device checks your fingerprint and unlocks your passkey. The website receives a signed response.',
    alt: 'Two astronauts look back at Earth from the Moon. One points to the device on their wrist.',
  },
}

const officeCopy = {
  de: {
    title: 'Das ist doch dasselbe Bild.',
    description: 'Zwei Seiten sehen gleich aus. Der Browser sieht den Unterschied in der Adresse.',
    request: 'Finde den Unterschied.',
    response: 'Das ist doch dasselbe Bild.',
    lesson: 'Die Seiten sehen gleich aus. Dein Browser prüft, zu welchem Dienst dein Passkey gehört. Auf einer fremden Domain bietet er ihn nicht an.',
    alt: 'Eine Büroangestellte mit hochgezogener Augenbraue hält zwei identische Blumenbilder zum Vergleich hoch.',
  },
  en: {
    title: 'They’re the same picture.',
    description: 'The pages look identical. The browser can tell their addresses apart.',
    request: 'Find the difference.',
    response: 'They’re the same picture.',
    lesson: 'The pages look alike. Your browser checks which service your passkey belongs to. It won’t offer it on an unrelated domain.',
    alt: 'An office worker raises an eyebrow and holds up two identical pictures of a flower.',
  },
}

const common = `
  .setb-print, .setb-print *, .setb-print *::before { box-sizing:border-box; }
  .setb-print { position:relative; width:800px; height:1000px; overflow:hidden;
    font-family:Manrope,Arial,sans-serif; isolation:isolate; }
  .setb-print h1, .setb-print p, .setb-print figure, .setb-print blockquote { margin:0; }
  .setb-print h1 { font-weight:800; letter-spacing:-.05em; }
  .setb-print .setb-brand { position:absolute; font-size:22px; font-weight:800; line-height:1; letter-spacing:-.06em; }
  .setb-print figure { position:absolute; overflow:hidden; }
  .setb-print figure img { display:block; width:100%; height:100%; object-fit:cover; }
  .setb-print .setb-lesson { position:absolute; font-weight:570; font-size:25px;
    line-height:1.34; letter-spacing:-.023em; }
`

function renderSpace(lang, art) {
  const c = lang === 'en' ? spaceCopy.en : spaceCopy.de
  return `<style>${common}
    .orbit-meme { color:#faf2d5; background:#152939; }
    .orbit-meme .setb-brand { top:33px; left:38px; color:#a7dfd0; }
    .orbit-meme h1 { position:absolute; top:74px; left:38px; font-size:51px; line-height:1.04; }
    .orbit-meme h1 em { display:block; color:#b5e9db; font:italic 94px/.94 'Instrument Serif',Georgia,serif;
      letter-spacing:-.032em; }
    .orbit-meme figure { top:244px; left:0; width:800px; height:505px;
      border-block:2px solid #62a59e; background:#102333; }
    .orbit-meme figure img { object-position:50% 56%; }
    .orbit-meme blockquote { position:absolute; top:724px; right:39px; padding:11px 23px 15px;
      transform:rotate(-3deg); color:#192d38; background:#f5d58e; border:3px solid #203746;
      border-radius:5px 16px 17px 16px; font-size:53px; line-height:1; font-weight:770; letter-spacing:-.05em; }
    .orbit-meme blockquote::before { content:''; position:absolute; top:-20px; left:66%;
      width:26px; height:22px; background:#f5d58e; clip-path:polygon(0 100%,22% 0,100% 100%); }
    .orbit-meme .setb-lesson { left:40px; right:40px; top:856px; max-width:694px; }
  </style><article class="setb-print orbit-meme" lang="${lang === 'en' ? 'en' : 'de-CH'}">
    <span class="setb-brand">Passkeys.</span>
    <h1>${c.question}<em>${c.ending}</em></h1>
    <figure><img src="${art('b-orbit.webp')}" alt="${c.alt}"></figure>
    <blockquote>${c.reply}</blockquote><p class="setb-lesson">${c.lesson}</p>
  </article>`
}

function renderOffice(lang, art) {
  const c = lang === 'en' ? officeCopy.en : officeCopy.de
  return `<style>${common}
    .office-meme { color:#312f23; background:#f6ecd5; }
    .office-meme .setb-brand { top:33px; left:38px; color:#683728; }
    .office-meme h1 { position:absolute; top:77px; left:36px; font-size:62px; line-height:1.02; }
    .office-meme figure { left:36px; top:173px; width:728px; height:500px;
      background:#d2b182; border:3px solid #473b2c; }
    .office-meme figure img { object-position:50% 56%; }
    .office-meme .office-addresses { position:absolute; left:36px; top:673px; width:728px;
      height:44px; border:3px solid #473b2c; border-top:0; display:grid; grid-template-columns:1fr 1fr;
      align-items:stretch; background:#efe0bd; color:#463522; }
    .office-meme .office-addresses span { display:flex; align-items:center; justify-content:center;
      font-family:ui-monospace,monospace; font-size:18px; letter-spacing:-.015em; }
    .office-meme .office-addresses span+span { border-left:1px dashed #84755e; }
    .office-meme blockquote { position:absolute; left:36px; right:36px; top:745px; color:#8e3928;
      font:italic 62px/1.03 'Instrument Serif',Georgia,serif; letter-spacing:-.028em; }
    .office-meme .setb-lesson { top:856px; left:38px; right:38px; }
  </style><article class="setb-print office-meme" lang="${lang === 'en' ? 'en' : 'de-CH'}">
    <span class="setb-brand">Passkeys.</span><h1>${c.request}</h1>
    <figure><img src="${art('b-office.webp')}" alt="${c.alt}"></figure>
    <div class="office-addresses"><span>atelier.example</span><span>atelier-help.example</span></div>
    <blockquote>${c.response}</blockquote><p class="setb-lesson">${c.lesson}</p>
  </article>`
}

export const setB = [
  {
    id: 'always-has-been', kind: 'meme', lesson: 'how',
    de: { title: spaceCopy.de.title, description: spaceCopy.de.description },
    en: { title: spaceCopy.en.title, description: spaceCopy.en.description },
    render: renderSpace,
  },
  {
    id: 'theyre-the-same', kind: 'meme', lesson: 'playground',
    de: { title: officeCopy.de.title, description: officeCopy.de.description },
    en: { title: officeCopy.en.title, description: officeCopy.en.description },
    render: renderOffice,
  },
]
