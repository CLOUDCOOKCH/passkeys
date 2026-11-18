import { useState } from 'react'
import { ArrowUpRight, Fingerprint, Laptop, Smartphone } from 'lucide-react'
import { authenticatorGuide as guide } from '../content/m365Authenticator'
import type { Lang } from '../i18n/home'
import './m365-authenticator.css'

export function M365Authenticator({ lang }: { lang: Lang }) {
  const [os, setOs] = useState<'ios' | 'android'>('ios')
  const [target, setTarget] = useState<'phone' | 'other'>('phone')
  const de = lang === 'de'
  const phone = guide.phones[os]
  const onComputer = target === 'other'
  const deviceLabel = os === 'ios' ? 'iPhone' : 'Android'
  const steps = [
    (onComputer ? guide.otherStart : guide.sameStart)[lang],
    guide.select[lang],
    ...(onComputer ? [guide.choosePhone[lang], phone.qr[lang]] : []),
    phone.unlock[lang],
  ]
  return (
    <section id="m365-authenticator" className="m365-auth" aria-labelledby="m365-auth-title">
      <header className="m365-auth-head">
        <span className="m365-auth-symbol" aria-hidden="true">
          <Fingerprint size={36} />
        </span>
        <div>
          <h3 id="m365-auth-title">{guide.title[lang]}</h3>
          <p>{guide.intro[lang]}</p>
        </div>
      </header>
      <div className="m365-auth-phone">
        <p id="m365-phone-question">{guide.phoneTitle[lang]}</p>
        <div className="m365-auth-switch" role="group" aria-labelledby="m365-phone-question">
          {(['ios', 'android'] as const).map((id) => (
            <button key={id} type="button" aria-pressed={id === os} onClick={() => setOs(id)}>
              {id === 'ios' ? 'iPhone' : 'Android'}
            </button>
          ))}
        </div>
      </div>
      <div className="m365-auth-columns">
        <div className="m365-auth-register">
          <h4>{guide.registerTitle[lang]}</h4>
          <p>
            <strong>{phone.minimum[lang]}</strong>
          </p>
          <p>{guide.prepare[lang]}</p>
          <ol>
            {[guide.account, phone.provider, guide.finish].map((item) => (
              <li key={item.en}>{item[lang]}</li>
            ))}
          </ol>
          <div className="op-links">
            <a href="https://mysignins.microsoft.com/security-info" target="_blank" rel="noopener">
              {guide.portal[lang]}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="m365-auth-test">
          <h4>{guide.testTitle[lang]}</h4>
          <p id="m365-auth-target">{guide.targetTitle[lang]}</p>
          <div className="m365-auth-switch" role="group" aria-labelledby="m365-auth-target">
            {(['phone', 'other'] as const).map((id) => {
              const Icon = id === 'phone' ? Smartphone : Laptop
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={id === target}
                  onClick={() => setTarget(id)}
                >
                  <Icon size={16} aria-hidden="true" />
                  {guide.target[id][lang]}
                </button>
              )
            })}
          </div>
          <ol aria-label={deviceLabel + ' · ' + guide.target[target][lang]}>
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p>{guide.checkResult[lang]}</p>
        </div>
      </div>
      <details className="op-help">
        <summary>{guide.pushTitle[lang]}</summary>
        <p>{guide.push[lang]}</p>
      </details>
      <footer className="m365-auth-sources">
        <span>Microsoft Learn</span>
        {guide.sources.map(({ path, label }) => (
          <a
            key={path}
            href={`https://learn.microsoft.com/${de ? 'de-de' : 'en-us'}/entra/identity/authentication/${path}`}
          >
            {label[lang]}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ))}
        <small>
          {de ? 'Geprüft am ' : 'Reviewed on '}
          <time dateTime={guide.reviewed}>
            {new Intl.DateTimeFormat(de ? 'de-CH' : 'en-GB', {
              dateStyle: 'long',
              timeZone: 'UTC',
            }).format(new Date(guide.reviewed))}
          </time>
        </small>
      </footer>
    </section>
  )
}
