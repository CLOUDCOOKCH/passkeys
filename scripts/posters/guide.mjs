/** Original vector artwork for the two educational prints. All coordinates are print units. */
const base = `
  .guide-print { position:relative; isolation:isolate; width:800px; height:1000px; overflow:hidden;
    box-sizing:border-box; font-family:Manrope,Arial,sans-serif; }
  .guide-print *, .guide-print *::before { box-sizing:border-box; }
  .guide-print h1, .guide-print p { margin:0; }
  .guide-print h1 { position:absolute; font-family:Manrope,Arial,sans-serif; font-weight:760;
    letter-spacing:-.05em; line-height:1.02; }
  .guide-print h1 em { font-family:"Instrument Serif",Georgia,serif; font-weight:400;
    font-style:italic; display:block; letter-spacing:-.035em; }
  .guide-print .guide-caption { position:absolute; font-size:28px; line-height:1.37;
    letter-spacing:-.035em; font-weight:550; }
  .guide-print svg { display:block; }
  .guide-print .guide-footer { position:absolute; inset:auto 50px 31px; border-top:1.5px solid currentColor;
    padding-top:15px; display:flex; align-items:center; justify-content:space-between; }
  .guide-print .guide-imprint { display:flex; align-items:center; gap:7px; font-size:22px;
    line-height:1; letter-spacing:-.075em; font-weight:800; }
  .guide-print .guide-subject { font-size:15px; line-height:1; letter-spacing:-.01em; font-weight:630; }
`

function footer(topic) {
  return `<footer class="guide-footer"><div class="guide-imprint">
    <svg width="21" height="21" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11.6 14.9a6.7 6.7 0 1 0-3.8-3.8L1.7 17.3v4.9h4.7v-3h3v-3z"
        fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>
      <circle cx="16" cy="8.1" r="1.55" fill="currentColor"/>
    </svg>Passkeys.</div><span class="guide-subject">${topic}</span></footer>`
}

// Draw open nested ridges rather than layering closed ellipses. The changing ridge ends
// form the whorl and a delta on the right, as in a simplified fingerprint illustration.
function fingerRidges() {
  const paths = []
  for (let i = 0; i < 10; i++) {
    const rx = 77 - i * 7.1
    const ry = 109 - i * 7.9
    const bottom = 83 - i * 2
    const end = 56 - i * 3.8
    const gap = i % 3 === 1 ? ' pathLength="100" stroke-dasharray="43 2 55"' : ''
    paths.push(`<path${gap} d="M${-rx - 4} ${bottom} C${-rx - 1} ${bottom - 28}
      ${-rx + 1} 32 ${-rx} 1 C${-rx - 2} ${-ry * .63} ${-rx * .65} ${-ry} 2 ${-ry}
      C${rx * .70} ${-ry} ${rx + 4} ${-ry * .55} ${rx + 1} 5
      Q${rx - 1} ${end - 11} ${rx + 5} ${end}"/>`)
  }
  paths.push('<path d="M-5 73c9-26 8-47 7-62m1 67c4-13 7-23 8-33m1 34 4-15"/>')
  for (let i = 0; i < 6; i++) {
    const x = 16 + i * 10
    const y = 35 + i * 4.1
    paths.push(`<path d="M${x} ${y}q2 14 17 29"/>`)
  }
  return paths.join('')
}

