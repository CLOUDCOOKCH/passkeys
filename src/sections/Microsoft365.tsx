import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react'
import { FirstDayCard } from '../components/FirstDayCard'
import { microsoft365 as guide } from '../content/microsoft365'
import type { Lang } from '../i18n/home'
import { M365Practice } from './M365Practice'
import { M365Authenticator } from './M365Authenticator'

const sections = [
  { id: 'm365-key', de: 'Sicherheitsschlüssel einrichten', en: 'Set up a security key' },
  { id: 'm365-practice', de: 'Die erste Anmeldung üben', en: 'Practise your first sign-in' },
  { id: 'm365-authenticator', de: 'Microsoft Authenticator einrichten', en: 'Set up Microsoft Authenticator' },
  { id: 'm365-help', de: 'Ein Problem bei der Einrichtung lösen', en: 'Solve a setup problem' },
] as const

export function Microsoft365({ lang }: { lang: Lang }) {
  const de = lang === 'de'
  return (
    <section id="microsoft-365" className="op-section m365-hub" aria-labelledby="m365-title">
      <header className="op-split m365-intro">
        <div>
          <h2 id="m365-title">{de ? 'Passkeys für Microsoft 365' : 'Passkeys for Microsoft 365'}</h2>
          <p className="op-lead">{de
            ? 'Von der IT einen Schlüssel erhalten? Oder nutzt dein Team Microsoft Authenticator auf dem Handy? Wähle die Anleitung für dein Geschäftskonto.'
            : 'Got a security key from IT, or does your team use Microsoft Authenticator on a phone? Choose the guide for your work account.'}</p>
        </div>
        <nav className="m365-index" aria-labelledby="m365-title">
          {sections.map(section => (
            <a key={section.id} href={'#' + section.id}>
              {section[lang]} <ArrowRight size={16} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </header>

      <section id="m365-key" className="op-split" aria-labelledby="m365-key-title">
        <div>
          <h3 id="m365-key-title">{guide.title[lang]}</h3>
          <p className="op-lead">{guide.intro[lang]}</p>
          <p>{guide.prerequisite[lang]}</p>
          <FirstDayCard lang={lang} />
        </div>
        <div className="op-guide">
          <ol className="m365-stages">
            {guide.steps.map((step, i) => (
              <li key={step.title.en}>
                <h4>{step.title[lang]}</h4>
                {step.items.map(item => <p key={item.en}>{item[lang]}</p>)}
                {i === 1 && (
                  <div className="op-links">
                    <a href="https://mysignins.microsoft.com/security-info" target="_blank" rel="noopener">
                      {guide.portal[lang]} <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ol>
          <div className="op-links">
            <a href={`https://learn.microsoft.com/${de ? 'de-de' : 'en-us'}/entra/identity/authentication/how-to-register-passkey-with-security-key`}>
              {guide.source[lang]} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <small>
            {de ? 'Geprüft am ' : 'Reviewed on '}
            <time dateTime={guide.lastReviewed}>
              {new Intl.DateTimeFormat(de ? 'de-CH' : 'en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(guide.lastReviewed))}
            </time>
          </small>
        </div>
      </section>

      <M365Practice lang={lang} />
      <M365Authenticator lang={lang} />

      <section id="m365-help" className="op-split" aria-labelledby="m365-help-title">
        <div>
          <h3 id="m365-help-title">{de ? 'Wo kommst du nicht weiter?' : 'Where are you getting stuck?'}</h3>
          <p>{de
            ? 'Wähle, was bei der Einrichtung oder Anmeldung mit deinem Schlüssel passiert.'
            : 'Choose what you see while setting up or signing in with your key.'}</p>
        </div>
        <div className="m365-symptoms">
          {guide.symptoms.map(symptom => (
            <details key={symptom.id} id={'m365-' + symptom.id}>
              <summary>{symptom.title[lang]} <ChevronDown size={17} aria-hidden="true" /></summary>
              <p>{symptom.action[lang]}</p>
              <p>{symptom.escalation[lang]}</p>
            </details>
          ))}
        </div>
      </section>
    </section>
  )
}
