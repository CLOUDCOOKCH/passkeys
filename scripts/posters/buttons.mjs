// Original screenprint artwork. The captions stay live in both print and PNG renders.
const copy = {
  de: {
    title: 'Ich beim nächsten Login.',
    left: 'Nochmals das Passwort zurücksetzen',
    right: 'Einen Passkey einrichten',
    takeaway: 'Mit einem Passkey kannst du dich beim nächsten Besuch ohne Passwort anmelden.',
    alt: 'Eine nervöse Motte zögert zwischen einem orangen und einem grünen Druckknopf.',
  },
  en: {
    title: 'Me, next time I sign in.',
    left: 'Reset my password again',
    right: 'Set up a passkey',
    takeaway: 'With a passkey, you can sign in next time without a password.',
    alt: 'An anxious moth hesitates between an orange push button and a green one.',
  },
}

export const buttonsDesign = {
  id: 'two-buttons',
  render(lang, art) {
    const c = lang === 'en' ? copy.en : copy.de
    return `<style>
      .two-buttons, .two-buttons * { box-sizing: border-box; }
      .two-buttons {
        --paper: #f4e9bf; --ink: #123d2f; --orange: #ffb631; --lime: #c8e66d;
        position: relative; width: 800px; height: 1000px; overflow: hidden;
        isolation: isolate; background: var(--paper); color: var(--ink);
        font-family: 'Manrope', sans-serif; padding: 0 30px;
      }
      .two-buttons .bt-head {
        height: 146px; display: flex; justify-content: flex-end; flex-direction: column;
        gap: 1px; padding: 0 1px 14px;
      }
      .two-buttons .bt-mark { font-weight: 800; font-size: 21px; line-height: 1; letter-spacing: -.055em; }
      .two-buttons h1 {
        margin: 0; font: italic 81px/.99 'Instrument Serif', Georgia, serif;
        letter-spacing: -.035em; white-space: nowrap; color: var(--ink);
      }
      .two-buttons .bt-print {
        position: relative; height: 666px; overflow: hidden;
        background: #16412c; border: 2px solid var(--ink);
      }
      .two-buttons .bt-print img {
        display: block; width: 100%; height: 100%; object-fit: cover; object-position: 50% 74%;
      }
      .two-buttons .bt-choices {
        position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr;
        margin-top: -1px; border: 2px solid var(--ink);
      }
      .two-buttons .bt-choice {
        position: relative; display: flex; align-items: center; justify-content: center;
        min-width: 0; height: 95px; padding: 8px 16px; text-align: center;
        font-size: 31px; font-weight: 800; line-height: 1.06; letter-spacing: -.04em;
        text-wrap: balance; color: #123327;
      }
      .two-buttons .bt-choice::before {
        content: ''; position: absolute; top: -11px; left: calc(50% - 9px);
        width: 18px; height: 18px; transform: rotate(45deg);
        border-top: 2px solid var(--ink); border-left: 2px solid var(--ink); background: inherit;
      }
      .two-buttons .bt-left { background: var(--orange); border-right: 2px solid var(--ink); }
      .two-buttons .bt-right { background: var(--lime); }
      .two-buttons .bt-caption {
        display: flex; align-items: center; min-height: 89px; margin: 0; padding: 8px 2px;
        max-width: 700px; color: var(--ink); font-weight: 600; font-size: 24px;
        line-height: 1.24; letter-spacing: -.022em; text-wrap: pretty;
      }
    </style>
    <article class="two-buttons">
      <header class="bt-head"><span class="bt-mark">Passkeys.</span><h1>${c.title}</h1></header>
      <div class="bt-print"><img src="${art('buttons.webp')}" alt="${c.alt}"></div>
      <div class="bt-choices"><div class="bt-choice bt-left">${c.left}</div><div class="bt-choice bt-right">${c.right}</div></div>
      <p class="bt-caption">${c.takeaway}</p>
    </article>`
  },
}
