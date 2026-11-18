import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  Fingerprint,
  HardDrive,
  KeyRound,
  Layers3,
  Monitor,
  Smartphone,
  Usb,
} from 'lucide-react'
import {
  categoryDescriptions,
  categoryLabels,
  githubGuide,
  providers,
  reasoning,
  type Category,
  type Language,
  type ProviderId,
} from '../content/providers'
import { recommend, type Platform } from '../lib/recommend'
import './options.css'

type Props = { lang: Language }
const categories: Category[] = ['platform', 'manager', 'hardware']
const categoryIcons = { platform: Smartphone, manager: Layers3, hardware: Usb }
const tutorials = providers.filter((p) => p.id !== 'windows')

function ProviderScene({ kind, stage = 0 }: { kind: Category; stage?: number }) {
  return (
    <svg className="op-illustration" viewBox="0 0 230 135" aria-hidden="true" fill="none">
      <g stroke="#253e35" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="119" cy="120" rx="79" ry="5" fill="#253e35" opacity=".1" stroke="none" />
        {kind === 'platform' ? (
          <>
            <path d="M52 29h100a5 5 0 0 1 5 5v59H47V34a5 5 0 0 1 5-5Z" fill="#749685" />
            <path d="M53 35h98v51H53z" fill="#e9f1cd" />
            <path d="M47 93h110l13 12H34z" fill="#bdd4be" />
            <path d="M34 105h136v3H34z" fill="#749685" />
            <rect x="141" y="51" width="40" height="68" rx="8" fill="#9aabc9" />
            <rect x="145" y="56" width="32" height="56" rx="5" fill="#e5e1fb" />
            <path d="M157 60h8" />
          </>
        ) : kind === 'manager' ? (
          <>
            <rect x="57" y="23" width="101" height="83" rx="9" fill="#8e82af" />
            <rect x="63" y="29" width="101" height="83" rx="9" fill="#c8bce0" />
            <rect x="69" y="36" width="101" height="83" rx="9" fill="#ebe4f4" />
            <circle cx="119" cy="77" r="21" fill="#b5a1ce" />
            <circle cx="119" cy="77" r="7" fill="#e5edb0" />
            <path d="m119 58 0 10m0 17 0 11m-18-19h10m16 0h10" />
            <path d="M76 54v13m0 24v13" />
          </>
        ) : (
          <>
            <g transform="rotate(-22 113 73)">
              <path d="M52 55h37v42H52z" fill="#cad3c9" />
              <path d="M57 62h10v8H57zm0 17h10v8H57z" fill="#566762" />
              <rect x="87" y="46" width="91" height="60" rx="22" fill="#63977e" />
              <circle cx="116" cy="76" r="16" fill="#ead883" />
              <circle cx="116" cy="76" r="10" stroke="#8e783e" />
              <circle cx="164" cy="76" r="5" fill="#e6ead6" />
            </g>
          </>
        )}
        {stage > 0 && (
          <g className="op-seal">
            <circle cx="170" cy="42" r="19" fill="#d9ee9c" />
            <path d="m162 42 5 5 11-12" />
          </g>
        )}
      </g>
    </svg>
  )
}