function privacyArtwork() {
  return `<svg viewBox="0 0 800 457" class="privacy-art" aria-hidden="true">
    <defs>
      <clipPath id="guide-ridge-window"><rect x="-95" y="-144" width="190" height="289" rx="20"/></clipPath>
      <pattern id="guide-privacy-dots" patternUnits="userSpaceOnUse" width="9" height="9">
        <circle cx="1.5" cy="1.5" r="1" fill="#a84b3d"/>
      </pattern>
    </defs>
    <rect width="800" height="457" fill="#f6bca0"/>
    <circle cx="319" cy="277" r="270" fill="#f8d1b8"/>
    <circle cx="319" cy="277" r="207" fill="none" stroke="#c57361" stroke-width="1.2"/>
    <path d="M625 0h175v152Z" fill="url(#guide-privacy-dots)"/>
    <path d="M640 457h160V297Z" fill="#eaa88f"/>
    <g transform="translate(323 229) rotate(-14) scale(1.1)" stroke-linejoin="round">
      <rect x="-115" y="-169" width="235" height="350" rx="31" fill="#9c4943" stroke="#532e34" stroke-width="4"/>
      <rect x="-120" y="-176" width="230" height="348" rx="29" fill="#7a3b40" stroke="#532e34" stroke-width="4"/>
      <rect x="-108" y="-164" width="208" height="323" rx="21" fill="#f6cfba" stroke="#532e34" stroke-width="2"/>
      <g transform="translate(-4 -1)" clip-path="url(#guide-ridge-window)">
        <path d="M-93-88v-28h22m140 0h21v28M-93 80v28h22m140 0h21V80" fill="none"
          stroke="#a9574c" stroke-width="2" stroke-linecap="round"/>
        <g transform="translate(-1 7) rotate(5)" fill="none" stroke="#6e323b" stroke-width="4.2"
          stroke-linecap="round">${fingerRidges()}</g>
      </g>
      <path d="M-21-152H8m-24 298h31" fill="none" stroke="#703940" stroke-width="4" stroke-linecap="round"/>
      <circle cx="19" cy="-152" r="2.2" fill="#703940"/>
      <path d="M-122-99v33m0 12v22m235-48v45" stroke="#532e34" stroke-width="4" stroke-linecap="round"/>
    </g>
    <path d="M425 187c60-35 97-19 134 6" fill="none" stroke="#873d3e"
      stroke-width="2.4" stroke-dasharray="3 8" stroke-linecap="round"/>
    <g transform="translate(597 208) rotate(9)">
      <path d="M-46-37h75l14 15v62h-89z" fill="#ca806c" stroke="#532e34" stroke-width="3.3" stroke-linejoin="round"/>
      <path d="M-48-42h75l14 15v62h-89z" fill="#fff4df" stroke="#532e34" stroke-width="3.3" stroke-linejoin="round"/>
      <path d="M27-41v15h13m-77-2h27m-27 8h14" fill="none" stroke="#894942" stroke-width="1.8"/>
      <path d="M-34 18q16-8 25-29c4-6 10-3 6 7l-8 24c-1 4 2 5 5 1L3 9q-4 15 5 8l6-5q0 6 11 3"
        fill="none" stroke="#803b41" stroke-width="2.6" stroke-linecap="round"/>
    </g>
  </svg>`
}

function onlyHere(lang) {
  const de = lang.startsWith('de')
  const headline = de ? ['Dein Fingerabdruck', 'bleibt bei dir.'] : ['Your fingerprint', 'stays with you.']
  const text = de
    ? 'Dein Gerät prüft deinen Fingerabdruck und gibt den Passkey frei. Die Website erhält eine signierte Antwort.'
    : 'Your device checks your fingerprint and unlocks your passkey. The website receives a signed response.'
  return `<style>${base}
    .privacy-print { color:#512f36; background:#fff2df; }
    .privacy-print h1 { left:48px; top:48px; font-size:76px; white-space:nowrap; }
    .privacy-print h1 em { color:#9a4646; font-size:112px; line-height:1.01; margin-left:-3px; }
    .privacy-print .privacy-art { position:absolute; left:0; top:281px; width:800px; height:457px; }
    .privacy-print .guide-caption { left:50px; top:783px; width:686px; }
  </style><article class="guide-print privacy-print" lang="${de ? 'de-CH' : 'en'}">
    <h1>${headline[0]}<em>${headline[1]}</em></h1>${privacyArtwork()}
    <p class="guide-caption">${text}</p>${footer(de ? 'Lokale Freigabe' : 'Local verification')}
  </article>`
}

