import { useId, useMemo } from 'react'
import { Activity, Check, Circle, CircleSlash, PenLine, Unplug } from 'lucide-react'
import { messageTracePaths, signatureTracePaths, plotWidth as width, plotHeight as height } from '../../lib/signatureTrace'
import './signature-scope.css'

type Phase = 'ready' | 'signed' | 'verified' | 'changed' | 'blocked'

interface SignatureScopeProps {
  lang: 'de' | 'en'
  phase: Phase
  message: string
  challenge: string
  signature: string
}

const words = {
  de: {
    title: 'Oszilloskop', note: 'Illustration der Demo-Daten', input: 'Nachricht + Challenge',
    signature: 'Signaturdaten', ready: 'Bereit', signed: 'Signiert', verified: 'Gültig',
    changed: 'Prüfung fehlgeschlagen', blocked: 'Nicht verfügbar',
  },
  en: {
    title: 'Oscilloscope', note: 'Illustration of demo data', input: 'Message + challenge',
    signature: 'Signature data', ready: 'Ready', signed: 'Signed', verified: 'Verified',
    changed: 'Verification failed', blocked: 'Unavailable',
  },
} as const

const phaseIcon = { ready: Circle, signed: PenLine, verified: Check, changed: CircleSlash, blocked: Unplug }

const xMarks = Array.from({ length: 39 }, (_, i) => 18 + i * 18)
const yMarks = Array.from({ length: 17 }, (_, i) => 30 + i * 18)

function Graticule({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id + '-grid'} width="36" height="36" patternUnits="userSpaceOnUse" x="0" y="12">
          <path d="M36 0H0V36" fill="none" className="signature-scope-grid-line" />
          <circle cx="18" cy="18" r=".8" className="signature-scope-grid-dot" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${id}-grid)`} />
      <g fill="none" className="signature-scope-axis">
        <path d="M0 174H720M360 0V348" />
        {xMarks.map(x => <path key={x} d={`M${x} 170v8`} />)}
        {yMarks.map(y => <path key={y} d={`M356 ${y}h8`} />)}
      </g>
      <path className="signature-scope-edge" fill="none"
        d="M12 29V12h17m662 0h17v17m0 290v17h-17m-662 0H12v-17" />
    </>
  )
}

export function SignatureScope({ lang, phase, message, challenge, signature }: SignatureScopeProps) {
  const id = useId()
  const copy = words[lang]
  const StatusIcon = phaseIcon[phase]
  const messagePaths = useMemo(
    () => messageTracePaths(message, challenge),
    [message, challenge],
  )
  const signaturePaths = useMemo(
    () => signatureTracePaths(signature),
    [signature],
  )
  const showSignature = signaturePaths.length > 0 && phase !== 'ready' && phase !== 'blocked'

  return (
    <figure className="signature-scope" data-phase={phase} aria-labelledby={id + '-title'} aria-describedby={id + '-note'}>
      <figcaption className="signature-scope-panel">
        <span id={id + '-title'} className="signature-scope-name">
          <Activity size={19} strokeWidth={1.65} aria-hidden="true" />{copy.title}
        </span>
        <span className="signature-scope-status">
          <StatusIcon size={13} strokeWidth={2.2} aria-hidden="true" />{copy[phase]}
        </span>
      </figcaption>
      <div className="signature-scope-window">
        <svg className="signature-scope-plot" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
          <Graticule id={id} />
          <g className="signature-scope-ribbon" fill="none" strokeLinejoin="round">
            {messagePaths.map((d, i) => <path key={i} d={d} data-accent={i % 5 === 0} />)}
          </g>
          {showSignature && (
            <g className="signature-scope-overlay" fill="none" strokeLinejoin="round">
              {signaturePaths.map((d, i) => <path key={i} d={d} data-center={i === 1} />)}
            </g>
          )}
          {phase !== 'ready' && phase !== 'blocked' && (
            <g key={phase + signature + challenge} className="signature-scope-sweep">
              <path d="M1 1v346" stroke="currentColor" strokeWidth="1.3" />
              <path d="M-4 5 1 12 6 5Z" fill="currentColor" />
            </g>
          )}
        </svg>
      </div>
      <div className="signature-scope-foot">
        <div className="signature-scope-legend">
          <span><i aria-hidden="true" />{copy.input}</span>
          {showSignature && <span><i className="signature-scope-secondary" aria-hidden="true" />{copy.signature}</span>}
        </div>
        <span className="signature-scope-note" id={id + '-note'}>{copy.note}</span>
      </div>
    </figure>
  )
}
