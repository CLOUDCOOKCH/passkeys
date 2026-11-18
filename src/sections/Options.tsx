import { useEffect, useRef, useState } from 'react'
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
  categoryLabels,
  githubGuide,
  providers,
  reasoning,
  type Category,
  type Language,
  type ProviderId,
} from '../content/providers'
import { recommend, type Platform } from '../lib/recommend'
import { Microsoft365 } from './Microsoft365'
import './options.css'

type Props = { lang: Language }
const categories: Category[] = ['platform', 'manager', 'hardware']
const categoryIcons = { platform: Smartphone, manager: Layers3, hardware: Usb }
const tutorials = providers.filter((p) => p.id !== 'windows')

function CredentialMark({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} fill="none">
      <circle cx="0" cy="0" r="6" fill="#f3ce68" />
      <path d="m5 4 13 10 4-5-3-2-2 2-3-3 2-2-8-6" fill="#f3ce68" />
      <circle cx="-1" cy="-1" r="1.4" fill="#254a3f" stroke="none" />
    </g>
  )
}

function ProviderScene({ kind, stage = 0 }: { kind: Category; stage?: number }) {
  return (
    <svg
      className={`op-illustration op-scene-${kind} op-stage-${stage}`}
      viewBox="0 0 240 154"
      aria-hidden="true"
      fill="none"
    >
      <g stroke="#29473f" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="120" cy="135" rx="83" ry="5" fill="#224a3b" opacity=".10" stroke="none" />
        {kind === 'platform' && (
          <>
            <g transform="matrix(1 -.095 .05 1 31 38)">
              <rect width="133" height="78" rx="7" fill="#6aa895" />
              <rect x="4" y="4" width="124" height="69" rx="4" fill="#e5f1e6" />
              <path d="M5 18h122" stroke="#91b9a7" strokeWidth="1" />
              <path d="M11 11h1m5 0h1m5 0h1" stroke="#668c7a" strokeWidth="2.8" />
              <rect x="30" y="27" width="69" height="34" rx="5" fill="#fffdf3" />
              <circle cx="44" cy="43" r="7" fill="#c0dec8" stroke="none" />
              <path d="M40 45q4-6 8 0m-4-5h0" strokeWidth="2.5" />
              <path d="M57 39h29m-29 8h19" stroke="#648b78" strokeWidth="3" />
              <path d="M0 77h133l15 14H-13Z" fill="#bfe0cf" />
              <path d="M-13 91h161v3H-13z" fill="#73a993" />
              <path d="M52 85h26" stroke="#688b79" />
            </g>
            <g transform="rotate(5 172 91)">
              <rect x="145" y="47" width="54" height="86" rx="10" fill="#8b8cab" />
              <rect x="148" y="48" width="48" height="81" rx="9" fill="#dcdaf0" />
              <path d="M165 54h14" strokeWidth="3" />
              {stage === 0 ? (
                <CredentialMark x={164} y={81} />
              ) : stage === 1 ? (
                <g className="op-mark-appear" stroke="#574d7b" fill="none">
                  <path d="M158 90v-4a14 14 0 0 1 28 0v3m-22 9q4-7 3-13a5 5 0 0 1 10-1q1 11-4 18m-13-9q3-6 2-9a10 10 0 0 1 20 0q1 8-1 13" />
                </g>
              ) : (
                <g className="op-mark-appear">
                  <circle cx="172" cy="88" r="15" fill="#bee5b9" />
                  <path d="m165 88 5 5 9-11" strokeWidth="2.8" />
                </g>
              )}
              <path d="M166 123h13" strokeWidth="2.3" />
            </g>
          </>
        )}
        {kind === 'manager' && (
          <>
            <g transform="matrix(1 -.07 .02 1 27 46)">
              <path d="M0 2 76-13l31 10-75 16Z" fill="#dbd2e8" />
              <path d="m0 2 32 13v76L0 77Z" fill="#aba0c1" />
              <path d="M32 13l75-16v78L32 91Z" fill="#e7e1ed" />
              <path d="m40 20 59-13v61L40 81Z" fill="#d4c9e0" />
              <path d="m44 29 0 12m1 21 0 10" strokeWidth="3" />
              <ellipse cx="73" cy="43" rx="16" ry="17" fill="#b2a2c9" />
              <path d="m74 30-1 8m-14 8 8-2m8 6-1 8m6-16 8-2" />
              <circle cx="74" cy="43" r="4" fill="#f1db9a" />
            </g>
            <path
              className={stage === 2 ? 'op-vault-transfer' : ''}
              d="M137 75q21-24 43-12"
              stroke="#826d93"
              strokeDasharray="3 6"
            />
            <g transform="rotate(7 188 97)">
              <rect x="168" y="68" width="39" height="63" rx="7" fill="#e6e5ed" />
              <path d="M182 74h9m-9 50h9" />
              {stage === 2 && (
                <g className="op-mark-appear">
                  <CredentialMark x={181} y={94} size={0.75} />
                </g>
              )}
            </g>
            {stage === 1 && (
              <g className="op-vault-slip">
                <rect x="77" y="31" width="36" height="24" rx="4" fill="#fff8db" />
                <CredentialMark x={90} y={40} size={0.57} />
              </g>
            )}
          </>
        )}
        {kind === 'hardware' && (
          <>
            <path d="M21 56 85 38l39 17-62 18Z" fill="#d1ddcd" />
            <path d="m21 56 41 17v37L21 92z" fill="#b0c5b9" />
            <path d="m62 73 62-18v38l-62 17Z" fill="#e4eadd" />
            <path d="m76 79 29-8v8l-29 8z" fill="#334a3e" />
            <g className="op-hardware-key">
              <path d="m99 88 29-9 19 8-27 10Z" fill="#d6ddd4" />
              <path d="m99 88 21 9v6l-21-9Z" fill="#adb4ad" />
              <path d="m110 88 5-2 4 2-5 2zm8 3 4-2 4 2-4 1z" fill="#63746c" stroke="none" />
              <path d="m122 100 28-12 44 18q13 6 9 16l-17 10q-5 2-13-1l-48-19z" fill="#497d67" />
              <path
                d="m120 97 29-12 44 18q15 7 7 14l-15 8q-6 3-14 0l-49-20q-5-3-2-8Z"
                fill="#7bb59a"
              />
              <ellipse cx="151" cy="103" rx="15" ry="8" fill="#e5c879" />
              <ellipse cx="151" cy="103" rx="10" ry="4.5" stroke="#7d713e" strokeWidth="1" />
              <ellipse cx="187" cy="113" rx="5" ry="3" fill="#e8edd9" />
            </g>
            {stage === 2 && (
              <g className="op-mark-appear">
                <circle cx="177" cy="76" r="14" fill="#dcecc2" />
                <path d="m170 76 5 5 9-10" strokeWidth="2.6" />
              </g>
            )}
          </>
        )}
      </g>
    </svg>
  )
}

