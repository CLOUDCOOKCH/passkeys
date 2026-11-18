import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleCheck,
  Fingerprint,
  KeyRound,
  Lightbulb,
  X,
  Printer,
  RotateCcw,
  Search,
} from 'lucide-react'
import {
  faq,
  glossary,
  recovery,
  references,
  roadmap,
  words,
  type Lang,
} from '../content/resources'
import { questions } from '../content/resourcesQuiz'
import { emptyQuiz, quizScore, readQuiz } from '../lib/quiz'
import './resources.css'

type Props = { lang: Lang }
const quizKey = 'passkeys.quiz.v1'

function RecoveryMap({ lang }: Props) {
  return (
    <figure className="rs-map">
      <svg viewBox="0 0 320 144" fill="none" aria-hidden="true">
        <g stroke="#225942" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M63 36h67q16 0 22 14l9 17q5 9 16 9h46M66 106h64q16 0 22-12l9-14" strokeDasharray="3 6" />
          <rect x="25" y="10" width="37" height="52" rx="8" fill="#fff3c5" />
          <path d="M38 16h11m-9 39h7" />
          <g transform="rotate(-28 46 105)">
            <rect x="27" y="95" width="37" height="20" rx="9" fill="#cfbce4" />
            <circle cx="38" cy="105" r="3" /><path d="M63 99h14v12H63z" fill="#fffcf3" />
          </g>
          <rect x="217" y="37" width="79" height="68" rx="8" fill="#fcfff8" />
          <path d="M218 52h77" /><circle cx="227" cy="45" r="1" /><circle cx="234" cy="45" r="1" />
          <circle cx="257" cy="77" r="15" fill="#b9dfbe" /><path d="m250 77 5 5 9-11" />
        </g>
      </svg>
      <figcaption>
        {words(
          'Ein Konto, zwei Anmeldewege: Registriere einen Ersatzschlüssel, solange dein Handy noch zur Hand ist.',
          'One account, two ways in. Register a spare key while you still have your phone.',
        )[lang]}
      </figcaption>
    </figure>
  )
}

function useOpenAnchor() {
  useEffect(() => {
    const open = () => {
      const item = document.getElementById(window.location.hash.slice(1))
      if (item instanceof HTMLDetailsElement) item.open = true
    }
    open()
    window.addEventListener('hashchange', open)
    return () => window.removeEventListener('hashchange', open)
  }, [])
}

