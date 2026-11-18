import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  Fingerprint,
  KeyRound,
  RectangleEllipsis,
  RotateCcw,
  UserRound,
} from 'lucide-react'
import { CryptoDiagram } from '../components/animations/LessonIllustration'
import { discovery } from '../content/discovery'
import type { DemoLanguage } from '../content/discovery'
import '../styles/lessons.css'

export function StepTrack({
  index,
  count,
  label,
}: {
  index: number
  count: number
  label: string
}) {
  return (
    <div
      className="lesson-progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={1}
      aria-valuemax={count}
      aria-valuenow={index + 1}
    >
      {Array.from({ length: count }, (_, i) => (
        <span key={i} data-filled={i <= index} />
      ))}
    </div>
  )
}

function SignInFlow({ lang, kind }: { lang: DemoLanguage; kind: 'password' | 'passkey' }) {
  const [index, setIndex] = useState(0)
  const copy = discovery[lang]
  const flow = copy[kind]
  const current = flow.steps[index]
  const done = index === flow.steps.length - 1
  const Glyph = done
    ? Check
    : index === 0
      ? UserRound
      : kind === 'passkey'
        ? Fingerprint
        : RectangleEllipsis
  const value = done
    ? copy.confirmed
    : index === 0
      ? 'Mika'
      : kind === 'passkey'
        ? copy.device
        : index === 1
          ? '••••••••••'
          : '164 283'
  return (
    <article className={'lesson-flow lesson-flow-' + kind}>
      <header>
        <h3>
          {kind === 'password' ? (
            <RectangleEllipsis aria-hidden="true" />
          ) : (
            <KeyRound aria-hidden="true" />
          )}
          {flow.title}
        </h3>
        <small>{copy.simulation}</small>
      </header>
      <div className="lesson-field" aria-hidden="true">
        <Glyph size={23} />
        <span>{value}</span>
        <span className="lesson-counter">
          {index + 1} / {flow.steps.length}
        </span>
      </div>
      <div className="lesson-flow-text" aria-live="polite" aria-atomic="true">
        <h4>{current.title}</h4>
        <p>{current.text}</p>
      </div>
      <StepTrack index={index} count={flow.steps.length} label={flow.title} />
      <button
        type="button"
        className="lesson-action"
        onClick={() => setIndex(done ? 0 : index + 1)}
      >
        {done ? copy.replay : current.action}
        {done ? <RotateCcw size={16} /> : <ArrowRight size={16} />}
      </button>
    </article>
  )
}

export function Discover({ lang }: { lang: DemoLanguage }) {
  const copy = discovery[lang]
  const [step, setStep] = useState(0)
  const details = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    const openTechnical = () => {
      if (window.location.hash === '#how-technical' && details.current) details.current.open = true
    }
    openTechnical()
    window.addEventListener('hashchange', openTechnical)
    return () => window.removeEventListener('hashchange', openTechnical)
  }, [])
  const item = copy.howSteps[step]
  const last = step === copy.howSteps.length - 1
  return (
    <>
      <section className="lesson-shell" id="compare" aria-labelledby="compare-heading">
        <h2 id="compare-heading">{copy.compareTitle}</h2>
        <p className="lesson-intro">{copy.compareIntro}</p>
        <div className="lesson-compare">
          <SignInFlow lang={lang} kind="password" />
          <SignInFlow lang={lang} kind="passkey" />
        </div>
        <div className="lesson-links">
          <a href="#wizard">
            {lang === 'de' ? 'Passenden Speicherort finden' : 'Find a passkey provider'}{' '}
            <ArrowRight size={16} />
          </a>
          <a href="#setup">
            {lang === 'de' ? 'Ersten Passkey einrichten' : 'Set up your first passkey'}{' '}
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
      <section className="lesson-shell" id="how" aria-labelledby="how-heading">
        <h2 id="how-heading">{copy.howTitle}</h2>
        <p className="lesson-intro">{copy.howIntro}</p>
        <div className="lesson-walkthrough">
          <div className="lesson-stage">
            <CryptoDiagram lang={lang} step={step} />
          </div>
          <div className="lesson-walkthrough-copy">
            <div aria-live="polite" aria-atomic="true">
              <small>
                {copy.step} {step + 1} / {copy.howSteps.length}
              </small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            <div className="lesson-controls">
              <button
                className="lesson-secondary"
                onClick={() => setStep(step - 1)}
                disabled={!step}
              >
                <ArrowLeft size={16} />
                {copy.back}
              </button>
              <button className="lesson-action" onClick={() => setStep(last ? 0 : step + 1)}>
                {last ? copy.replay : copy.next}
                {last ? <RotateCcw size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
          </div>
        </div>
        <details className="lesson-technical" id="how-technical" ref={details}>
          <summary>
            {copy.techTitle}
            <ChevronDown size={20} />
          </summary>
          {copy.tech.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <a href="https://www.w3.org/TR/webauthn-3/">
            {copy.source}
            <ExternalLink size={14} />
          </a>
        </details>
        <div className="lesson-links">
          <a href="#playground">
            {lang === 'de' ? 'Im Playground ausprobieren' : 'Try it in the playground'}{' '}
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  )
}
