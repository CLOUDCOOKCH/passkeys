import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, CircleHelp, RotateCcw } from 'lucide-react'
import { practiceCopy as copy, practiceSteps } from '../content/m365Practice'
import type { Lang } from '../i18n/home'
import './m365-practice.css'

/** A labelled office key remains visible through registration and the independent sign-in. */
function OfficeKey({ lang, registered }: { lang: Lang; registered: boolean }) {
  return (
    <svg viewBox="0 0 330 175" className="m365-key-illustration" aria-hidden="true">
      <ellipse cx="166" cy="147" rx="108" ry="6" fill="#bbd2be" />
      <g transform="translate(156 99) rotate(9)" stroke="#315744" strokeLinejoin="round">
        <path d="M-62-22H63q7 0 7 7v37q0 6-7 6H-62l-16-23Z" fill="#e2bd7e" strokeWidth="2" />
        <path d="M-62-26H63q7 0 7 7v37q0 6-7 6H-62L-78-2Z" fill="#fff4ce" strokeWidth="2.3" />
        <circle cx="-60" cy="-1" r="4" fill="#c3d8bd" strokeWidth="1.6" />
        <text x="4" y="5" textAnchor="middle" stroke="none" fill="#304c3b" fontSize="13" fontWeight="730">{copy.tag[lang]}</text>
      </g>
      <path d="M105 91C77 96 60 87 63 68s34-36 51-23" fill="none" stroke="#315744" strokeWidth="5" strokeLinecap="round" />
      <path d="M105 91C77 96 60 87 63 68s34-36 51-23" fill="none" stroke="#f5f1db" strokeWidth="2" strokeLinecap="round" />
      <g transform="translate(149 59) rotate(-13)" stroke="#28493c" strokeLinejoin="round">
        <path d="M40-22h59v34H40Z" fill="#bbc9c3" strokeWidth="2.5" />
        <path d="M69-14h12v6H69zm0 13h12v6H69z" fill="#64776d" stroke="none" />
        <path d="M52-18h45" stroke="#fffef1" strokeWidth="2" />
        <rect x="-61" y="-27" width="119" height="58" rx="19" fill="#89a98e" strokeWidth="2.8" />
        <rect x="-62" y="-32" width="119" height="58" rx="19" fill="#b2d5b3" strokeWidth="2.8" />
        <circle cx="-45" cy="-3" r="5.7" fill="#dfe9d6" strokeWidth="2" />
        <circle cx="16" cy="-3" r="17" fill="#edc67f" strokeWidth="2.4" />
        <circle cx="16" cy="-3" r="12.5" fill="none" stroke="#a37b3e" strokeWidth="1" />
        <path d="M10-3c0-10 14-10 14 1m-12 4c2-4-1-9 4-9s3 7 6 9m-7 2c2-2 1-6 2-8" fill="none" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      {registered && <g transform="translate(244 102)" stroke="#315744" strokeWidth="2.5">
        <circle r="15" fill="#f6e3a7" /><path d="m-7 0 5 5 9-10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>}
    </svg>
  )
}

export function M365Practice({ lang }: { lang: Lang }) {
  const [index, setIndex] = useState(0)
  const [feedback, setFeedback] = useState('')
  const heading = useRef<HTMLHeadingElement>(null)
  const moveFocus = useRef(false)
  const step = practiceSteps[index]
  const finished = index === practiceSteps.length - 1
  const registered = index >= 4

  useEffect(() => {
    if (moveFocus.current) {
      heading.current?.focus({ preventScroll: true })
      moveFocus.current = false
    }
  }, [index])

  function advance() {
    setFeedback('')
    moveFocus.current = true
    setIndex(finished ? 0 : index + 1)
  }

  return (
    <section id="m365-practice" className="m365-practice" aria-labelledby="m365-practice-title">
      <h3 id="m365-practice-title">{copy.title[lang]}</h3>
      <p className="m365-practice-intro">{copy.intro[lang]}</p>
      <div className="m365-practice-panel">
        <aside className="m365-practice-visual" aria-label={copy.account[lang]}>
          <div className="m365-practice-account">
            <span>{copy.account[lang]}</span><strong>mika@atelier.example</strong>
          </div>
          <OfficeKey lang={lang} registered={registered} />
          <ol className="m365-practice-stages" aria-label={copy.phase[lang]}>
            {(['register', 'test'] as const).map((phase, i) => (
              <li key={phase} aria-current={step.phase === phase ? 'step' : undefined}>
                <span className="m365-stage-number" aria-hidden="true">
                  {(phase === 'register' ? registered : finished) ? <Check size={14} /> : i + 1}
                </span>
                {phase === 'register' && registered ? copy.registered[lang]
                  : phase === 'test' && finished ? copy.tested[lang] : copy[phase][lang]}
              </li>
            ))}
          </ol>
        </aside>
        <div className="m365-practice-task">
          <span className="m365-practice-mode">{copy.simulation[lang]}</span>
          <h4 ref={heading} tabIndex={-1}>{step.title[lang]}</h4>
          <p>{step.body[lang]}</p>
          <div className="m365-practice-actions">
            {step.choices.map((choice) => (
              <button type="button" key={choice.label.en}
                className={step.choices.length === 1 ? 'm365-practice-advance' : 'm365-practice-choice'}
                onClick={() => choice.feedback ? setFeedback(choice.feedback[lang]) : advance()}>
                {choice.label[lang]}
                {finished ? <RotateCcw size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
              </button>
            ))}
          </div>
          <div role="status" className="m365-practice-feedback">
            {feedback && <><CircleHelp size={18} aria-hidden="true" /><span>{feedback}</span></>}
          </div>
        </div>
      </div>
    </section>
  )
}
