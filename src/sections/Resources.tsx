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
      <svg viewBox="0 0 272 130" fill="none" aria-hidden="true">
        <g stroke="#184f3d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M63 69h50m55-1h39" strokeDasharray="3 7" />
          <rect x="25" y="31" width="44" height="80" rx="9" fill="#fbf7d5" />
          <path d="M39 38h16m-14 64h12" />
          <path
            d="M106 64a19 19 0 0 1 18-20 24 24 0 0 1 45 4 17 17 0 0 1-1 34h-44a18 18 0 0 1-18-18Z"
            fill="#fffdf3"
          />
          <path d="m132 63 7 7 13-15" />
          <circle cx="219" cy="57" r="15" fill="#d4c6ef" />
          <circle cx="219" cy="54" r="4" />
          <path d="M213 71v25l7 5 5-6-3-5 4-5-3-4V72" fill="#d4c6ef" />
        </g>
      </svg>
      <figcaption>
        {
          words(
            'Ein zweiter Anmeldeweg hilft, wenn ein Gerät ausfällt.',
            'A second way in can help when a device fails.',
          )[lang]
        }
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
              'Ein neues Handy, ein verlorener Schlüssel, ein gesperrtes Konto. Wähle die Situation, die dich beschäftigt.',
              'A new phone, a missing key, a locked account. Choose the situation you’re thinking about.',
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
    'Starte dort, wo Mitarbeitende täglich ein Passwort eingeben. Plane von Anfang an mit, wie sie nach einem Gerätewechsel wieder ins Konto kommen.',
    'Start with a service where employees enter a password every day. Plan how they will get back into their accounts after a device change.',
  ),
  value: words('Was sich für dein Team ändert', 'What changes for your team'),
  benefit: words(
    'Ein wiederverwendetes Passwort kann nach einem Datenleck auch andere Konten gefährden. Ein Passkey gehört zu einem bestimmten Dienst. Das senkt das Risiko von Phishing, und Mitarbeitende können sich mit ihrer vertrauten Gerätesperre anmelden. Ob weniger Supportfälle entstehen, lässt sich im Pilotversuch messen.',
    'A reused password exposed in one breach can put other accounts at risk. A passkey belongs to a particular service. This reduces credential phishing and lets employees use a familiar device unlock. Measure in the pilot whether this reduces support requests.',
  ),
  controls: words('Geräte und Verantwortung', 'Devices and ownership'),
  policy: words(
    'Lege fest, welche Anbieter auf verwalteten Geräten zulässig sind. Für privilegierte Rollen kann ein organisationsgebundener, gerätegebundener Sicherheitsschlüssel sinnvoll sein. Plane Ausgabe, Ersatz, Rückgabe und den Entzug des Zugriffs beim Austritt.',
    'Decide which providers are allowed on managed devices. For privileged roles, an organisation-issued security key with a device-bound passkey can help meet assurance requirements. Plan for issuance, replacement, return, and offboarding.',
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
        </div>
      </div>
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
              'Die Registrierung und das Erzwingen einer Anmeldung sind getrennte Aufgaben. Prüfe die passende Authentifizierungsstärke in Conditional Access, teste Notfallzugang und Wiederherstellung und weite die Richtlinie erst dann aus.',
              'Registration and enforcement are separate steps. Review the appropriate authentication strength in Conditional Access, test emergency access and recovery, then expand the policy.',
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
              'Teste dein Wissen mit sechs Fragen. Nach jeder Antwort erfährst du, warum sie stimmt oder was dahintersteckt.',
              'Try six questions. After every answer, see why it works or what you missed.',
            )[lang]
          }
        </p>
        <div className="rs-quiz-meter" aria-hidden="true">
          {questions.map((q, i) => (
            <span key={q.prompt.en} className={i < state.answers.length ? 'filled' : ''} />
          ))}
        </div>
      </div>
      <div className="rs-quiz-board">
        {current ? (
          <>
            <p id="quiz-count" className="rs-question-count">
              {words('Frage', 'Question')[lang]} {state.page + 1} / {questions.length}
            </p>
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
                  <strong>
                    {picked === current.answer
                      ? words('Richtig!', 'Correct!')[lang]
                      : words('Die richtige Antwort lautet: ', 'The correct answer is: ')[lang] +
                        current.choices[current.answer][lang]}
                  </strong>
                  <p>{current.explanation[lang]}</p>
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
      <h2 id="faq-title">{words('Fragen und Antworten', 'Questions and answers')[lang]}</h2>
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
      </label>
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
