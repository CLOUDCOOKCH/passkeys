import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeftRight, ArrowRight, Check, Hand, Layers, MonitorPlay, Projector, RotateCcw, X,
} from 'lucide-react'
import { liveWorkshop } from '../content/liveWorkshop'
import type { Lang } from '../i18n/home'
import './live-workshop.css'

type Stage = 'intro' | 'dilemma' | 'voting' | 'reveal' | 'compare' | 'complete'
type RouteIndex = 0 | 1
const routeIndexes = [0, 1] as const
const letters = ['A', 'B'] as const

function VotingCards() {
  return (
    <svg className="workshop-ballots" viewBox="0 0 340 195" fill="none" aria-hidden="true">
      <ellipse cx="170" cy="170" rx="100" ry="8" fill="#2f5544" />
      <g transform="translate(118 88) rotate(-15)" stroke="#192f26" strokeLinejoin="round">
        <path d="M-7 36h14v50q-7 6-14 0z" fill="#bb9467" strokeWidth="3" />
        <rect x="-54" y="-57" width="114" height="105" rx="9" fill="#9eaa71" strokeWidth="3" />
        <rect x="-58" y="-61" width="114" height="105" rx="9" fill="#e1ebac" strokeWidth="3" />
        <rect x="-49" y="-52" width="96" height="87" rx="4" stroke="#9aaa70" />
        <path d="m-23 19 20-53h11l20 53H16l-4-12H-8l-4 12zM-4-3h12L2-21z" fill="#344c35" fillRule="evenodd" stroke="none" />
      </g>
      <g transform="translate(216 100) rotate(12)" stroke="#192f26" strokeLinejoin="round">
        <path d="M-5 32h13v47q-7 6-13 0z" fill="#b68b63" strokeWidth="3" />
        <rect x="-48" y="-55" width="106" height="99" rx="9" fill="#bd8a69" strokeWidth="3" />
        <rect x="-52" y="-59" width="106" height="99" rx="9" fill="#f3c393" strokeWidth="3" />
        <rect x="-43" y="-50" width="88" height="81" rx="4" stroke="#bd9266" />
        <path d="M-17-34H4q16 0 16 13 0 8-7 11 10 3 10 13 0 14-18 14h-22zm11 9v11h9q6 0 6-6t-6-5zm0 21v12H4q8 0 8-6t-8-6z" fill="#5b402e" fillRule="evenodd" stroke="none" />
      </g>
    </svg>
  )
}

function focusDestination(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  // Keep keyboard navigation at the same destination as the visible anchor jump.
  if (!target.hasAttribute('tabindex') && target.tabIndex < 0) {
    target.tabIndex = -1
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
  }
  target.focus({ preventScroll: true })
  target.scrollIntoView({ block: 'start', behavior: 'instant' })
}

