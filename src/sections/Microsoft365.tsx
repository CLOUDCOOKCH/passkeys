import { ArrowUpRight } from 'lucide-react'
import { microsoft365 as guide } from '../content/microsoft365'
import type { Lang } from '../i18n/home'

export function Microsoft365({ lang }: { lang: Lang }) {
  const de = lang === 'de'
  return (
    <section id="microsoft-365" className="op-section op-split" aria-labelledby="m365-title">
      <div>
        <h2 id="m365-title">{guide.title[lang]}</h2>
        <p className="op-lead">{guide.intro[lang]}</p>
        <p>{guide.prerequisite[lang]}</p>
      </div>
      <div className="op-guide">
        <ol className="m365-stages">
          {guide.steps.map((step, i) => (
            <li key={step.title.en}>
              <h3>{step.title[lang]}</h3>
              {step.items.map((item) => <p key={item.en}>{item[lang]}</p>)}
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
        <details className="op-help">
          <summary>{guide.helpTitle[lang]}</summary>
          <p>{guide.help[lang]}</p>
        </details>
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
  )
}
