import { useCallback, useEffect, useState } from 'react'
import { Activity, ArrowRight, CalendarDays, Check, FlaskConical, Globe, Headphones, Map, Presentation, Route, Smartphone, Usb } from 'lucide-react'
import { playground } from '../content/playground'
import type { DemoLanguage } from '../content/discovery'
import type { Experiment } from '../lib/playground'
import { RecoveryMission } from './RecoveryMission'
import { HelpDeskMission } from './HelpDeskMission'
import { LiveWorkshop } from './LiveWorkshop'
import { PlaygroundBench } from './PlaygroundBench'
import { SignatureStudio } from './SignatureStudio'
import '../styles/lessons.css'
import './playground.css'

const stations = ['signature', 'hardware', 'phone', 'domain', 'journey'] as const
type Station = Experiment | 'signature'
const icons = { signature: Activity, hardware: Usb, phone: Smartphone, domain: Globe, journey: Route }

function Experiments({ lang }: { lang: DemoLanguage }) {
  const de = lang === 'de'
  const [station, setStation] = useState<Station>('signature')
  const [completed, setCompleted] = useState<Station[]>([])
  const finish = useCallback((id: Station) => {
    setCompleted(previous => previous.includes(id) ? previous : [...previous, id])
  }, [])
  const finishStudio = useCallback(() => finish('signature'), [finish])
  const finishBench = useCallback(() => finish(station), [finish, station])
  const copy = playground[lang]
  const names = [de ? 'Signaturstudio' : 'Signature studio', ...copy.modules]
  const next = (stations.indexOf(station) + 1) % stations.length

  return (
    <>
      <div className="lab-station-rail" role="group" aria-label={copy.choose}>
        {stations.map((id, i) => {
          const Icon = icons[id]
          const done = completed.includes(id)
          return (
            <button key={id} type="button" data-station={id} aria-pressed={station === id}
              aria-controls="lab-worktop" onClick={() => setStation(id)}>
              <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
              <span>{names[i]}</span>
              {done && <Check className="station-check" size={14} aria-hidden="true" />}
            </button>
          )
        })}
      </div>
      <div id="lab-worktop">
        <div hidden={station !== 'signature'}>
          <SignatureStudio lang={lang} onComplete={finishStudio} />
        </div>
        {station !== 'signature' &&
          <PlaygroundBench key={station} lang={lang} experiment={station} onComplete={finishBench} />}
      </div>
      <footer className="lab-ledger">
        <div className="lab-completion" role="status">
          <span className="lab-marks" aria-hidden="true">
            {stations.map(id => <i key={id} data-done={completed.includes(id)} />)}
          </span>
          <span><b>{completed.length} / {stations.length}</b> {de ? 'abgeschlossen' : 'completed'}</span>
        </div>
        <button type="button" className="lab-next" onClick={() => setStation(stations[next])}>
          {de ? 'Weiter zu' : 'Up next'} · {names[next]} <ArrowRight size={15} aria-hidden="true" />
        </button>
      </footer>
    </>
  )
}

const modes = [
  { id: 'experiments', hash: '#playground', de: 'Experimente', en: 'Experiments', icon: FlaskConical },
  { id: 'missions', hash: '#playground-missions', de: 'Missionen', en: 'Missions', icon: Map },
  { id: 'workshop', hash: '#playground-workshop', de: 'Live-Workshop', en: 'Live workshop', icon: Presentation },
] as const

type Mode = typeof modes[number]['id']
type Mission = 'recovery' | 'helpdesk'
type View = { mode: Mode; mission: Mission }
const defaultView: View = { mode: 'experiments', mission: 'recovery' }

function viewForHash(hash: string, previous: View): View {
  if (hash === '#help-desk-mission') return { mode: 'missions', mission: 'helpdesk' }
  if (hash === '#recovery-mission') return { mode: 'missions', mission: 'recovery' }
  if (hash === '#live-workshop') return { ...previous, mode: 'workshop' }
  const mode = modes.find(item => item.hash === hash)
  return mode ? { ...previous, mode: mode.id } : previous
}

export function Playground({ lang }: { lang: DemoLanguage }) {
  const de = lang === 'de'
  const [view, setView] = useState(() => viewForHash(window.location.hash, defaultView))

  useEffect(() => {
    let frame = 0
    function followHash() {
      const hash = window.location.hash
      const target = document.getElementById(hash.slice(1))
      // A link from elsewhere on the page can point into a currently hidden mode.
      const reveal = target && target.closest('#playground') && !target.getClientRects().length
      setView(previous => viewForHash(hash, previous))
      cancelAnimationFrame(frame)
      if (reveal) frame = requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }))
    }
    window.addEventListener('hashchange', followHash)
    return () => {
      window.removeEventListener('hashchange', followHash)
      cancelAnimationFrame(frame)
    }
  }, [])

  function selectMission(mission: Mission) {
    setView({ mode: 'missions', mission })
    // Keep the selector in view while making this mission's address shareable.
    window.history.replaceState(window.history.state, '', mission === 'recovery' ? '#recovery-mission' : '#help-desk-mission')
  }

  return (
    <section className="lab-playground" id="playground" aria-labelledby="lab-heading">
      <div className="lesson-shell lab-shell">
        <header className="lab-masthead">
          <h2 id="lab-heading">{de ? 'Passkey-' : 'Passkey '}<wbr /><em>{de ? 'Spielplatz' : 'playground'}</em></h2>
          <p>{de
            ? 'Teste eine Signatur, löse einen Supportfall oder lass dein Team gemeinsam entscheiden, wie es nach einem Geräteverlust weitergeht.'
            : 'Test a signature, solve a support ticket or ask your team how they’d sign in after losing a device.'}</p>
        </header>
        <nav className="lab-modes" aria-label={de ? 'Spielplatzbereiche' : 'Playground modes'}>
          {modes.map(({ id, hash, icon: Icon, ...label }) => (
            <a key={id} href={hash} aria-current={view.mode === id ? 'location' : undefined}
              onClick={event => {
                if (!(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey))
                  setView(previous => ({ ...previous, mode: id }))
              }}>
              <Icon size={18} aria-hidden="true" />{label[lang]}
            </a>
          ))}
        </nav>
        <div hidden={view.mode !== 'experiments'}>
          <Experiments lang={lang} />
        </div>
        <div id="playground-missions" hidden={view.mode !== 'missions'}>
          <div className="lab-mission-picker" role="group" aria-label={de ? 'Mission wählen' : 'Choose a mission'}>
            <button type="button" data-mission="recovery" aria-pressed={view.mission === 'recovery'}
              aria-controls="recovery-mission" onClick={() => selectMission('recovery')}>
              <CalendarDays size={18} aria-hidden="true" />{de ? 'Das verlorene Handy' : 'The lost phone'}
            </button>
            <button type="button" data-mission="helpdesk" aria-pressed={view.mission === 'helpdesk'}
              aria-controls="help-desk-mission" onClick={() => selectMission('helpdesk')}>
              <Headphones size={18} aria-hidden="true" />{de ? 'Am IT-Servicedesk' : 'On the help desk'}
            </button>
          </div>
          <div hidden={view.mission !== 'recovery'}><RecoveryMission lang={lang} /></div>
          <div hidden={view.mission !== 'helpdesk'}><HelpDeskMission lang={lang} /></div>
        </div>
        <div id="playground-workshop" hidden={view.mode !== 'workshop'}>
          <LiveWorkshop lang={lang} />
        </div>
      </div>
    </section>
  )
}