export function LiveWorkshop({ lang }: { lang: Lang }) {
  const copy = liveWorkshop[lang]
  const [roundIndex, setRoundIndex] = useState(0)
  const [stage, setStage] = useState<Stage>('intro')
  const [selected, setSelected] = useState<RouteIndex | null>(null)
  const [presenting, setPresenting] = useState(false)
  const [inlineFallback, setInlineFallback] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const pendingFocus = useRef(false)
  const destination = useRef<string | null>(null)
  const round = copy.rounds[roundIndex]
  const lastRound = roundIndex === copy.rounds.length - 1

  useEffect(() => {
    if (pendingFocus.current) {
      heading.current?.focus({ preventScroll: true })
      // A tall comparison slide can leave the next slide's heading above the viewport.
      heading.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
      pendingFocus.current = false
    }
  }, [stage, roundIndex, presenting])

  useEffect(() => {
    if (!presenting) return
    function followNavigation() {
      const id = window.location.hash.slice(1)
      if (!dialog.current?.open || ['live-workshop', 'playground-workshop', 'workshop-title'].includes(id)) return
      destination.current = id
      dialog.current.close()
    }
    window.addEventListener('hashchange', followNavigation)
    window.addEventListener('popstate', followNavigation)
    return () => {
      window.removeEventListener('hashchange', followNavigation)
      window.removeEventListener('popstate', followNavigation)
    }
  }, [presenting])

  function go(next: Stage) {
    pendingFocus.current = true
    setStage(next)
  }

  function startRound(index: number) {
    setRoundIndex(index)
    setSelected(null)
    go('dilemma')
    if (stage === 'dilemma' && index === roundIndex) {
      heading.current?.focus({ preventScroll: true })
      pendingFocus.current = false
    }
  }

  function openPresenter() {
    try {
      if (!dialog.current) return
      dialog.current.showModal()
      setInlineFallback(false)
      pendingFocus.current = true
      setPresenting(true)
    } catch {
      // Older embedded browsers can still run the entire workshop inline.
      setInlineFallback(true)
    }
  }

  function closePresenter() {
    setPresenting(false)
    if (destination.current !== null) {
      const id = destination.current
      destination.current = null
      requestAnimationFrame(() => focusDestination(id))
    } else {
      opener.current?.focus({ preventScroll: true })
    }
  }

  function board() {
    if (stage === 'intro' || stage === 'complete') {
      const complete = stage === 'complete'
      return (
        <div className="workshop-bookend" data-stage={stage}>
          <div className="workshop-print"><VotingCards /></div>
          <div className="workshop-bookend-copy">
            <h4 ref={heading} tabIndex={-1}>
              {complete ? copy.complete : lang === 'de' ? 'Wie entscheidet ihr?' : 'Which route would you take?'}
            </h4>
            <p>{complete ? copy.takeaway : copy.intro}</p>
            {complete ? (
              <a className="workshop-primary" href="#m365-card-builder" onClick={event => {
                if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
                if (dialog.current?.open) {
                  destination.current = 'm365-card-builder'
                  dialog.current.close()
                } else requestAnimationFrame(() => focusDestination('m365-card-builder'))
              }}>
                {copy.card}<ArrowRight size={18} aria-hidden="true" />
              </a>
            ) : (
              <button type="button" className="workshop-primary" onClick={() => startRound(0)}>
                {copy.start}<ArrowRight size={18} aria-hidden="true" />
              </button>
            )}
            {complete && (
              <button type="button" className="workshop-restart" onClick={() => startRound(0)}>
                <RotateCcw size={15} aria-hidden="true" />{copy.restart}
              </button>
            )}
          </div>
        </div>
      )
    }

    const revealed = stage === 'reveal' || stage === 'compare'
    return (
      <div className="workshop-board" data-stage={stage}>
        <div className="workshop-scene">
          <div className="workshop-round">
            <span>{copy.round} {roundIndex + 1} / {copy.rounds.length}</span>
            <span>{round.scene}</span>
          </div>
          <h4 ref={heading} tabIndex={-1}>{round.question}</h4>
          {!revealed && <p className="workshop-context">{presenting ? round.projected : round.context}</p>}
        </div>

        {!revealed && (
          <div className="workshop-choices">
            {routeIndexes.map(index => {
              const content = <><b aria-hidden="true">{letters[index]}</b><span>{round.routes[index].choice}</span></>
              const route = index === 0 ? 'a' : 'b'
              return stage === 'voting' ? (
                <button type="button" key={route} className="workshop-option" data-route={route}
                  aria-pressed={selected === index} onClick={() => setSelected(index)}>
                  {content}{selected === index && <Check size={18} className="workshop-selected" aria-hidden="true" />}
                </button>
              ) : <div key={route} className="workshop-option" data-route={route}>{content}</div>
            })}
          </div>
        )}
        {stage === 'voting' && <p className="workshop-vote"><Hand size={20} aria-hidden="true" />{copy.vote}</p>}

        {revealed && selected !== null && (
          <div className="workshop-results" data-compare={stage === 'compare'} aria-live="polite">
            {(stage === 'compare' ? routeIndexes : [selected]).map(index => (
              <article className="workshop-outcome" key={index} data-route={index === 0 ? 'a' : 'b'}>
                <span className="workshop-outcome-label"><b>{letters[index]}</b>{index === selected ? copy.chosen : copy.alternate}</span>
                <p className="workshop-route-name">{round.routes[index].choice}</p>
                <h5>{round.routes[index].result}</h5>
                <p>{presenting ? round.routes[index].projected : round.routes[index].explanation}</p>
              </article>
            ))}
          </div>
        )}

        <div className="workshop-controls">
          <div className="workshop-actions">
            {stage === 'dilemma' && (
              <button type="button" className="workshop-primary" onClick={() => go('voting')}>
                <Hand size={18} aria-hidden="true" />{copy.pause}
              </button>
            )}
            {stage === 'voting' && (
              <button type="button" className="workshop-primary" disabled={selected === null} onClick={() => go('reveal')}>
                {copy.reveal}<ArrowRight size={17} aria-hidden="true" />
              </button>
            )}
            {stage === 'reveal' && (
              <button type="button" className="workshop-secondary" onClick={() => go('compare')}>
                <ArrowLeftRight size={17} aria-hidden="true" />{copy.compare}
              </button>
            )}
            {revealed && (
              <button type="button" className="workshop-primary" onClick={() => lastRound ? go('complete') : startRound(roundIndex + 1)}>
                {lastRound ? copy.finish : copy.next}<ArrowRight size={17} aria-hidden="true" />
              </button>
            )}
          </div>
          <button type="button" className="workshop-restart" onClick={() => startRound(0)}>
            <RotateCcw size={15} aria-hidden="true" />{copy.restart}
          </button>
        </div>
      </div>
    )
  }

  return (
    <section id="live-workshop" className="live-workshop" aria-labelledby="workshop-title">
      <div className="workshop-header">
        <div><Layers size={21} aria-hidden="true" /><h3 id="workshop-title">{copy.title}</h3></div>
        <button ref={opener} type="button" className="workshop-secondary" onClick={openPresenter} aria-haspopup="dialog">
          <Projector size={17} aria-hidden="true" />{copy.present}
        </button>
      </div>
      {inlineFallback && <p role="status">{lang === 'de' ? 'In diesem Browser läuft der Workshop direkt auf dieser Seite.' : 'In this browser, the workshop runs directly on this page.'}</p>}
      {!presenting && board()}
      <dialog ref={dialog} className="workshop-presenter" aria-label={copy.presenter} onClose={closePresenter}>
        {presenting && <div className="workshop-projector">
          <div className="workshop-projector-bar"><span><MonitorPlay size={21} aria-hidden="true" />{copy.title}</span>
            <button type="button" className="workshop-secondary" onClick={() => dialog.current?.close()}>
              <X size={17} aria-hidden="true" />{copy.exit}
            </button>
          </div>
          {board()}
        </div>}
      </dialog>
    </section>
  )
}