function TutorialScene({ kind, step }: { kind: Category; step: number }) {
  if (step === 0 || step === 2) return <ProviderScene kind={kind} stage={step === 2 ? 1 : 0} />
  return (
    <svg className="op-illustration" viewBox="0 0 180 110" fill="none" aria-hidden="true">
      <g stroke="#29473f" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
        <g transform="rotate(-3 90 56)">
          <rect x="21" y="13" width="132" height="83" rx="7" fill="#b8d8c8" />
          <rect x="25" y="11" width="132" height="81" rx="7" fill="#f8faed" />
          <path d="M25 26h132m-123-7h1m5 0h1m5 0h1" />
          {step === 1 ? (
            <>
              <path d="M41 41h35m-35 12h57m-57 10h43" stroke="#7f9d8a" strokeWidth="3" />
              <rect x="107" y="43" width="30" height="23" rx="5" fill="#cbe3ce" />
              <path d="M122 48v12m-6-6h12" />
            </>
          ) : (
            <>
              <circle cx="59" cy="56" r="16" fill="#d1e4d5" />
              <circle cx="59" cy="52" r="4" fill="#466b55" stroke="none" />
              <path d="M51 63q7-12 16 0" fill="#466b55" stroke="none" />
              <path d="M86 49h48m-48 10h30" stroke="#7f9d8a" strokeWidth="3" />
            </>
          )}
        </g>
        {step === 3 && (
          <g className="op-mark-appear">
            <circle cx="148" cy="82" r="16" fill="#daf0ae" />
            <path d="m140 82 5 5 11-12" strokeWidth="2.8" />
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
          ? 'Ein Passkey kann auf einem Gerät, in einem Tresor oder auf einem Sicherheitsschlüssel liegen. Vergleiche, wie du ihn nutzt und bei Verlust wieder ins Konto kommst.'
          : 'A passkey can live on a device, in a vault or on a security key. Compare how you use each one and how you get back into your account if you lose access.'}
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
          <strong className="op-simulation-label">
            <span aria-hidden="true" />
            Simulation
          </strong>
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
          <div className="op-profile" key={provider.id}>
            <h3>{provider.name[lang]}</h3>
            <p>{provider.overview[lang]}</p>
            <p className="op-tradeoff">{provider.tradeoff[lang]}</p>
          </div>
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
  const questionHeading = useRef<HTMLLegendElement>(null)
  const resultHeading = useRef<HTMLHeadingElement>(null)
  const previousStep = useRef(step)
  useEffect(() => {
    if (previousStep.current !== step) {
      ;(questionHeading.current ?? resultHeading.current)?.focus({ preventScroll: true })
      previousStep.current = step
    }
  }, [step])
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
            ? 'Vier Fragen zu deinen Geräten und Vorlieben. Deine Antworten bleiben in diesem Browser.'
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
          <div className="op-result">
            <div className="op-meta">
              <Check size={17} />
              {de ? 'Deine Empfehlung' : 'Your recommendation'}
            </div>
            <h3 ref={resultHeading} tabIndex={-1}>
              {name}
            </h3>
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
                className="op-result-link"
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
            <fieldset key={step} className="op-question">
              <legend ref={questionHeading} tabIndex={-1}>
                {question[lang]}
              </legend>
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
      ? 'Melde dich mit deinem bestehenden Zugang beim gewünschten Dienst an. Öffne die Sicherheitseinstellungen und wähle die Option zum Hinzufügen eines Passkeys. Bei GitHub findest du sie in den Einstellungen für Passwort und Authentifizierung.'
      : 'Sign in to the service with your existing method. Open its security settings and start adding a passkey. On GitHub, look in password and authentication settings.',
    provider.save[lang],
    de
      ? 'Lass die aktuelle Sitzung offen. Öffne ein privates Fenster oder ein zweites Browserprofil, in dem dein Passkey verfügbar ist. Melde dich damit an und prüfe den Kontonamen. Bewahre einen zweiten Zugang auf.'
      : 'Keep your current session open. Try a private window or a second browser profile where your passkey is available. Sign in with it and check the account name. Keep a separate backup method.',
  ]
  const Graphics = [Monitor, KeyRound, HardDrive, Fingerprint]
  return (
    <section id="setup" className="op-section" aria-labelledby="op-setup-title">
      <h2 id="op-setup-title">
        {de ? 'Deinen ersten Passkey einrichten' : 'Set up your first passkey'}
      </h2>
      <p className="op-lead">
        {de
          ? 'Wähle deinen Speicherort. Folge der Anleitung auf der Website, bei der du dich anmelden möchtest. Die Anzeige kann je nach Gerät und Browser abweichen.'
          : 'Pick your storage provider. Follow the steps on the website you want to sign in to. What you see may vary by device and browser.'}
      </p>
      <div className="op-links">
        <a href="#microsoft-365">
          {de ? 'Sicherheitsschlüssel für Microsoft 365 einrichten' : 'Set up a security key for Microsoft 365'}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
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
              <span className="op-provider-name">
                {p.category === 'platform' ? (
                  <Smartphone size={18} />
                ) : p.category === 'hardware' ? (
                  <Usb size={18} />
                ) : (
                  <Layers3 size={18} />
                )}
                {p.name[lang]}
              </span>
              <ArrowRight size={17} />
            </a>
          ))}
        </nav>
        <div className="op-guide">
          <h3>{provider.name[lang]}</h3>
          <div className="op-guide-header">
            <div className="op-result">
              <span className="op-meta">
                {de ? 'Schritt' : 'Step'} {step + 1} / 4
              </span>
              <h4>{titles[step]}</h4>
            </div>
          </div>
          <div key={provider.id + step} className="op-guide-step">
            <figure aria-hidden="true">
              <TutorialScene kind={provider.category} step={step} />
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
      <Microsoft365 lang={lang} />
    </>
  )
}
