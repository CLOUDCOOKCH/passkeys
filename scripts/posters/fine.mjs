// Keep all copy outside the illustration so the printed text stays sharp and translatable.
const captions = {
  de: {
    first: 'Passwort vergessen.',
    second: 'Schon wieder.',
    bubble: 'Alles bestens.',
    takeaway: 'Ein Passkey spart dir das Passwort.',
    action: 'Richte in den Sicherheitseinstellungen deines Kontos einen Passkey ein. Bei der nächsten Anmeldung gibst du ihn auf deinem Gerät frei.',
    scene: 'Eine Bürotaube nippt am Kaffee. Rund um den Laptop türmen sich Zettel zum Zurücksetzen von Passwörtern.',
  },
  en: {
    first: 'Forgot my password.',
    second: 'Again.',
    bubble: 'This is fine.',
    takeaway: 'A passkey skips the password.',
    action: 'Create a passkey in your account’s security settings. Next time you sign in, approve it on your device.',
    scene: 'A sleepy office pigeon sips coffee at a laptop while heaps of password-reset slips spill across the desk.',
  },
}

export const fineDesign = {
  id: 'this-is-fine',
  render(lang, art) {
    const c = lang === 'en' ? captions.en : captions.de
    return `<style>
      .fine-poster, .fine-poster * {box-sizing:border-box}
      .fine-poster {
        width:800px; height:1000px; position:relative; overflow:hidden;
        background:#fff5d9; color:#1d372c; font-family:'Manrope',sans-serif;
        padding: 31px 35px 30px;
      }
      .fine-poster .fine-imprint {
        display:block; font-weight:800; font-size:22px; line-height:1; letter-spacing:-.05em;
        margin:0 0 13px;
      }
      .fine-poster h1 {
        margin:0 0 19px; font:800 69px/.95 'Manrope',sans-serif;
        letter-spacing:-.056em;
      }
      .fine-poster h1 em {display:block;color:#a43720;font:italic 77px/.97 'Instrument Serif',Georgia,serif;letter-spacing:-.025em}
      .fine-poster .fine-scene {
        margin:0; position:relative; width:100%;height:519px;overflow:hidden;
        border:3px solid #283f2f; background:#cea967;
      }
      .fine-poster img {display:block;width:100%;height:100%;object-fit:cover;object-position:50% 50%}
      .fine-poster .fine-bubble {
        position:absolute; right:35%; top:15px; color:#1d372c; background:#fffdf5;
        border:3px solid #283f2f; padding:12px 22px 13px;border-radius:50%;
        font:italic 43px/1 'Instrument Serif',Georgia,serif;letter-spacing:-.015em;
      }
      .fine-poster .fine-bubble::before {
        content:'';position:absolute;bottom:-13px;left:28%;background:#fffdf5;
        width:18px;height:23px;transform:skew(-18deg,-16deg) rotate(28deg);
        border-bottom:3px solid #283f2f;border-right:3px solid #283f2f;
        clip-path:polygon(0 50%,100% 0,100% 100%);
      }
      .fine-poster .fine-takeaway {margin:26px 0 6px;font:800 34px/1.15 'Manrope',sans-serif;letter-spacing:-.04em;}
      .fine-poster .fine-action {margin:0;max-width:690px;font:600 27px/1.28 'Manrope',sans-serif;letter-spacing:-.022em;}
    </style>
    <article class="fine-poster">
      <span class="fine-imprint">Passkeys.</span>
      <h1>${c.first}<em>${c.second}</em></h1>
      <figure class="fine-scene"><img src="${art('fine.webp')}" alt="${c.scene}"><figcaption class="fine-bubble">${c.bubble}</figcaption></figure>
      <h2 class="fine-takeaway">${c.takeaway}</h2>
      <p class="fine-action">${c.action}</p>
    </article>`
  },
}