function registrationTag(x, y, rotation, label, address, isPasskey) {
  const brand = isPasskey ? '#252c68' : '#142b46'
  const fill = isPasskey ? '#ddd8fa' : '#b9e5dd'
  const tab = isPasskey ? '#b1a9e6' : '#8cc8c4'
  const mark = isPasskey
    ? '<path d="M9 10a13 13 0 1 1 5-10l18 18-5 5-5-1-1-4-6-1v-4Z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="-1" cy="-5" r="3" fill="currentColor"/>'
    : '<circle r="18" fill="none" stroke="currentColor" stroke-width="2.7"/><ellipse rx="8" ry="18" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M-17-5h34m-34 10h34" stroke="currentColor" stroke-width="2.2"/>'
  return `<g transform="translate(${x} ${y}) rotate(${rotation})" color="${brand}" fill="${brand}">
    <path d="M0 0h362l29 29v106H0Z" fill="#102864" opacity=".65" transform="translate(5 8)"/>
    <path d="M0 0h362l29 29v106H0Z" fill="${fill}" stroke="${brand}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M2 2h74v131H2Z" fill="${tab}"/>
    <path d="M77 9v116" stroke="${brand}" stroke-dasharray="3 4" stroke-width="1.5"/>
    <g transform="translate(38 62)">${mark}</g>
    <text x="98" y="42" font-family="Manrope,Arial,sans-serif" font-weight="680" font-size="17">${label}</text>
    <text x="96" y="85" font-family="Manrope,Arial,sans-serif" font-weight="760" font-size="33"
      letter-spacing="-1.4">${address}</text>
    <path d="M98 107h147" stroke="${brand}" stroke-width="2"/>
    <path d="M253 107h10m5 0h15m5 0h4" stroke="${brand}" stroke-width="3"/>
    <circle cx="365" cy="109" r="7.5" fill="#27498a" stroke="${brand}" stroke-width="2"/>
  </g>`
}

function addressArtwork(de) {
  return `<svg class="address-art" width="800" height="450" viewBox="0 0 800 450" aria-hidden="true">
    <defs><pattern id="guide-route-field" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#7486b6"/></pattern></defs>
    <path d="M0 0h800v450H0z" fill="#26458c"/>
    <path d="M0 0h228L0 228zM800 450H558l242-242z" fill="url(#guide-route-field)"/>
    <g fill="none" stroke="#738bc0" stroke-width="1.4">
      <path d="M-40 342c71-124 173-82 279-190S415-36 514-23M-42 366c84-131 180-91 295-200S428-25 536-19"/>
      <path d="M655-30c-70 144-40 237-163 333S287 399 250 480M681-33c-70 151-42 250-174 354S302 409 275 480"/>
    </g>
    <path d="M380 126C432 82 524 42 573 92s2 88-52 120-130 47-85 103" fill="none"
      stroke="#1b2f65" stroke-width="7" stroke-linecap="round" transform="translate(1 4)"/>
    <path d="M380 126C432 82 524 42 573 92s2 88-52 120-130 47-85 103" fill="none"
      stroke="#f7d5a2" stroke-width="5" stroke-linecap="round"/>
    ${registrationTag(68, 102, -10, de ? 'Passkey für' : 'Passkey for', 'atelier.example', true)}
    ${registrationTag(310, 240, 8, 'Website', 'atelier.example', false)}
  </svg>`
}

function rightSite(lang) {
  const de = lang.startsWith('de')
  const headline = de ? ['Die Adresse', 'entscheidet.'] : ['The address', 'matters.']
  const text = de
    ? 'Ein Passkey gehört zum Dienst, für den du ihn erstellt hast. Eine Website auf einer fremden Domain kann ihn für ihre Anmeldung nicht verwenden.'
    : 'Your passkey belongs to the service where you created it. The browser won’t offer it on an unrelated website, even if the page looks identical.'
  return `<style>${base}
    .address-print { color:#f4f1df; background:#192e60; }
    .address-print .address-art { position:absolute; left:0; top:0; }
    .address-print h1 { left:46px; top:482px; font-size:100px; }
    .address-print h1 em { color:#bce6da; font-size:134px; line-height:.87; }
    .address-print .guide-caption { left:50px; top:754px; width:688px; font-size:27px; }
    .address-print .guide-footer { border-color:#8493ac; }
  </style><article class="guide-print address-print" lang="${de ? 'de-CH' : 'en'}">
    ${addressArtwork(de)}<h1>${headline[0]}<em>${headline[1]}</em></h1>
    <p class="guide-caption">${text}</p>${footer(de ? 'Bindung an den Dienst' : 'Service binding')}
  </article>`
}

export const guideDesigns = [
  { id: 'only-here', render: onlyHere },
  { id: 'right-site', render: rightSite },
]
