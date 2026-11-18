import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Download, Printer } from 'lucide-react'
import type { Lang } from '../i18n/home'
import type { CardMethod, CardModel } from '../lib/customCard'
import './custom-card.css'

type Side = 'front' | 'back'

const copy = {
  en: {
    title: 'Make a first-day card for your team',
    intro: 'Choose the method your organisation approves. The QR code takes employees straight to that walkthrough in the language you select.',
    method: 'Approved sign-in method', key: 'FIDO2 security key', language: 'Card language',
    company: 'Company name', contact: 'Help-desk contact', optional: 'optional',
    companyHint: 'e.g. Atelier', contactHint: 'Email, phone or service desk',
    front: 'Front', back: 'Back', preview: 'Card preview', sides: 'Preview side',
    download: 'Download PDF', print: 'Print card', working: 'Preparing PDF…',
    format: 'A6 · 2 pages. Print double-sided and flip on the long edge.',
    error: 'The card could not be prepared. Please try again.', retry: 'Try again',
  },
  de: {
    title: 'Eine Startkarte für dein Team gestalten',
    intro: 'Wähle die von deiner Firma freigegebene Methode. Der QR-Code führt Mitarbeitende direkt zur passenden Anleitung in der gewählten Sprache.',
    method: 'Freigegebene Anmeldemethode', key: 'FIDO2-Sicherheitsschlüssel', language: 'Kartensprache',
    company: 'Firmenname', contact: 'Kontakt zum IT-Support', optional: 'optional',
    companyHint: 'z. B. Atelier', contactHint: 'E-Mail, Telefon oder Servicedesk',
    front: 'Vorderseite', back: 'Rückseite', preview: 'Kartenvorschau', sides: 'Vorschauseite',
    download: 'PDF herunterladen', print: 'Karte drucken', working: 'PDF wird erstellt…',
    format: 'A6 · 2 Seiten. Beidseitig drucken und an der langen Kante wenden.',
    error: 'Die Karte konnte nicht erstellt werden. Bitte versuche es erneut.', retry: 'Erneut versuchen',
  },
}

function CardSheet({ card, side }: { card: CardModel; side: Side }) {
  const face = card[side]
  return (
    <div className="card-sheet" lang={card.lang === 'de' ? 'de-CH' : 'en'}>
      <div className="card-paper">
        <div className="card-letterhead">
          <b>{card.labels.brand}</b>
          <span>Microsoft 365 · {side === 'front' ? '1/2' : '2/2'}</span>
        </div>
        {card.company && <div className="card-company">{card.company}</div>}
        <h4>{face.title}</h4>
        <ol>
          {face.steps.map(step => <li key={step}>{step}</li>)}
        </ol>
        {side === 'back' && (
          <div className="card-foot">
            <a className="card-qr" href={card.guideUrl}>
              <img src={card.qr} alt="" />
              <span><b>{card.labels.guide}</b><small>{card.guideUrl.replace(/^https?:\/\//, '')}</small></span>
            </a>
            {card.contact && <div className="card-support"><b>{card.labels.support}</b> {card.contact}</div>}
          </div>
        )}
      </div>
    </div>
  )
}

export function CustomCardBuilder({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const [language, setLanguage] = useState(lang)
  const [method, setMethod] = useState<CardMethod>('key')
  const [company, setCompany] = useState('')
  const [contact, setContact] = useState('')
  const [side, setSide] = useState<Side>('front')
  const [template, setTemplate] = useState<CardModel | null>(null)
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)
  const [busy, setBusy] = useState(false)
  const printArea = useRef<HTMLDivElement>(null)
  const card = template?.lang === language && template.method === method
    ? { ...template, company: company.trim(), contact: contact.trim() }
    : null

  useEffect(() => {
    let current = true
    import('../lib/customCard').then(({ buildCard }) => buildCard(language, method, '', ''))
      .then(result => { if (current) { setTemplate(result); setError(false) } })
      .catch(() => { if (current) setError(true) })
    return () => { current = false }
  }, [language, method, retry])

  useEffect(() => {
    const endPrint = () => { delete document.body.dataset.printCustomCard }
    window.addEventListener('afterprint', endPrint)
    return () => { window.removeEventListener('afterprint', endPrint); endPrint() }
  }, [])

  async function exportCard(print: boolean) {
    if (!card || busy) return
    setBusy(true)
    setError(false)
    try {
      if (print) {
        await document.fonts.ready
        await printArea.current?.querySelector('img')?.decode()
        document.body.dataset.printCustomCard = ''
        window.print()
      } else {
        const { downloadCardPdf } = await import('../lib/customCardPdf')
        await downloadCardPdf(card)
      }
    } catch {
      delete document.body.dataset.printCustomCard
      setError(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section id="m365-card-builder" className="custom-builder" aria-labelledby="card-builder-title">
      <header>
        <h3 id="card-builder-title">{t.title}</h3>
        <p>{t.intro}</p>
      </header>
      <div className="custom-card-workspace">
        <div className="custom-card-settings">
          <div>
            <label htmlFor="card-method">{t.method}</label>
            <select id="card-method" value={method} onChange={e => setMethod(e.target.value as CardMethod)}>
              <option value="key">{t.key}</option>
              <option value="authenticator">Microsoft Authenticator</option>
            </select>
          </div>
          <div>
            <label htmlFor="card-language">{t.language}</label>
            <select id="card-language" value={language} onChange={e => setLanguage(e.target.value as Lang)}>
              <option value="de" lang="de">Deutsch</option>
              <option value="en" lang="en">English</option>
            </select>
          </div>
          <div>
            <label htmlFor="card-company">{t.company} <small>({t.optional})</small></label>
            <input id="card-company" value={company} maxLength={48} placeholder={t.companyHint}
              onChange={e => setCompany(e.target.value)} />
          </div>
          <div>
            <label htmlFor="card-contact">{t.contact} <small>({t.optional})</small></label>
            <input id="card-contact" value={contact} maxLength={80} placeholder={t.contactHint}
              onFocus={() => setSide('back')} onChange={e => setContact(e.target.value)} />
          </div>
          <div className="custom-card-export">
            <button type="button" className="op-primary" disabled={!card || busy} onClick={() => exportCard(false)}>
              <Download size={16} aria-hidden="true" /> {busy ? t.working : t.download}
            </button>
            <button type="button" className="op-back" disabled={!card || busy} onClick={() => exportCard(true)}>
              <Printer size={16} aria-hidden="true" /> {t.print}
            </button>
          </div>
          <p className="card-format">{t.format}</p>
          {error && <p role="alert">{t.error} {!card &&
            <button type="button" onClick={() => setRetry(retry + 1)}>{t.retry}</button>}</p>}
        </div>
        <figure className="custom-card-desk">
          <figcaption>
            <span>{t.preview}</span>
            <div className="card-sides" role="group" aria-label={t.sides}>
              {(['front', 'back'] as const).map(value => (
                <button type="button" key={value} aria-pressed={side === value} onClick={() => setSide(value)}>{t[value]}</button>
              ))}
            </div>
          </figcaption>
          <div className="custom-card-preview" lang={language} aria-busy={!card}>
            {card && <CardSheet card={card} side={side} />}
          </div>
        </figure>
      </div>
      {card && createPortal(
        <div className="custom-card-print" ref={printArea}>
          <CardSheet card={card} side="front" /><CardSheet card={card} side="back" />
        </div>, document.body)}
    </section>
  )
}
