const pigeonCopy = {
  de: {
    title: 'Ist das etwa mein Website-Passwort?',
    description: 'Ein Forscher zeigt auf einen Schmetterling mit der Aufschrift «Geräte-PIN».',
    pin: 'Meine Geräte-PIN',
    question: 'Ist das etwa mein<br>Website-Passwort?',
    answer: 'Die PIN bleibt auf deinem Gerät.',
    detail: 'Mit ihr gibst du den Passkey frei. Beim Dienst kommt eine signierte Antwort an.',
  },
  en: {
    title: 'Is this a website password?',
    description:
      'A researcher points at a butterfly labelled “My device PIN” and asks if it’s a website password.',
    pin: 'My device PIN',
    question: 'Is this a<br>website password?',
    answer: 'The PIN stays on your device.',
    detail: 'It lets you use your passkey. The website gets a signed response.',
  },
}

const skeletonCopy = {
  de: {
    title: 'Immer noch im Posteingang',
    description: 'Ein Skelett wartet vor einem alten Bildschirm auf die E-Mail zum Passwort-Reset.',
    lead: 'Ich warte noch kurz',
    tail: 'auf die Reset-Mail.',
    takeaway: 'Mein anderes Konto hat einen Passkey.',
    ending: 'Da bin ich schon drin.',
  },
  en: {
    title: 'Still checking my inbox',
    description: 'A skeleton at a cobwebbed monitor waits for the password reset email.',
    lead: 'Just waiting for',
    tail: 'the reset email.',
    takeaway: 'My other account has a passkey.',
    ending: 'Already signed in there.',
  },
}

const pigeon = {
  id: 'is-this-a-pigeon',
  kind: 'meme',
  lesson: 'how',
  ...pigeonCopy,
  render(lang, art) {
    const c = pigeonCopy[lang]
    return `<style>
      .pigeon-print { position:relative; width:800px; height:1000px; overflow:hidden; color:#172c28; background:#fff4d4; font-family:Manrope,sans-serif; }
      .pigeon-print p,.pigeon-print h1 { margin:0; }
      .pigeon-scene { position:relative; height:754px; overflow:hidden; border-bottom:5px solid #162f37; }
      .pigeon-scene img { width:100%; height:100%; object-fit:cover; object-position:center 36%; }
      .pigeon-label { position:absolute; top:29px; right:18px; padding:8px 19px; transform:rotate(5deg); border:3px solid #193636; border-radius:7px; background:#fff2ae; font-size:29px; font-weight:790; box-shadow:3px 4px 0 #173737; }
      .pigeon-print h1 { position:absolute; left:27px; right:27px; bottom:20px; color:white; font-size:68px; text-align:center; letter-spacing:-.045em; line-height:1.02; font-weight:800; paint-order:stroke fill; -webkit-text-stroke:7px #183036; text-shadow:1px 5px #183036; }
      .pigeon-caption { padding:25px 34px 0; }
      .pigeon-caption h2 { margin:0 0 7px; font-size:37px; letter-spacing:-.045em; line-height:1.18; }
      .pigeon-caption p { max-width:685px; font-size:26px; line-height:1.32; }
      .pigeon-imprint { position:absolute; bottom:22px; left:34px; font-size:20px; font-weight:800; letter-spacing:-.06em; }
    </style><article class="pigeon-print"><div class="pigeon-scene"><img src="${art('e-butterfly.jpg')}" alt="${c.description}"><span class="pigeon-label">${c.pin}</span><h1>${c.question}</h1></div>
    <div class="pigeon-caption"><h2>${c.answer}</h2><p>${c.detail}</p></div><b class="pigeon-imprint">Passkeys.</b></article>`
  },
}
const skeleton = {
  id: 'waiting-skeleton',
  kind: 'meme',
  lesson: 'setup',
  ...skeletonCopy,
  render(lang, art) {
    const c = skeletonCopy[lang]
    return `<style>
      .skeleton-print { width:800px; height:1000px; overflow:hidden; background:#122c48; color:#ffdf9d; font-family:Manrope,sans-serif; }
      .skeleton-print header {height:238px; padding:18px 30px;}
      .skeleton-print header b {font-size:20px; letter-spacing:-.06em;}
      .skeleton-print h1 {font-size:66px; letter-spacing:-.048em; font-weight:800; line-height:1.03; margin:10px 0 0;}
      .skeleton-print h1 em {display:block; font:italic 90px/.92 'Instrument Serif',Georgia,serif; color:#ffae76; }
      .skeleton-print img {display:block; width:740px; height:590px; margin:0 30px; object-fit:cover; object-position:50% 53%; border:2px solid #f5ab6b;}
      .skeleton-print footer {padding:24px 30px 14px; font-size:32px; font-weight:670; line-height:1.25; letter-spacing:-.03em; }
      .skeleton-print footer em {display:block; font-size:37px; font-weight:800; font-style:normal; color:#ffab70; }
    </style><article class="skeleton-print"><header><b>Passkeys.</b><h1>${c.lead}<em>${c.tail}</em></h1></header>
    <img src="${art('e-skeleton.jpg')}" alt="${c.description}"><footer>${c.takeaway}<em>${c.ending}</em></footer></article>`
  },
}
export const setE = [pigeon, skeleton]
