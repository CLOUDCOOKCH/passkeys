import { useCallback, useState } from 'react'
import { Activity, ArrowRight, Check, Globe, Route, Smartphone, Usb } from 'lucide-react'
import { playground } from '../content/playground'
import type { DemoLanguage } from '../content/discovery'
import type { Experiment } from '../lib/playground'
import { PlaygroundBench } from './PlaygroundBench'
import { SignatureStudio } from './SignatureStudio'
import '../styles/lessons.css'
import './playground.css'

const stations = ['signature', 'hardware', 'phone', 'domain', 'journey'] as const
type Station = Experiment | 'signature'
const icons = { signature: Activity, hardware: Usb, phone: Smartphone, domain: Globe, journey: Route }

export function Playground({ lang }: { lang: DemoLanguage }) {
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
    <section className="lab-playground" id="playground" aria-labelledby="lab-heading">
      <div className="lesson-shell lab-shell">
        <header className="lab-masthead">
          <h2 id="lab-heading">{de ? 'Passkey-' : 'Passkey '}<wbr /><em>{de ? 'Spielplatz' : 'playground'}</em></h2>
          <p>{de
            ? 'Signiere eine Nachricht, tausche ein Zeichen aus und prüfe, was noch passt. Fünf Experimente zum Anfassen. Alles bleibt in deinem Browser.'
            : 'Sign a message, change one character and see what still checks out. Five hands-on experiments, all in your browser.'}</p>
        </header>
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
      </div>
    </section>
  )
}
