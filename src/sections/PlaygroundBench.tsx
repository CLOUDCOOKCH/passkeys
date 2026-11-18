import { useEffect, useReducer, useRef } from 'react'
import { ArrowRight, Globe, RotateCcw } from 'lucide-react'
import { PlaygroundDrawing } from '../components/animations/LessonIllustration'
import type { DemoLanguage } from '../content/discovery'
import { benchCopy, playground } from '../content/playground'
import {
  initialLab,
  updateLab,
  type Experiment,
  type LabAction,
  type LabDomain,
} from '../lib/playground'
import '../styles/lessons.css'
import './playground-bench.css'

interface BenchProps {
  lang: DemoLanguage
  experiment: Experiment
  onComplete: () => void
}

const domains: LabDomain[] = ['atelier-help.example', 'atelier.example']

function Switch({
  label,
  choices,
  selected,
  onSelect,
}: {
  label: string
  choices: [string, string]
  selected: number
  onSelect: (index: number) => void
}) {
  return (
    <div className="bench-switch-wrap">
      <span aria-hidden="true">{label}</span>
      <div className="lab-switch" role="group" aria-label={label}>
        {choices.map((choice, index) => (
          <button
            key={choice}
            type="button"
            aria-pressed={selected === index}
            onClick={() => onSelect(index)}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  )
}

export function PlaygroundBench({ lang, experiment, onComplete }: BenchProps) {
  const [state, dispatch] = useReducer(updateLab, experiment, (id) => ({
    ...initialLab,
    experiment: id,
  }))
  const heading = useRef<HTMLHeadingElement>(null)
  const reported = useRef(false)
  const { connection, storage, step, cancelled, blocked, usedBackup, unavailable } = state
  const copy = playground[lang]
  const ui = benchCopy[lang]
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
  const pin = experiment === 'phone' && state.verification === 'pin'
  const verifying = (experiment === 'hardware' || experiment === 'phone') && step === 1
  const dragActive = experiment === 'hardware' && connection === 'usb' && step === 0
  const addresses = domains.map((domain) =>
    state.fullAddress ? 'https://' + domain + (lang === 'de' ? '/konto' : '/account') : domain,
  )
  const scene = experiment === 'hardware' ? connection : experiment

  useEffect(() => {
    if (!finished) {
      reported.current = false
      return
    }
    if (!reported.current) {
      reported.current = true
      onComplete()
    }
  }, [finished, onComplete])

  function act(action: LabAction) {
    dispatch(action)
    // Some actions replace the active control, so return keyboard focus to its outcome.
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }))
  }

  let title = item.title
  let text = item.text
  let primary = item.action
  let primaryAction: LabAction = { type: 'advance' }
  if (experiment === 'domain' && state.fullAddress) text = finished ? ui.urlResult : ui.urlHelp
  if (pin) {
    text = finished ? ui.pinSuccess : ui.pinPrompt
    primary = ui.pinAction
  }
  if (experiment === 'journey' && step === 2 && unavailable)
    text = storage === 'synced' ? ui.vaultTest : ui.keyTest
  if (cancelled) {
    title = ui.cancelledTitle
    text = ui.cancelledBody
    primary = ui.resume
    primaryAction = { type: 'resume' }
  } else if (blocked) {
    title = ui.blockedTitle
    text = storage === 'synced' ? ui.vaultBlocked : ui.keyBlocked
    primary = ui.backup
    primaryAction = { type: 'backup' }
  } else if (usedBackup) {
    title = ui.backupTitle
    text = ui.backupText
  }
  if (finished) {
    primary = copy.restart
    primaryAction = { type: 'restart' }
  }

  let hotspot: { label: string; position: string } | undefined
  if (!finished && !cancelled) {
    if (experiment === 'hardware') {
      const label =
        step === 0
          ? connection === 'usb'
            ? ui.insert
            : ui.proximity
          : connection === 'usb'
            ? ui.contact
            : ui.phoneCode
      hotspot = { label, position: 'bench-spot-' + connection + '-' + step }
    } else if (experiment === 'phone') {
      hotspot = {
        label: step === 0 ? ui.phoneStart : pin ? ui.phonePin : ui.phoneConfirm,
        position: 'bench-spot-phone',
      }
    }
  }

  return (
    <div className="lab-panel playground-bench" id="lab-content" data-bench={experiment}>
      <div className="lab-drawing bench-stage" data-experiment={experiment}>
        <div className="bench-meter">
          <span>
            {ui.step} {step + 1} {ui.of} {steps.length}
          </span>
          <progress
            value={step + 1}
            max={steps.length}
            aria-label={ui.step}
            aria-valuetext={`${step + 1} ${ui.of} ${steps.length}`}
          />
        </div>
        <div className="lab-svg-wrap">
          <PlaygroundDrawing
            scene={scene}
            step={step}
            synced={storage === 'synced'}
            wrongDomain={state.wrongDomain}
            pin={pin}
            interrupted={cancelled || blocked}
            unavailable={unavailable}
            backup={usedBackup}
            addresses={addresses}
          />
          {hotspot && (
            <button
              type="button"
              className={`bench-hotspot ${hotspot.position} ${dragActive ? 'lab-drag-source' : ''}`}
              aria-label={hotspot.label}
              title={hotspot.label}
              draggable={dragActive}
              onDragStart={
                dragActive
                  ? (e) => {
                      e.dataTransfer.setData('application/x-passkeys-lesson', 'key')
                      e.dataTransfer.effectAllowed = 'move'
                    }
                  : undefined
              }
              onClick={() => act({ type: 'advance' })}
            />
          )}
          {dragActive && (
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
                  act({ type: 'advance' })
              }}
            />
          )}
        </div>
        <small className="lab-caption">
          {dragActive ? copy.drag : hotspot ? ui.touchHint : copy.simulation}
        </small>
      </div>
      <div className="lab-content">
        {experiment === 'hardware' && (
          <Switch
            label={copy.transport}
            choices={['USB', 'NFC']}
            selected={connection === 'usb' ? 0 : 1}
            onSelect={(i) => dispatch({ type: 'option', choice: i === 0 ? 'usb' : 'nfc' })}
          />
        )}
        {experiment === 'journey' && (
          <Switch
            label={copy.kind}
            choices={[copy.synced, copy.bound]}
            selected={storage === 'synced' ? 0 : 1}
            onSelect={(i) => dispatch({ type: 'option', choice: i === 0 ? 'synced' : 'bound' })}
          />
        )}
        <div className="bench-instructions" aria-live="polite" aria-atomic="true">
          <h3 ref={heading} tabIndex={-1}>
            {title}
          </h3>
          <p>{text}</p>
          {experiment === 'domain' && state.wrongDomain && (
            <p className="lab-feedback">{copy.wrong}</p>
          )}
        </div>
        {experiment === 'phone' && verifying && !cancelled && (
          <Switch
            label={ui.sense}
            choices={[ui.fingerprint, ui.pin]}
            selected={pin ? 1 : 0}
            onSelect={(i) =>
              dispatch({ type: 'verification', method: i === 0 ? 'fingerprint' : 'pin' })
            }
          />
        )}
        {experiment === 'journey' && step === 2 && (
          <Switch
            label={ui.condition}
            choices={
              storage === 'synced' ? [ui.vaultReady, ui.vaultLocked] : [ui.keyReady, ui.keyMissing]
            }
            selected={unavailable ? 1 : 0}
            onSelect={(i) => dispatch({ type: 'availability', unavailable: i === 1 })}
          />
        )}
        {experiment === 'domain' && !finished ? (
          <>
            <Switch
              label={ui.addressMode}
              choices={[ui.host, ui.url]}
              selected={state.fullAddress ? 1 : 0}
              onSelect={(i) => dispatch({ type: 'addresses', full: i === 1 })}
            />
            <div className="lab-domain-choices" role="group" aria-label={ui.domainChoices}>
              {domains.map((domain, i) => (
                <button
                  type="button"
                  className="lesson-secondary"
                  key={domain}
                  onClick={() => act({ type: 'domain', address: domain })}
                >
                  <Globe size={16} />
                  <span>{addresses[i]}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="bench-actions">
            <button type="button" className="lesson-action" onClick={() => act(primaryAction)}>
              {primary}
              {finished ? <RotateCcw size={16} /> : <ArrowRight size={16} />}
            </button>
            {verifying && !cancelled && (
              <button
                type="button"
                className="bench-cancel"
                onClick={() => act({ type: 'cancel' })}
              >
                {ui.cancel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
