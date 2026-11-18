// Live captions preserve legibility in print and let both editions share the artwork.
const stonks = {
  id: 'stonks',
  kind: 'meme',
  lesson: 'compare',
  de: {
    title: 'Stonks: Mein Passwortdepot',
    description: 'Ein Börsenmakler feiert jedes Passwort, das er sich dank Passkey sparen kann.',
  },
  en: {
    title: 'Stonks: My password portfolio',
    description: 'A stockbroker celebrates all the passwords a passkey can save him from inventing.',
  },
  render(lang, art) {
    const german = lang === 'de'
    const headline = german
      ? 'Mein Depot an Passwörtern,<br>die ich nie erfinden musste.'
      : 'My portfolio of passwords<br>I never had to invent.'
    const takeaway = german
      ? 'Beim Anmelden mit Passkey bestätigst du auf deinem Gerät. Das Passwortfeld kannst du überspringen.'
      : 'When you sign in with a passkey, you confirm on your device. You can skip the password field.'
    return `<style>
      .d-stonks, .d-stonks * {box-sizing:border-box}
      .d-stonks {width:800px;height:1000px;position:relative;overflow:hidden;background:#d6f872;color:#142e26;font-family:Manrope,sans-serif}
      .d-stonks header {height:262px;padding:34px 39px 16px;position:relative}
      .d-stonks .d-mark {font-weight:800;font-size:22px;letter-spacing:-.055em}
      .d-stonks h1 {margin:18px 0 0;font-weight:800;font-size:55px;letter-spacing:-.062em;line-height:1.04}
      .d-stonks .d-chart {position:absolute;top:250px;left:0;right:0;height:543px;overflow:hidden;border-block:4px solid #142e26;background:#163e2e}
      .d-stonks img {width:100%;height:100%;object-fit:cover;display:block}
      .d-stonks .d-payoff {position:absolute;right:35px;bottom:9px;background:#f9edd5;color:#152e26;padding:0 25px 8px 17px;font:italic 87px/.98 'Instrument Serif',Georgia,serif;letter-spacing:-.05em;transform:rotate(-6deg);border:3px solid #142e26;box-shadow:5px 5px #142e26}
      .d-stonks footer {height:207px;position:absolute;bottom:0;padding:24px 40px;background:#142e26;color:#f9edd5;width:100%;display:flex;align-items:center;gap:25px}
      .d-stonks footer svg {flex:none}
      .d-stonks footer p {font:700 30px/1.21 Manrope,sans-serif;letter-spacing:-.033em;margin:0}
    </style>
    <article class="d-stonks"><header><b class="d-mark">Passkeys.</b><h1>${headline}</h1></header>
      <div class="d-chart"><img src="${art('d-stonks.webp')}" alt="${german ? 'Ein kantiger Börsenmakler steht vor einem steil steigenden, roten Kurspfeil.' : 'A deadpan, low-poly stockbroker poses in front of a soaring red market arrow.'}"><strong class="d-payoff">Stonks.</strong></div>
      <footer><svg aria-hidden="true" width="73" height="73" viewBox="0 0 80 80" fill="none"><path d="M6 70 36 40l9 9 22-24" stroke="#d6f872" stroke-width="8"/><path d="m49 23 23-2-1 24" stroke="#d6f872" stroke-width="8"/></svg><p>${takeaway}</p></footer>
    </article>`
  },
}

