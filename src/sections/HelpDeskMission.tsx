import { useLayoutEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  ClipboardList,
  Headphones,
  MessageCircle,
  RotateCcw,
  TicketCheck,
} from 'lucide-react'
import {
  caseIds,
  causes,
  deskCopy as copy,
  questions,
  remedies,
  tickets,
  wrongRemedy,
  type CaseId,
} from '../content/helpDeskMission'
import type { Lang } from '../i18n/home'
import './help-desk-mission.css'

type Phase = 'questions' | 'diagnosis' | 'action' | 'done'
type CaseRecord = {
  asked: CaseId[]
  phase: Phase
  feedback: 'mismatch' | 'unsupported' | CaseId | null
}

function openTickets(): Record<CaseId, CaseRecord> {
  const open = (): CaseRecord => ({ asked: [], phase: 'questions', feedback: null })
  return { account: open(), provider: open(), key: open() }
}

export function HelpDeskMission({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<CaseId>('account')
  const [records, setRecords] = useState(openTickets)
  const heading = useRef<HTMLHeadingElement>(null)
  const moveFocus = useRef(false)
  useLayoutEffect(() => {
    if (moveFocus.current) {
      heading.current?.focus({ preventScroll: true })
      moveFocus.current = false
    }
  }, [records, active])
  const ticket = tickets[active]
  const record = records[active]
  const phase = record.phase
  const solved = caseIds.filter((id) => records[id].phase === 'done').length
  const next = caseIds.find((id) => records[id].phase !== 'done')
  const feedback = record.feedback
  const feedbackText =
    feedback === 'unsupported'
      ? copy.unsupported[lang] + ' ' + ticket.supportingClue[lang]
      : feedback === 'mismatch'
        ? copy.mismatch[lang]
        : feedback
          ? wrongRemedy[feedback][lang]
          : ''

  function patch(change: Partial<CaseRecord>) {
    setRecords((previous) => ({ ...previous, [active]: { ...previous[active], ...change } }))
  }

  function changePhase(to: Phase) {
    patch({ phase: to, feedback: null })
    moveFocus.current = true
  }

  function diagnose(candidate: CaseId) {
    if (candidate !== active) {
      patch({ feedback: 'mismatch' })
    } else if (!record.asked.includes(active) && record.asked.length < 2) {
      // A positive observation or two exclusions are enough to distinguish the three cases.
      patch({ feedback: 'unsupported' })
    } else {
      changePhase('action')
    }
  }

  return (
    <article id="help-desk-mission" className="hd-mission" aria-labelledby="hd-title">
      <header className="hd-intro">
        <span className="hd-headset" aria-hidden="true">
          <Headphones strokeWidth={1.5} />
        </span>
        <div>
          <h3 id="hd-title">{copy.title[lang]}</h3>
          <p>{copy.intro[lang]}</p>
        </div>
      </header>
      <div className="hd-queue" role="group" aria-label={copy.choose[lang]}>
        {caseIds.map((id) => (
          <button
            key={id}
            type="button"
            data-ticket={id}
            aria-pressed={id === active}
            aria-controls="hd-current"
            onClick={() => setActive(id)}
          >
            {records[id].phase === 'done' ? (
              <TicketCheck size={19} aria-hidden="true" />
            ) : (
              <MessageCircle size={18} aria-hidden="true" />
            )}
            <span>
              Ticket {tickets[id].number} · {tickets[id].name}
            </span>
            {records[id].phase === 'done' && <span className="hd-sr"> · {copy.done[lang]}</span>}
          </button>
        ))}
      </div>

      <div id="hd-current" className="hd-case" data-phase={phase}>
        <div className="hd-notebook">
          <p className="hd-caller">{ticket.name}</p>
          <blockquote>{copy.symptom[lang]}</blockquote>
          <h4>
            <ClipboardList size={18} aria-hidden="true" />
            {copy.facts[lang]}
          </h4>
          {record.asked.length === 0 && <p className="hd-empty">{copy.empty[lang]}</p>}
          <ol className="hd-clues" aria-live="polite" aria-relevant="additions">
            {record.asked.map((id) => (
              <li key={id}>
                <strong>{questions[id][lang]}</strong>
                <p>{ticket.clues[id][lang]}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="hd-interview">
          <h4 ref={heading} tabIndex={-1}>
            {copy[phase][lang]}
          </h4>
          {phase === 'questions' && (
            <>
              <div className="hd-answers">
                {caseIds.map((id) => (
                  <button
                    type="button"
                    key={id}
                    data-question={id}
                    disabled={record.asked.includes(id)}
                    onClick={() => patch({ asked: [...record.asked, id], feedback: null })}
                  >
                    {questions[id][lang]}
                    {record.asked.includes(id) ? <Check size={17} /> : <MessageCircle size={16} />}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="hd-primary"
                data-stage-action="diagnose"
                disabled={!record.asked.length}
                onClick={() => changePhase('diagnosis')}
              >
                {copy.diagnose[lang]}
                <ArrowRight size={16} />
              </button>
            </>
          )}
          {phase === 'diagnosis' && (
            <>
              <div className="hd-answers">
                {caseIds.map((id) => (
                  <button type="button" key={id} data-diagnosis={id} onClick={() => diagnose(id)}>
                    {causes[id][lang]}
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="hd-text-button"
                data-stage-action="ask"
                onClick={() => changePhase('questions')}
              >
                {copy.ask[lang]}
              </button>
            </>
          )}
          {phase === 'action' && (
            <>
              <p className="hd-diagnosis">
                {copy.review[lang]} · <strong>{causes[active][lang]}</strong>
              </p>
              <div className="hd-answers">
                {caseIds.map((id) => (
                  <button
                    type="button"
                    key={id}
                    data-remedy={id}
                    onClick={() => (id === active ? changePhase('done') : patch({ feedback: id }))}
                  >
                    {remedies[id][lang]}
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </>
          )}
          {phase === 'done' && (
            <div className="hd-resolution">
              <span className="hd-stamp" aria-hidden="true">
                <TicketCheck size={30} />
              </span>
              <p>{ticket.resolved[lang]}</p>
              {next && (
                <button
                  type="button"
                  className="hd-primary"
                  onClick={() => {
                    setActive(next)
                    moveFocus.current = true
                  }}
                >
                  {copy.next[lang]}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}
          <p className="hd-feedback" role="status">
            {feedbackText}
          </p>
        </div>
      </div>
      <footer className="hd-footer">
        <span className="hd-score" aria-live="polite" aria-atomic="true">
          <span className="hd-marks" aria-hidden="true">
            {caseIds.map((id) => (
              <i key={id} data-solved={records[id].phase === 'done'} />
            ))}
          </span>
          <b>
            {solved} / {caseIds.length}
          </b>{' '}
          {copy.solved[lang]}
        </span>
        <button
          type="button"
          data-stage-action="restart"
          className="hd-text-button"
          onClick={() => {
            setRecords(openTickets())
            setActive('account')
            moveFocus.current = true
          }}
        >
          <RotateCcw size={15} />
          {copy.restart[lang]}
        </button>
      </footer>
    </article>
  )
}
