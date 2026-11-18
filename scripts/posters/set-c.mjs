// Text and artwork are separate so replacements can be translated without repainting the posters.
const rangerCopy = {
  de: {
    title: 'Man kann nicht einfach …',
    description: 'Die Waldläuferin erklärt mit einer Geste, warum die falsche Website leer ausgeht.',
    punch: '… auf einer falschen Website den Passkey der echten benutzen.',
    lesson: 'Beim Anmelden prüft der Browser die Adresse. Eine fremde Domain kann den Passkey des echten Dienstes nicht anfordern.',
    alt: 'Eine ernste Waldläuferin im Holzschnitt hebt Daumen und Zeigefinger über dem Ratstisch.',
  },
  en: {
    title: 'One does not simply…',
    description: 'A woodland ranger has a point to make about passkeys and fake websites.',
    punch: '…use the real site’s passkey on the fake one.',
    lesson: 'At sign-in, your browser checks the site’s address. An unrelated domain cannot request the genuine service’s passkey.',
    alt: 'A solemn ranger in a woodcut forest council scene holds thumb and forefinger close together.',
  },
}

const debateCopy = {
  de: {
    title: 'Ändere meine Meinung.',
    description: 'Kaffee, ein Klapptisch und eine These zum besten Zeitpunkt für den Ersatzschlüssel.',
    sign: 'Den Ersatzschlüssel registriert man <em>vor</em> dem Verlust.',
    takeaway: 'Der beste Moment? Solange du noch reinkommst.',
    lesson: 'Erlaubt dein Dienst mehrere Passkeys? Registriere einen zweiten Sicherheitsschlüssel, teste ihn und bewahre ihn separat auf.',
    alt: 'Eine Frau mit Kaffeetasse lädt an einem Tisch im Park zur Diskussion ein. Neben ihr liegt ein USB-Sicherheitsschlüssel.',
  },
  en: {
    title: 'Change my mind.',
    description: 'One folding table, a small coffee, and a strong opinion about spare security keys.',
    sign: 'Register the spare key <em>before</em> you lose the first one.',
    takeaway: 'The best time? While you can still sign in.',
    lesson: 'If your service lets you add multiple passkeys, register a second security key. Try signing in with it, then keep it somewhere separate.',
    alt: 'A woman with an espresso invites a passerby to debate her in the park. A small USB security key rests on her table.',
  },
}

const shared = `
  .set-c, .set-c * {box-sizing:border-box}
  .set-c {width:800px;height:1000px;overflow:hidden;position:relative;font-family:Manrope,sans-serif}
  .set-c h1,.set-c h2,.set-c p,.set-c figure {margin:0}
  .set-c img {display:block;width:100%;height:100%;object-fit:cover}
  .set-c .sc-brand {font-weight:800;font-size:22px;line-height:1;letter-spacing:-.045em}
  .set-c .sc-lesson {font-size:26px;font-weight:570;line-height:1.3;letter-spacing:-.02em;text-wrap:pretty}
`

function renderRanger(lang, art) {
  const c = rangerCopy[lang]
  return `<style>${shared}
    .sc-ranger {background:#232f23;color:#fbefbd;padding:32px 34px 30px}
    .sc-ranger .sc-brand {color:#e7c071}
    .sc-ranger h1 {font:italic 84px/1.04 'Instrument Serif',Georgia,serif;letter-spacing:-.03em;margin:8px 0 21px}
    .sc-ranger figure {width:100%;height:463px;outline:1px solid #bc9756;outline-offset:4px}
    .sc-ranger h2 {font:italic 64px/.98 'Instrument Serif',Georgia,serif;letter-spacing:-.014em;margin:27px 0 22px;text-wrap:balance}
    .sc-ranger .sc-lesson {border-top:1px solid #b29a69;padding-top:18px;color:#f5e9c9}
  </style><article class="set-c sc-ranger" lang="${lang === 'en' ? 'en' : 'de-CH'}">
    <span class="sc-brand">Passkeys.</span><h1>${c.title}</h1>
    <figure><img src="${art('c-ranger.webp')}" alt="${c.alt}"></figure>
    <h2>${c.punch}</h2><p class="sc-lesson">${c.lesson}</p>
  </article>`
}

function renderDebate(lang, art) {
  const c = debateCopy[lang]
  return `<style>${shared}
    .sc-debate {background:#e6e2fc;color:#261e3c;padding:32px 30px}
    .sc-debate h1 {font:800 63px/1.08 Manrope,sans-serif;letter-spacing:-.056em;margin:12px 0 24px}
    .sc-debate figure {position:relative;width:100%;height:493px;border:3px solid #30253c;overflow:hidden}
    .sc-debate figcaption {position:absolute;left:23.5%;right:10.3%;top:53%;bottom:6.4%;display:flex;align-items:center;justify-content:center;margin:0;text-align:center;transform:rotate(-.45deg)}
    .sc-debate figcaption span {font:800 38px/1.08 Manrope,sans-serif;letter-spacing:-.045em;text-wrap:balance;color:#202a27}
    .sc-debate figcaption em {font:italic 1.38em/.82 'Instrument Serif',Georgia,serif}
    .sc-debate h2 {font:italic 57px/1.02 'Instrument Serif',Georgia,serif;letter-spacing:-.016em;text-wrap:balance;max-width:710px;margin:24px 0 15px}
    .sc-debate .sc-lesson {max-width:725px}
  </style><article class="set-c sc-debate" lang="${lang === 'en' ? 'en' : 'de-CH'}">
    <span class="sc-brand">Passkeys.</span><h1>${c.title}</h1>
    <figure><img src="${art('c-debate.webp')}" alt="${c.alt}"><figcaption><span>${c.sign}</span></figcaption></figure>
    <h2>${c.takeaway}</h2><p class="sc-lesson">${c.lesson}</p>
  </article>`
}

export const setC = [
  {
    id: 'one-does-not', kind: 'meme', lesson: 'playground',
    de: { title: rangerCopy.de.title, description: rangerCopy.de.description },
    en: { title: rangerCopy.en.title, description: rangerCopy.en.description },
    render: renderRanger,
  },
  {
    id: 'change-my-mind', kind: 'meme', lesson: 'recovery',
    de: { title: debateCopy.de.title, description: debateCopy.de.description },
    en: { title: debateCopy.en.title, description: debateCopy.en.description },
    render: renderDebate,
  },
]