function deviceDoubles(label) {
  // Two chunky, shop-floor machines point with the same gloved hand.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 540" role="img" aria-label="${label}" width="800" height="540">
  <defs>
    <pattern id="dp-dots" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-22)"><circle cx="2" cy="2" r="1.35" fill="#282044"/></pattern>
    <pattern id="dp-shade" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(20)"><path d="M2 0v7" stroke="#20193c" stroke-width="1.5"/></pattern>
    <g id="dp-hand" fill="#fff0bb" stroke="#20193c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0 9c9-15 14-19 24-18l20 6 46-9c8-2 13 0 14 4 2 5-2 8-9 10L60 12l3 4q3 6-5 10 2 8-8 11-1 7-11 9l-19-1q-9-1-16-10l-7-7z"/>
      <path d="m32 10 23 5m-25 6 21 7m-24 4 17 5" fill="none" stroke-width="3"/>
    </g>
  </defs>
  <rect width="800" height="540" fill="#7893c4"/>
  <path d="M0 0h800v130L0 264z" fill="#abbcd7"/>
  <path d="M0 0h195L0 139zm435 0h76L0 229v-39z" fill="#d7d7de" opacity=".46"/>
  <path d="M0 221 800 68M0 258l800-132" stroke="#596b9c" stroke-width="3"/>
  <g stroke="#343151" stroke-width="5" stroke-linejoin="round">
    <path d="m514 32 286-52v282l-286 19z" fill="#526993"/>
    <path d="m527 43 261-45v247l-261 22z" fill="#a5b2ca"/>
    <g stroke="#61769e" stroke-width="3"><path d="m527 66 261-43m-261 67 261-40m-261 65 261-37m-261 61 261-35m-261 60 261-33m-261 57 261-29m-261 54 261-24m-203-180v201m97-217v207"/></g>
  </g>
  <path d="m0 329 800-81v292H0z" fill="#c7a7a2"/><path d="m0 330 800-81v14L0 347z" fill="#353352"/>
  <g stroke="#907e8c" stroke-width="3" fill="none"><path d="m0 408 800-83M0 498l800-94m-625 136L456 286m86 254 140-275"/></g>
  <g fill="#be7151" stroke="#3a2941" stroke-width="5" stroke-linejoin="round">
    <path d="m0 225 110-18 50 19v128L0 375z"/><path d="m110 207 50 19-5 128-45 5z" fill="#8e564d"/>
    <path d="m0 243 104-17v117L0 357z" fill="#dc9063"/>
    <path d="m5 245 91 89m-95 10 95-111" stroke="#935248" stroke-width="10"/>
    <path d="m716 238 84-13v130l-84 11-33-16V248z" fill="#dc916b"/><path d="m716 239 0 127-33-16V248z" fill="#ab6759"/>
  </g>
  <ellipse cx="213" cy="445" rx="132" ry="21" fill="#746c83"/><ellipse cx="606" cy="423" rx="142" ry="19" fill="#746c83"/>
  <!-- Left actor: a scarlet telephone on two rubber-hose legs. -->
  <g fill="none" stroke="#20193c" stroke-linecap="round" stroke-linejoin="round">
    <path d="M128 321q-9 44-23 81m94-73 40 68" stroke-width="27"/>
    <path d="M128 321q-9 44-23 81m94-73 40 68" stroke="#94576d" stroke-width="15"/>
    <path d="M98 392q7-5 16 2l13 24q16 0 32 9 12 10-4 14l-60 3q-14-1-13-13zM233 390q10-4 14 2l6 15q20-8 43 3 17 11-9 17l-49 6q-11 0-12-9z" fill="#fff0bb" stroke-width="5"/>
    <path d="M125 235q-42 8-49 51l11 24" stroke-width="27"/><path d="M125 235q-42 8-49 51l11 24" stroke="#d95745" stroke-width="16"/>
    <path d="M76 305q10-6 18 2l8 12q7 13-8 20-8 3-15-7l-6-12q-2-9 3-15z" fill="#fff0bb" stroke-width="5"/>
    <g transform="rotate(-9 177 242)">
      <rect x="103" y="119" width="147" height="225" rx="24" fill="#873e54" stroke-width="6"/>
      <rect x="109" y="112" width="143" height="224" rx="24" fill="#ef6349" stroke-width="6"/>
      <rect x="121" y="132" width="119" height="174" rx="11" fill="#2b3450" stroke-width="5"/>
      <path d="M129 144h80l-82 108z" fill="#415072" stroke="none"/><path d="M142 155h35l-34 40z" fill="#66728d" stroke="none"/>
      <path d="M149 214q11-16 29-12-3 18-20 17zm41-13q15-14 36-11-3 18-26 18z" fill="#fff0bb" stroke-width="3"/>
      <path d="m145 198 30-4m18-4 29-15" stroke="#19182e" stroke-width="6"/><path d="M171 259q17-14 35-9" stroke="#eaa7a4" stroke-width="6"/>
      <path d="M153 121h53" stroke-width="4"/><path d="M168 321h32" stroke-width="5"/>
    </g>
    <path d="M241 222q17 6 42 32l51-44" stroke-width="28"/><path d="M241 222q17 6 42 32l51-44" stroke="#ed644b" stroke-width="17"/>
    <use href="#dp-hand" transform="translate(322 195) rotate(-13) scale(.83)"/>
    <!-- Right actor: an open purple laptop with a visible hinge and keyboard. -->
    <path d="M547 330q-13 35-35 52m96-56q29 32 28 52" stroke-width="27"/><path d="M547 330q-13 35-35 52m96-56q29 32 28 52" stroke="#655288" stroke-width="15"/>
    <path d="M508 376q7-4 13 5l3 19q0 10-10 14l-60 4q-13-3-4-12 13-14 43-17zM631 370q8-5 14 4l7 19q20-9 41 1 15 9-5 16l-55 9q-13 0-13-11z" fill="#fff0bb" stroke-width="5"/>
    <path d="M674 247q67 2 52 36l-18 7" stroke-width="28"/><path d="M674 247q67 2 52 36l-18 7" stroke="#75628f" stroke-width="16"/>
    <path d="M710 281q9 3 10 11-3 12-18 14l-12-4q-9-2-8-11 2-8 14-12z" fill="#fff0bb" stroke-width="5"/>
    <g transform="rotate(6 582 247)">
      <path d="M511 126q0-11 14-11h126q13 0 14 13l4 136-13 8-145-9z" fill="#54436c" stroke-width="6"/>
      <rect x="521" y="111" width="148" height="150" rx="11" fill="#9c8abc" stroke-width="6"/>
      <rect x="531" y="125" width="128" height="120" rx="4" fill="#2e3853" stroke-width="4"/>
      <path d="M537 133h81l-81 72z" fill="#454f74" stroke="none"/>
      <path d="M543 170q15 0 28 12-22 9-28-6zm44 13q19-6 39 0-11 16-30 8z" fill="#fff0bb" stroke-width="3"/>
      <path d="m542 157 29 13m18 3 35 3" stroke="#19182e" stroke-width="6"/>
      <path d="M561 219q10-9 28 0" stroke="#eaa7a4" stroke-width="6"/>
      <path d="m511 255 156 2 29 56-10 10-203 3-9-13z" fill="#6d5a8b" stroke-width="6"/>
      <path d="m512 255 154 1 30 55-220 2z" fill="#b5a0c6" stroke-width="5"/>
      <path d="m520 265 132 1 10 20-153-1z" fill="#514768" stroke-width="3"/>
      <path d="m516 273 140 1m-114-9-6 17m25-17-4 18m22-17-1 17m19-16 2 16m16-16 4 16m14-16 5 16" stroke="#b7abc9" stroke-width="2"/>
      <path d="m551 291 57 0 4 10h-66z" fill="#9782a9" stroke-width="2"/>
    </g>
    <path d="M518 220q-13 7-30 24l-41-32" stroke-width="28"/><path d="M518 220q-13 7-30 24l-41-32" stroke="#80699a" stroke-width="17"/>
    <use href="#dp-hand" transform="translate(453 198) scale(-.76 .76) rotate(-6)"/>
  </g>
  <g fill="none" stroke="#27203b" stroke-linecap="round" stroke-width="5"><path d="m376 143-9-16m27 13 1-23m13 27 13-17"/></g>
  <path d="M0 0h800v24L0 137zm0 504 800-99v135H0z" fill="url(#dp-dots)" opacity=".27"/>
  </svg>`
}

const pointing = {
  id: 'spider-pointing',
  kind: 'meme',
  lesson: 'options',
  de: {
    title: 'Wer von euch hat meinen Passkey?',
    description: 'Ein Handy und ein Laptop zeigen aufeinander. Bei einem synchronisierten Passkey können beide Geräte recht haben.',
  },
  en: {
    title: 'Which one of you has my passkey?',
    description: 'A phone and a laptop point at each other. When a passkey syncs, both devices can be right.',
  },
  render(lang) {
    const german = lang === 'de'
    return `<style>
      .d-point, .d-point * {box-sizing:border-box}
      .d-point {width:800px;height:1000px;overflow:hidden;position:relative;background:#f7ddb5;color:#20193c;font-family:Manrope,sans-serif}
      .d-point header {height:202px;padding:26px 35px 18px}
      .d-point .d-mark {font-size:22px;letter-spacing:-.055em;font-weight:800}
      .d-point h1 {margin:12px 0 0;font:800 58px/.99 Manrope,sans-serif;letter-spacing:-.065em}
      .d-point h1 em {font:italic 63px/.95 'Instrument Serif',Georgia,serif;letter-spacing:-.035em}
      .d-point figure {margin:0;position:relative;height:546px;border-block:4px solid #20193c;overflow:hidden}
      .d-point figure svg {display:block;width:100%;height:100%;object-fit:cover}
      .d-point .d-call {position:absolute;bottom:16px;margin:0;padding:8px 23px;border:3px solid #20193c;background:#fff2d0;color:#20193c;font-size:31px;line-height:1.12;font-weight:800;letter-spacing:-.06em;box-shadow:4px 4px #20193c;transform:rotate(-3deg)}
      .d-point .d-left {left:36px}
      .d-point .d-right {right:36px;transform:rotate(3deg)}
      .d-point footer {display:grid;grid-template-columns:1fr 1fr;height:252px;border-bottom:10px solid #20193c}
      .d-point footer section {padding:25px 29px;color:#20193c}
      .d-point footer section+section {border-left:3px solid #20193c;background:#ffb7a1}
      .d-point footer h2 {font:800 27px/1.1 Manrope,sans-serif;letter-spacing:-.05em;margin:0 0 11px}
      .d-point footer p {margin:0;font:600 25px/1.23 Manrope,sans-serif;letter-spacing:-.03em}
    </style><article class="d-point"><header><b class="d-mark">Passkeys.</b><h1>${german ? 'Wer von euch hat<br><em>meinen Passkey?</em>' : 'Which one of you has<br><em>my passkey?</em>'}</h1></header>
    <figure>${deviceDoubles(german ? 'Ein Handy und ein Laptop mit Comic-Handschuhen zeigen aufeinander.' : 'A cartoon phone and laptop point accusingly at each other with gloved hands.')}<span class="d-call d-left">${german ? 'Mein Handy!' : 'My phone!'}</span><span class="d-call d-right">${german ? 'Mein Laptop!' : 'My laptop!'}</span></figure>
    <footer><section><h2>${german ? 'Synchronisiert?' : 'Synced?'}</h2><p>${german ? 'Vielleicht beide! Dein Anbieter kann den Passkey auf kompatiblen Geräten bereitstellen.' : 'Maybe both! Your provider can make the passkey available on compatible devices.'}</p></section>
    <section><h2>${german ? 'Gerätegebunden?' : 'Device-bound?'}</h2><p>${german ? 'Der Passkey bleibt auf dem Gerät oder Sicherheitsschlüssel, auf dem du ihn erstellt hast.' : 'The passkey stays on the device or security key where you created it.'}</p></section></footer></article>`
  },
}

export const setD = [stonks, pointing]
