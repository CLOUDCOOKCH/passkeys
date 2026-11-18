import { useReducer, useRef } from 'react'
import { ArrowRight, Globe, Route, RotateCcw, Smartphone, Usb } from 'lucide-react'
import { PlaygroundDrawing } from '../components/animations/LessonIllustration'
import { playground } from '../content/playground'
import type { DemoLanguage } from '../content/discovery'
import { initialLab, updateLab } from '../lib/playground'
import type { Experiment, LabChoice } from '../lib/playground'
import '../styles/lessons.css'

const experiments: Experiment[] = ['hardware', 'phone', 'domain', 'journey']
const icons = [Usb, Smartphone, Globe, Route]

export function Playground({ lang }: { lang: DemoLanguage }) {
  const [state, dispatch] = useReducer(updateLab, initialLab)
  const panelHeading = useRef<HTMLHeadingElement>(null)
  const { experiment, connection, storage, step } = state
  const copy = playground[lang]
  const steps =
    experiment === 'hardware'
      ? copy[connection]
      : experiment === 'journey'
        ? storage === 'synced'
          ? copy.syncJourney
          : copy.boundJourney
        : copy[experiment]
  const item = steps[step]
  const finished = step === steps.length - 1
  const dragActive = experiment === 'hardware' && connection === 'usb' && step === 0

  function option(choice: LabChoice, label: string) {
    const selected = choice === connection || choice === storage
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={() => dispatch({ type: 'option', choice })}
      >
        {label}
      </button>
    )
  }
  function advance() {
    dispatch({ type: 'advance' })
  }

  return (
    <section className="lesson-shell" id="playground" aria-labelledby="lab-heading">
      <h2 id="lab-heading">{copy.title}</h2>
      <p className="lesson-intro">{copy.intro}</p>
      <div className="lab-layout">
        <div className="lab-tabs" role="group" aria-label={copy.choose}>
          {experiments.map((id, index) => {
            const Icon = icons[index]
            return (
              <button
                key={id}
                type="button"
                aria-pressed={experiment === id}
                aria-controls="lab-content"
                onClick={() => dispatch({ type: 'choose', experiment: id })}
              >
                <Icon size={22} />
                {copy.modules[index]}
              </button>
            )
          })}
        </div>
        <div className="lab-panel" id="lab-content">
          <div className="lab-drawing">
            <div className="lab-svg-wrap">
              <PlaygroundDrawing
                scene={experiment === 'hardware' ? connection : experiment}
                step={step}
                synced={storage === 'synced'}
              />
              {dragActive && (
                <>
                  <button
                    type="button"
                    className="lab-drag-source"
                    aria-label={
                      lang === 'de'
                        ? 'Abgebildeten Schlüssel einstecken'
                        : 'Insert the illustrated key'
                    }
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/x-passkeys-lesson', 'key')
                      e.dataTransfer.effectAllowed = 'move'
                    }}
                    onClick={advance}
                  />
                  <div
                    className="lab-drop-target"
                    aria-hidden="true"
                    onDragOver={(e) => {
                      if (e.dataTransfer.types.includes('application/x-passkeys-lesson'))
                        e.preventDefault()
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      if (e.dataTransfer.getData('application/x-passkeys-lesson') === 'key')
                        advance()
                    }}
                  />
                </>
              )}
            </div>
            <small className="lab-caption">{dragActive ? copy.drag : copy.simulation}</small>
          </div>
          <div className="lab-content">
            {experiment === 'hardware' && (
              <div className="lab-switch" role="group" aria-label={copy.transport}>
                {option('usb', 'USB')}
                {option('nfc', 'NFC')}
              </div>
            )}
            {experiment === 'journey' && (
              <div className="lab-switch" role="group" aria-label={copy.kind}>
                {option('synced', copy.synced)}
                {option('bound', copy.bound)}
              </div>
            )}
            <div aria-live="polite" aria-atomic="true">
              <h3 ref={panelHeading} tabIndex={-1}>
                {item.title}
              </h3>
              <p>{item.text}</p>
              {experiment === 'domain' && state.wrongDomain && (
                <p className="lab-feedback">{copy.wrong}</p>
              )}
            </div>
            {experiment === 'domain' && !finished ? (
              <div className="lab-domain-choices">
                {(['atelier-help.example', 'atelier.example'] as const).map((address) => (
                  <button
                    className="lesson-secondary"
                    key={address}
                    onClick={() => {
                      dispatch({ type: 'domain', address })
                      if (address === 'atelier.example') panelHeading.current?.focus()
                    }}
                  >
                    <Globe size={16} />
                    {address}
                  </button>
                ))}
              </div>
            ) : (
              <button
                type="button"
                className="lesson-action"
                onClick={() => (finished ? dispatch({ type: 'restart' }) : advance())}
              >
                {finished ? copy.restart : item.action}
                {finished ? <RotateCcw size={16} /> : <ArrowRight size={16} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