export function Recovery({ lang }: Props) {
  useOpenAnchor()
  return (
    <section id="recovery" aria-labelledby="recovery-title" className="rs-section rs-columns">
      <div>
        <h2 id="recovery-title">{words('Was passiert, wenn …?', 'What happens if…?')[lang]}</h2>
        <p className="rs-lead">
          {
            words(
              'Handy verloren oder Laptop gewechselt? Hier findest du den nächsten Schritt für deine Situation.',
              'Lost a phone or switched laptops? Find your situation and see how to get back into your account.',
            )[lang]
          }
        </p>
        <RecoveryMap lang={lang} />
      </div>
      <div className="rs-rows">
        {recovery.map((item) => (
          <details id={'recovery-' + item.id} key={item.id} className="rs-detail">
            <summary>
              {item.title[lang]}
              <ChevronDown size={19} aria-hidden="true" />
            </summary>
            <p>{item.body[lang]}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

const businessCopy = {
  title: words('Passkeys im Unternehmen', 'Passkeys at work'),
  intro: words(
    'Wähle für den ersten Test einen Dienst, den dein Team täglich nutzt. Prüfe zwei Dinge: Wie leicht fällt die Anmeldung? Und wie kommt jemand nach einem Geräteverlust wieder ins Konto?',
    'Pick a service your team uses every day. Test two things: how easily people can sign in, and how they get back into their accounts if they lose a device.',
  ),
  value: words('Was sich für dein Team ändert', 'What changes for your team'),
  benefit: words(
    'Mitarbeitende geben die Anmeldung mit ihrer gewohnten Gerätesperre frei. Der Passkey gilt nur für den zugehörigen Dienst. Wer eine täuschend echte Kopie der Anmeldeseite öffnet, kann dort den Passkey des Dienstes nicht verwenden.',
    'Employees approve sign-in the same way they unlock a device. Each passkey belongs to its service. Even if someone opens a convincing copy of the sign-in page, the browser will not offer that service’s passkey there.',
  ),
  controls: words('Geräte und Verantwortung', 'Devices and ownership'),
  policy: words(
    'Lege fest, wo Mitarbeitende geschäftliche Passkeys speichern dürfen. Für Admin-Konten kann die Organisation eigene FIDO2-Schlüssel ausgeben. Kläre, wer Ersatz ausgibt und wer beim Austritt Schlüssel zurücknimmt und Zugriffe sperrt.',
    'Decide where people may store work passkeys. For admin accounts, the organisation may issue FIDO2 keys that keep each passkey on the hardware. Assign responsibility for replacing lost keys and revoking access when someone leaves.',
  ),
  roadmap: words('Einführung in fünf Schritten', 'A five-step rollout'),
  print: words('Kurzfassung drucken', 'Print summary'),
}

export function Business({ lang }: Props) {
  const b = businessCopy
  return (
    <section id="business" aria-labelledby="business-title" className="rs-section rs-business">
      <div className="rs-business-head">
        <div>
          <h2 id="business-title">{b.title[lang]}</h2>
          <p className="rs-lead">{b.intro[lang]}</p>
        </div>
        <button className="rs-button" onClick={() => window.print()}>
          <Printer size={17} />
          {b.print[lang]}
        </button>
      </div>
      <div className="rs-business-notes">
        <div>
          <h3>{b.value[lang]}</h3>
          <p>{b.benefit[lang]}</p>
        </div>
        <div>
          <h3>{b.controls[lang]}</h3>
          <p>{b.policy[lang]}</p>
          <a className="rs-link" href="#microsoft-365">
            {words('Passkeys für Microsoft 365 einrichten', 'Set up passkeys for Microsoft 365')[lang]}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="rs-rollout">
      <h3 className="rs-roadmap-title">{b.roadmap[lang]}</h3>
      <ol className="rs-roadmap">
        {roadmap.map(([title, body], i) => (
          <li key={title.en}>
            <span aria-hidden="true">{i + 1}</span>
            <h4>{title[lang]}</h4>
            <p>{body[lang]}</p>
          </li>
        ))}
      </ol>
      </div>
      <details className="rs-detail rs-entra" id="business-entra">
        <summary>
          Microsoft Entra ID
          <ChevronDown size={19} aria-hidden="true" />
        </summary>
        <p>
          {
            words(
              'Für den Pilotversuch kannst du die Authentifizierungsmethode «Passkey (FIDO2)» auf eine Testgruppe begrenzen. Passkey-Profile steuern unter anderem zulässige Typen und Attestierung. Prüfe vorab, welche Geräte, Browser und Richtlinien im Mandanten unterstützt werden.',
              'For a pilot, scope the Passkey (FIDO2) authentication method to a test group. Passkey profiles control options including allowed passkey types and attestation. Check supported devices, browsers, and policies in your tenant first.',
            )[lang]
          }
        </p>
        <p>
          {
            words(
              'Ein registrierter Passkey macht die Anmeldung per Passkey noch nicht zur Pflicht. Wähle dazu in Conditional Access die passende Authentifizierungsstärke. Teste Notfallzugang und Wiederherstellung, bevor du weitere Gruppen aufnimmst.',
              'Registering a passkey does not make it mandatory. To require it, select the appropriate authentication strength in Conditional Access. Test emergency access and recovery before extending the policy to more groups.',
            )[lang]
          }
        </p>
        <a className="rs-link" href={references[6][1]}>
          {
            words('Microsofts Leitfaden für Administratoren', 'Microsoft’s administrator guide')[
              lang
            ]
          }
          <ArrowUpRight size={16} />
        </a>
      </details>
      {createPortal(
        <article className="rs-print" lang={lang === 'de' ? 'de-CH' : 'en'}>
          <div className="rs-print-brand">
            <KeyRound size={21} /> Passkeys.
          </div>
          <h1>{b.title[lang]}</h1>
          <p>{b.intro[lang]}</p>
          <h2>{b.value[lang]}</h2>
          <p>{b.benefit[lang]}</p>
          <h2>{b.controls[lang]}</h2>
          <p>{b.policy[lang]}</p>
          <h2>{b.roadmap[lang]}</h2>
          <ol>
            {roadmap.map(([title, body]) => (
              <li key={title.en}>
                <strong>{title[lang]}</strong>
                <br />
                {body[lang]}
              </li>
            ))}
          </ol>
          <p className="rs-print-source">
            <a href={references[6][1]}>
              Microsoft Learn ·{' '}
              {
                words(
                  'Passkeys (FIDO2) in Microsoft Entra ID',
                  'Passkeys (FIDO2) in Microsoft Entra ID',
                )[lang]
              }
            </a>
          </p>
        </article>,
        document.body,
      )}
    </section>
  )
}

function initialQuiz() {
  try {
    return readQuiz(sessionStorage.getItem(quizKey))
  } catch {
    return emptyQuiz()
  }
}

export function Quiz({ lang }: Props) {
  const [state, setState] = useState(initialQuiz)
  const heading = useRef<HTMLHeadingElement>(null)
  const focusOnChange = useRef(false)
  useEffect(() => {
    try {
      sessionStorage.setItem(quizKey, JSON.stringify(state))
    } catch {
      /* Progress remains available in memory. */
    }
  }, [state])
  useEffect(() => {
    if (focusOnChange.current) {
      heading.current?.focus()
      focusOnChange.current = false
    }
  }, [state.page])
  const current = questions[state.page]
  const picked = state.answers[state.page]
  const score = quizScore(state.answers)
  function advance() {
    focusOnChange.current = true
    setState({ ...state, page: state.page + 1 })
  }
  return (
    <section id="quiz" aria-labelledby="quiz-title" className="rs-section rs-columns rs-quiz">
      <div>
        <h2 id="quiz-title">
          {words('Wie gut kennst du Passkeys?', 'How well do you know passkeys?')[lang]}
        </h2>
        <p className="rs-lead">
          {
            words(
              'Was sieht die Website beim Anmelden? Was hilft, wenn ein Schlüssel verloren geht? Wähle bei jeder der sechs Fragen eine Antwort und entdecke die Erklärung.',
              'What does a website see when you sign in? What helps if a key goes missing? Choose one answer for each of the six questions to find out.',
            )[lang]
          }
        </p>
      </div>
      <div className="rs-quiz-board">
        {current ? (
          <>
            <p id="quiz-count" className="rs-question-count">
              {words('Frage', 'Question')[lang]} {state.page + 1} / {questions.length}
            </p>
            <div className="rs-quiz-meter" aria-hidden="true">
              {questions.map((q, i) => (
                <span key={q.prompt.en} className={i < state.answers.length ? 'filled' : i === state.page ? 'current' : ''} />
              ))}
            </div>
            <h3 ref={heading} aria-describedby="quiz-count" tabIndex={-1}>
              {current.prompt[lang]}
            </h3>
            <div className="rs-answers">
              {current.choices.map((answer, i) => (
                <button
                  key={answer.en}
                  aria-pressed={picked === i}
                  aria-disabled={picked !== undefined}
                  className={
                    picked !== undefined && current.answer === i
                      ? 'right'
                      : picked === i
                        ? 'wrong'
                        : ''
                  }
                  onClick={() => {
                    if (picked === undefined)
                      setState((previous) =>
                        previous.answers.length === previous.page
                          ? { ...previous, answers: [...previous.answers, i] }
                          : previous,
                      )
                  }}
                >
                  <span className="rs-answer-mark" aria-hidden="true">
                    {picked !== undefined && i === current.answer ? (
                      <Check size={14} />
                    ) : picked === i ? (
                      <X size={14} />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </span>
                  {answer[lang]}
                </button>
              ))}
            </div>
            <div aria-live="polite" aria-atomic="true">
              {picked !== undefined && (
                <div className="rs-feedback">
                  <Lightbulb size={20} aria-hidden="true" />
                  <div><strong>
                    {picked === current.answer
                      ? words('Richtig!', 'Correct!')[lang]
                      : words('Die richtige Antwort lautet: ', 'The correct answer is: ')[lang] +
                        current.choices[current.answer][lang]}
                  </strong>
                  <p>{current.explanation[lang]}</p></div>
                </div>
              )}
            </div>
            {picked !== undefined && (
              <button onClick={advance} className="rs-button">
                {state.page === questions.length - 1
                  ? words('Ergebnis anzeigen', 'Show result')[lang]
                  : words('Nächste Frage', 'Next question')[lang]}
                <ArrowRight size={16} />
              </button>
            )}
          </>
        ) : (
          <div className="rs-quiz-result">
            <span className="rs-result-art" aria-hidden="true">
              <Fingerprint size={54} />
              <CircleCheck className="rs-result-check" size={30} />
            </span>
            <h3 ref={heading} tabIndex={-1}>
              {words('Quiz abgeschlossen', 'Quiz complete')[lang]}
            </h3>
            <p>
              {lang === 'de'
                ? `Du hast ${score} von ${questions.length} Fragen richtig beantwortet.`
                : `You answered ${score} of ${questions.length} questions correctly.`}
            </p>
            <button
              className="rs-button"
              onClick={() => {
                focusOnChange.current = true
                setState(emptyQuiz())
              }}
            >
              <RotateCcw size={16} />
              {words('Nochmals versuchen', 'Try again')[lang]}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export function Resources({ lang }: Props) {
  const [search, setSearch] = useState('')
  const query = search.trim().toLocaleLowerCase(lang)
  const matches = (...parts: string[]) =>
    parts.some((part) => part.toLocaleLowerCase(lang).includes(query))
  const foundFaq = faq.filter((item) => matches(item.title[lang], item.body[lang]))
  const foundTerms = glossary.filter(([term, definition]) => matches(term[lang], definition[lang]))
  useOpenAnchor()
  return (
    <section id="faq" aria-labelledby="faq-title" className="rs-section rs-reference">
      <div className="rs-faq-head"><h2 id="faq-title">{words('Fragen und Antworten', 'Questions and answers')[lang]}</h2>
      <label className="rs-search">
        <Search size={19} aria-hidden="true" />
        <input
          type="search"
          aria-label={
            words('Fragen und Glossar durchsuchen', 'Search questions and glossary')[lang]
          }
          placeholder={
            words('Fragen und Glossar durchsuchen', 'Search questions and glossary')[lang]
          }
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
      </label></div>
      <div role="status" className="rs-visually-hidden">
        {query &&
          (lang === 'de'
            ? `${foundFaq.length} Fragen und ${foundTerms.length} Begriffe gefunden.`
            : `${foundFaq.length} questions and ${foundTerms.length} terms found.`)}
      </div>
      {foundFaq.length + foundTerms.length === 0 && (
        <div className="rs-no-results">
          <p>{words('Dazu gibt es keinen Eintrag.', 'No entries match your search.')[lang]}</p>
          <button className="rs-text-action" onClick={() => setSearch('')}>
            {words('Alle Einträge anzeigen', 'Show all entries')[lang]}
          </button>
        </div>
      )}
      <div className="rs-ref-grid">
        {foundFaq.length > 0 && (
          <div>
            <h3>{words('Häufige Fragen', 'Common questions')[lang]}</h3>
            {foundFaq.map((item) => (
              <details className="rs-detail" key={item.id} id={'faq-' + item.id}>
                <summary>
                  {item.title[lang]}
                  <ChevronDown size={18} />
                </summary>
                <p>{item.body[lang]}</p>
              </details>
            ))}
          </div>
        )}
        {foundTerms.length > 0 && (
          <div>
            <h3>{words('Glossar', 'Glossary')[lang]}</h3>
            {foundTerms.map(([term, definition]) => (
              <details className="rs-detail" key={term.en}>
                <summary>
                  {term[lang]}
                  <ChevronDown size={18} />
                </summary>
                <p>{definition[lang]}</p>
              </details>
            ))}
          </div>
        )}
      </div>
      <div className="rs-sources" id="resources">
        <h3>
          <BookOpen size={20} />
          {words('Offizielle Quellen', 'Official resources')[lang]}
        </h3>
        <div>
          {references.map(([name, url]) => (
            <a className="rs-link" key={name} href={url}>
              {name}
              <ArrowUpRight size={15} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