function Explorer({ lang }: Props) {
  const de = lang === 'de'
  const [category, setCategory] = useState<Category>('platform')
  const [activeId, setActiveId] = useState<ProviderId>('apple')
  const [sample, setSample] = useState(0)
  const provider = providers.find((p) => p.id === activeId)!
  function select(id: ProviderId, scroll = false) {
    const next = providers.find((p) => p.id === id)!
    setActiveId(id)
    setCategory(next.category)
    setSample(0)
    if (scroll)
      requestAnimationFrame(() =>
        document.getElementById('provider-' + id)?.scrollIntoView({ block: 'center' }),
      )
  }
  useEffect(() => {
    function fromHash() {
      const target = providers.find((p) => '#provider-' + p.id === location.hash)
      if (target) select(target.id, true)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])
  const sampleSteps =
    category === 'manager'
      ? de
        ? ['Passkey im Tresor speichern', 'Auf zweitem Gerät anzeigen', 'Erneut ausprobieren']
        : ['Save a passkey to the vault', 'Show on a second device', 'Try again']
      : category === 'hardware'
        ? de
          ? ['Schlüssel verbinden', 'Berührung bestätigen', 'Erneut ausprobieren']
          : ['Connect key', 'Confirm touch', 'Try again']
        : de
          ? ['Gerätesperre anzeigen', 'Lokal bestätigen', 'Erneut ausprobieren']
          : ['Show device lock', 'Confirm locally', 'Try again']
  const sampleMessages =
    category === 'manager'
      ? de
        ? [
            'Tresor bereit.',
            'Im Beispiel-Tresor gespeichert.',
            'Auf einem unterstützten Gerät im selben Tresor verfügbar.',
          ]
        : [
            'Vault ready.',
            'Saved in the example vault.',
            'Available on a supported device using the same vault.',
          ]
      : category === 'hardware'
        ? de
          ? [
              'Schlüssel bereit.',
              'Der Schlüssel ist verbunden.',
              'Berührung bestätigt. Der Passkey bleibt auf dem Schlüssel.',
            ]
          : [
              'Key ready.',
              'The key is connected.',
              'Touch confirmed. The passkey stays on the key.',
            ]
        : de
          ? [
              'Gerät bereit.',
              'Das Gerät bittet um lokale Bestätigung.',
              'Bestätigt. Biometrische Daten bleiben auf dem Gerät.',
            ]
          : [
              'Device ready.',
              'The device asks for local verification.',
              'Confirmed. Biometric data stays on the device.',
            ]
  return (
    <section id="options" className="op-section" aria-labelledby="op-options-title">
      <h2 id="op-options-title">
        {de ? 'Wo wohnt dein Passkey?' : 'Where does your passkey live?'}
      </h2>
      <p className="op-lead">
        {de
          ? 'Der Speicherort entscheidet, auf welchen Geräten dein Passkey bereitsteht und was bei einem Verlust passiert.'
          : 'Where you save a passkey determines which devices can use it and how you get back in if one goes missing.'}
      </p>
      <div className="op-tabs" aria-label={de ? 'Speicherorte' : 'Storage categories'} role="group">
        {categories.map((c) => {
          const Icon = categoryIcons[c]
          return (
            <button
              type="button"
              key={c}
              aria-pressed={c === category}
              onClick={() => {
                const id = providers.find((p) => p.category === c)!.id
                select(id)
                history.replaceState(null, '', '#provider-' + id)
              }}
            >
              <Icon size={18} />
              {categoryLabels[c][lang]}
            </button>
          )
        })}
      </div>
      <div className={'op-explorer op-' + category}>
        <div className="op-sample">
          <ProviderScene kind={category} stage={sample} />
          <strong>Simulation</strong>
          <p aria-live="polite">{sampleMessages[sample]}</p>
          <button
            type="button"
            className="op-light-button"
            onClick={() => setSample((sample + 1) % 3)}
          >
            {sampleSteps[sample]}
            <ArrowRight size={15} />
          </button>
        </div>
        <div className="op-provider-copy">
          <h3>{categoryLabels[category][lang]}</h3>
          <p>{categoryDescriptions[category][lang]}</p>
          <div className="op-choices" role="group" aria-label={de ? 'Anbieter' : 'Providers'}>
            {providers
              .filter((p) => p.category === category)
              .map((p) => (
                <button
                  id={'provider-' + p.id}
                  type="button"
                  key={p.id}
                  aria-pressed={p.id === activeId}
                  onClick={() => {
                    select(p.id)
                    history.replaceState(null, '', '#provider-' + p.id)
                  }}
                >
                  {p.name[lang]}
                </button>
              ))}
          </div>
          <p>{provider.overview[lang]}</p>
          <p>{provider.tradeoff[lang]}</p>
          <div className="op-links">
            <a href={provider.url}>
              {de ? 'Herstellerdokumentation' : 'Provider documentation'}
              <ArrowUpRight size={15} />
            </a>
            <a href={provider.id === 'windows' ? '#playground' : '#setup-' + provider.id}>
              {provider.id === 'windows'
                ? de
                  ? 'Im Playground üben'
                  : 'Practise in the playground'
                : de
                  ? 'Zur Anleitung'
                  : 'Open walkthrough'}
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

const questions = [
  {
    de: 'Welche Geräte verwendest du hauptsächlich?',
    en: 'Which devices do you mainly use?',
    values: ['apple', 'google', 'windows', 'mixed'],
    labels: {
      de: ['iPhone, iPad oder Mac', 'Android', 'Windows-PC', 'Mehrere Plattformen'],
      en: ['iPhone, iPad or Mac', 'Android', 'Windows PC', 'A mix of platforms'],
    },
  },
  {
    de: 'Nutzt du bereits einen Passwortmanager?',
    en: 'Do you already use a password manager?',
    values: ['yes', 'no'],
    labels: {
      de: ['Ja, einen separaten Tresor', 'Nein, bisher nicht'],
      en: ['Yes, a separate vault', 'No, not yet'],
    },
  },
  {
    de: 'Was ist dir wichtiger?',
    en: 'What matters most to you?',
    values: ['convenience', 'hardware'],
    labels: {
      de: [
        'Mit meinen vorhandenen Geräten anmelden',
        'Einen separaten physischen Schlüssel verwenden',
      ],
      en: ['Signing in with devices I already use', 'Using a dedicated physical key'],
    },
  },
  {
    de: 'Für wen richtest du Passkeys ein?',
    en: 'Who are you setting up passkeys for?',
    values: ['self', 'org'],
    labels: { de: ['Für mich', 'Für eine Organisation'], en: ['Myself', 'An organisation'] },
  },
]

function Wizard({ lang }: Props) {
  const de = lang === 'de'
  const [answers, setAnswers] = useState<string[]>([])
  const [step, setStep] = useState(0)
  const question = questions[step]
  const result =
    step === questions.length
      ? recommend({
          platform: answers[0] as Platform,
          usesManager: answers[1] === 'yes',
          prefersHardware: answers[2] === 'hardware',
        })
      : null
  const name =
    result === 'manager'
      ? categoryLabels.manager[lang]
      : providers.find((p) => p.id === result)?.name[lang]
  return (
    <section id="wizard" className="op-section op-split" aria-labelledby="op-wizard-title">
      <div>
        <h2 id="op-wizard-title">
          {de ? 'Welcher Passkey passt zu dir?' : 'Which passkey fits your life?'}
        </h2>
        <p className="op-lead">
          {de
            ? 'Vier Fragen zu deinen Geräten und Vorlieben. Deine Antworten bleiben hier im Browser.'
            : 'Four questions about your devices and preferences. Your answers stay in this browser.'}
        </p>
        <div className="op-progress" aria-hidden="true">
          {questions.map((q, i) => (
            <span key={q.en} className={i <= step ? 'op-filled' : ''} />
          ))}
        </div>
      </div>
      <div className="op-wizard-panel">
        {result ? (
          <div aria-live="polite">
            <div className="op-meta">
              <Check size={17} />
              {de ? 'Deine Empfehlung' : 'Your recommendation'}
            </div>
            <h3>{name}</h3>
            <p>{reasoning[result][lang]}</p>
            {answers[3] === 'org' && (
              <p>
                {de
                  ? 'Für deine Organisation: Kläre erlaubte Anbieter und Wiederherstellung mit der IT. Für privilegierte Konten können genehmigte, gerätegebundene Schlüssel vorgeschrieben sein.'
                  : 'For your organisation, check permitted providers and recovery procedures with IT. Privileged accounts may require approved, device-bound keys.'}
              </p>
            )}
            <div className="op-links">
              <a
                href={
                  result === 'manager'
                    ? '#provider-proton'
                    : result === 'windows'
                      ? '#provider-windows'
                      : '#setup-' + result
                }
              >
                {result === 'manager'
                  ? de
                    ? 'Manager vergleichen'
                    : 'Compare managers'
                  : de
                    ? 'Details ansehen'
                    : 'Explore this option'}
                <ArrowRight size={15} />
              </a>
              <button
                type="button"
                onClick={() => {
                  setStep(0)
                  setAnswers([])
                }}
              >
                {de ? 'Neu starten' : 'Start again'}
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (answers[step]) setStep(step + 1)
            }}
          >
            <p className="op-meta">
              {de ? 'Frage' : 'Question'} {step + 1} / {questions.length}
            </p>
            <fieldset>
              <legend>{question[lang]}</legend>
              {question.values.map((value, i) => (
                <label key={value}>
                  <input
                    type="radio"
                    name={'op-question-' + step}
                    value={value}
                    checked={answers[step] === value}
                    onChange={() => {
                      const next = [...answers]
                      next[step] = value
                      setAnswers(next)
                    }}
                  />
                  {question.labels[lang][i]}
                </label>
              ))}
            </fieldset>
            <div className="op-actions">
              {step > 0 && (
                <button type="button" className="op-back" onClick={() => setStep(step - 1)}>
                  <ChevronLeft size={16} />
                  {de ? 'Zurück' : 'Back'}
                </button>
              )}
              <button className="op-primary" disabled={!answers[step]}>
                {step === 3
                  ? de
                    ? 'Empfehlung zeigen'
                    : 'Show recommendation'
                  : de
                    ? 'Weiter'
                    : 'Continue'}
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

const checklist = {
  de: [
    'Passkey im richtigen Konto gespeichert',
    'Neue Anmeldung erfolgreich getestet',
    'Unabhängigen Ersatzweg geprüft',
  ],
  en: [
    'Saved the passkey to the right account',
    'Tested a fresh sign-in successfully',
    'Checked an independent backup method',
  ],
}
function Tutorial({ lang }: Props) {
  const de = lang === 'de'
  const [selection, setSelection] = useState({ id: 'apple', step: 0 })
  const [checks, setChecks] = useState<string[]>([])
  const provider = tutorials.find((p) => p.id === selection.id)!
  const step = selection.step
  useEffect(() => {
    function fromHash() {
      const selected = tutorials.find((p) => '#setup-' + p.id === location.hash)
      if (selected)
        setSelection((prev) => (selected.id === prev.id ? prev : { id: selected.id, step: 0 }))
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])
  const titles = de
    ? ['Vorbereiten', 'Bei der Website beginnen', 'Speicherort bestätigen', 'Anmeldung testen']
    : ['Get ready', 'Start on the website', 'Confirm where to save', 'Test your sign-in']
  const descriptions = [
    provider.prepare[lang],
    de
      ? 'Melde dich mit deinem bestehenden Zugang beim gewünschten Dienst an. Öffne seine Sicherheitseinstellungen und starte das Hinzufügen eines Passkeys. Bei GitHub findest du diese Option in den Einstellungen für Passwort und Authentifizierung.'
      : 'Sign in to the service with your existing method. Open its security settings and start adding a passkey. On GitHub, look in password and authentication settings.',
    provider.save[lang],
    de
      ? 'Lass deine bestehende Sitzung offen. Öffne ein privates Fenster oder ein zweites unterstütztes Profil mit Zugang zum Anbieter. Wähle die Passkey-Anmeldung und prüfe, ob das richtige Konto geöffnet wird. Behalte einen unabhängigen Ersatzweg.'
      : 'Keep your existing session open. Open a private window or second supported profile with access to your provider. Choose passkey sign-in and check that the correct account opens. Keep an independent backup method.',
  ]
  const Graphics = [Monitor, KeyRound, HardDrive, Fingerprint]
  const Icon = Graphics[step]
  return (
    <section id="setup" className="op-section" aria-labelledby="op-setup-title">
      <h2 id="op-setup-title">
        {de ? 'Deinen ersten Passkey einrichten' : 'Set up your first passkey'}
      </h2>
      <p className="op-lead">
        {de
          ? 'Wähle deinen Speicherort. Gehe die Schritte hier durch und führe sie beim gewünschten Dienst aus. Die Anzeige hängt von System und Browser ab.'
          : 'Pick your storage provider. Follow the steps here and carry them out on your chosen service. Prompts vary by system and browser.'}
      </p>
      <div className="op-tutorial-grid">
        <nav className="op-tutorial-index" aria-label={de ? 'Anleitungen' : 'Walkthroughs'}>
          {tutorials.map((p) => (
            <a
              key={p.id}
              id={'setup-' + p.id}
              href={'#setup-' + p.id}
              aria-current={p.id === selection.id ? 'true' : undefined}
              onClick={() => {
                if (p.id !== selection.id) setSelection({ id: p.id, step: 0 })
              }}
            >
              {p.name[lang]}
              <ArrowRight size={17} />
            </a>
          ))}
        </nav>
        <div className="op-guide">
          <h3>{provider.name[lang]}</h3>
          <div className="op-guide-header">
            <div aria-live="polite">
              <span className="op-meta">
                {de ? 'Schritt' : 'Step'} {step + 1} / 4
              </span>
              <h4>{titles[step]}</h4>
            </div>
            <span className="op-step-icon" aria-hidden="true">
              <Icon size={29} />
            </span>
          </div>
          <div className="op-guide-step">
            <figure aria-hidden="true">
              <ProviderScene kind={provider.category} stage={step === 3 ? 1 : 0} />
              <div className="op-guide-steps">
                {Graphics.map((Symbol, index) => (
                  <span key={index} className={index === step ? 'op-active-step' : ''}>
                    <Symbol size={14} />
                  </span>
                ))}
              </div>
            </figure>
            <p>{descriptions[step]}</p>
          </div>
          <div className="op-actions">
            <button
              type="button"
              className="op-back"
              disabled={step === 0}
              onClick={() => setSelection({ ...selection, step: step - 1 })}
            >
              <ChevronLeft size={16} />
              {de ? 'Zurück' : 'Back'}
            </button>
            <button
              type="button"
              className="op-primary"
              onClick={() => setSelection({ ...selection, step: (step + 1) % 4 })}
            >
              {step === 3
                ? de
                  ? 'Neu starten'
                  : 'Start again'
                : de
                  ? 'Nächster Schritt'
                  : 'Next step'}
              <ArrowRight size={15} />
            </button>
          </div>
          <details className="op-help" key={provider.id}>
            <summary>{de ? 'Es klappt nicht?' : 'Something not working?'}</summary>
            <p>{provider.troubleshoot[lang]}</p>
          </details>
          <div className="op-links">
            <a href={provider.url}>
              {de ? 'Hilfe des Anbieters' : 'Provider help'}
              <ArrowUpRight size={15} />
            </a>
            <a href={githubGuide}>
              {de ? 'GitHub-Anleitung' : 'GitHub guide'}
              <ArrowUpRight size={15} />
            </a>
          </div>
          <small>
            {de ? 'Anleitung redaktionell geprüft am ' : 'Guide reviewed on '}
            <time dateTime={provider.lastReviewed}>
              {new Intl.DateTimeFormat(de ? 'de-CH' : 'en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC',
              }).format(new Date(provider.lastReviewed))}
            </time>
          </small>
        </div>
      </div>
      <details className="op-checklist">
        <summary>{de ? 'Meine Einrichtungs-Checkliste' : 'My setup checklist'}</summary>
        {checklist[lang].map((item, i) => {
          const id = provider.id + '-' + i
          return (
            <label key={id}>
              <input
                type="checkbox"
                checked={checks.includes(id)}
                onChange={(e) =>
                  setChecks(e.target.checked ? [...checks, id] : checks.filter((c) => c !== id))
                }
              />
              {item}
            </label>
          )
        })}
      </details>
    </section>
  )
}

export function Options({ lang }: Props) {
  return (
    <>
      <Explorer lang={lang} />
      <Wizard lang={lang} />
      <Tutorial lang={lang} />
    </>
  )
}
