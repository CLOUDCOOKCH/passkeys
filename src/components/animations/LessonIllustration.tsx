import type { DemoLanguage } from '../../content/discovery'
import { discovery } from '../../content/discovery'

const ink = '#21463e'
const mint = '#a2e5c8'
const lavender = '#c8bfed'
const paper = '#fffdf3'

function KeyMark({ color = mint }: { color?: string }) {
  return (
    <g stroke={ink} strokeWidth="2.6" strokeLinejoin="round">
      <path d="M-7 -12a12 12 0 1 0 8 21l8 8h8v-6h-5v-5l-5-5a12 12 0 0 0-14-13Z" fill={color} />
      <circle cx="-5" cy="-3" r="3" fill={paper} />
    </g>
  )
}

function Phone({ ok = false, fingerprint = false }: { ok?: boolean; fingerprint?: boolean }) {
  return (
    <g stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="-30" y="-53" width="60" height="108" rx="10" fill={ink} />
      <rect x="-27" y="-50" width="54" height="102" rx="8" fill={mint} />
      <path d="M-9 -45H9M-7 45H7" />
      {ok ? (
        <Check />
      ) : fingerprint ? (
        <g fill="none" stroke={ink} strokeWidth="2">
          <path d="M-15 5c0-25 33-25 33-1M-10 10c2-9-1-22 11-22 11 0 13 11 13 18M-5 16c4-7-2-23 6-23s5 13 9 20M1 21c4-7 0-16 2-22" />
        </g>
      ) : (
        <KeyMark color={paper} />
      )}
    </g>
  )
}

function Check() {
  return (
    <g stroke={ink} strokeWidth="2.6" strokeLinejoin="round">
      <circle r="15" fill="#f2e6a6" />
      <path d="m-7 0 5 5L8-5" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Laptop({ ok = false }: { ok?: boolean }) {
  return (
    <g stroke={ink} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <rect x="-53" y="-41" width="106" height="73" rx="6" fill={lavender} />
      <rect x="-47" y="-35" width="94" height="60" rx="2" fill={paper} />
      {ok ? (
        <Check />
      ) : (
        <g transform="translate(0 -4)">
          <KeyMark color={lavender} />
        </g>
      )}
      <path d="M-53 32H53l18 13c-3 3-6 4-11 4H-60c-6 0-10-1-12-4Z" fill="#a297c7" />
      <path d="M-17 35h34" fill="none" />
    </g>
  )
}

function HardwareKey({ ok = false }: { ok?: boolean }) {
  return (
    <g stroke={ink} strokeWidth="3" strokeLinejoin="round">
      <path d="M4-12h29v24H4z" fill="#f1f1e9" />
      <path d="M17-5h6m-6 9h6" />
      <rect x="-46" y="-19" width="59" height="38" rx="14" fill={mint} />
      <circle cx="-34" r="3" fill={ink} />
      <circle cx="-5" r="10" fill={ok ? '#fae492' : paper} />
      <path
        d="M-9 2c0-9 8-9 8-2m-5 5c3-3 0-6 3-7"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  )
}

function Site({ ok = false, registered = true }: { ok?: boolean; registered?: boolean }) {
  return (
    <g stroke={ink} strokeWidth="2.6" strokeLinejoin="round">
      <rect x="-54" y="-38" width="108" height="80" rx="7" fill={paper} />
      <path d="M-54-24H54" />
      <g fill={ink} stroke="none">
        <circle cx="-44" cy="-31" r="1.6" />
        <circle cx="-37" cy="-31" r="1.6" />
        <circle cx="-30" cy="-31" r="1.6" />
      </g>
      <g transform="translate(0 8)">
        {ok ? (
          <Check />
        ) : registered ? (
          <KeyMark color={lavender} />
        ) : (
          <path d="M-17-3H17M-17 6H6" stroke="#88958c" strokeLinecap="round" />
        )}
      </g>
    </g>
  )
}

function Lane({ reverse = false, moving = false }: { reverse?: boolean; moving?: boolean }) {
  return (
    <g
      transform={reverse ? 'translate(380 0) scale(-1 1)' : undefined}
      stroke="#487969"
      strokeWidth="2.3"
      fill="none"
    >
      <path d="M116 103C153 102 181 77 238 94" strokeDasharray="4 5" />
      <path d="m233 87 7 8-10 3" strokeLinecap="round" strokeLinejoin="round" />
      {moving && (
        <circle className="lesson-packet" cx="120" cy="102" r="5" fill="#ffd38f" stroke={ink} />
      )}
    </g>
  )
}

export function CryptoDiagram({ lang, step }: { lang: DemoLanguage; step: number }) {
  const copy = discovery[lang]
  const labels = [
    copy.privateKey,
    copy.publicKey,
    copy.privateKey,
    copy.challenge,
    copy.signature,
    copy.confirmed,
  ]
  return (
    <svg viewBox="0 0 380 190" className="lesson-art" aria-hidden="true">
      <ellipse cx="85" cy="136" rx="48" ry="5" fill="#c5d6bc" />
      <ellipse cx="293" cy="132" rx="60" ry="6" fill="#c5d6bc" />
      {[1, 3, 4].includes(step) && <Lane key={step} moving reverse={step === 3} />}
      <g transform="translate(84 83)">
        <Phone ok={step === 5} fingerprint={step === 4} />
      </g>
      <g transform="translate(293 86)">
        <Site ok={step === 5} registered={step > 0} />
      </g>
      {step === 0 && (
        <g transform="translate(126 75) scale(.7)">
          <KeyMark color={lavender} />
        </g>
      )}
      <g fontFamily="inherit" fontSize="13" textAnchor="middle" fill={ink} fontWeight="650">
        <text x="84" y="163">
          {copy.device}
        </text>
        <text x="293" y="163">
          {copy.service}
        </text>
        <text x="190" y="25" fontSize="11">
          {labels[step]}
        </text>
      </g>
    </svg>
  )
}

type Scene = 'usb' | 'nfc' | 'phone' | 'domain' | 'journey'

export function PlaygroundDrawing({
  scene,
  step,
  synced = true,
}: {
  scene: Scene
  step: number
  synced?: boolean
}) {
  return (
    <svg className="lesson-art lab-art" viewBox="0 0 380 190" aria-hidden="true">
      <ellipse cx="195" cy="153" rx="130" ry="8" fill="#cad9c7" />
      {scene === 'usb' && (
        <>
          <g transform="translate(252 98) scale(1.25)">
            <Laptop ok={step === 2} />
          </g>
          <g
            className="lab-moving-key"
            style={{ transform: 'translate(' + (step ? '161px, 132px)' : '83px, 132px)') }}
          >
            <HardwareKey ok={step === 2} />
          </g>
        </>
      )}
      {scene === 'nfc' && (
        <>
          <g transform="translate(222 84) rotate(8)">
            <Phone ok={step === 2} />
          </g>
          <g
            className="lab-moving-key"
            style={{
              transform: step
                ? 'translate(170px, 107px) rotate(-25deg)'
                : 'translate(105px, 128px) rotate(-25deg)',
            }}
          >
            <HardwareKey ok={step === 2} />
          </g>
          {step > 0 && (
            <g fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round">
              <path d="M169 67q8 1 10 8m-9-15q13 2 16 13" />
            </g>
          )}
        </>
      )}
      {scene === 'phone' && (
        <g transform="translate(190 91) rotate(-7) scale(1.27)">
          <Phone ok={step === 2} fingerprint={step === 1} />
        </g>
      )}
      {scene === 'domain' && (
        <>
          <g transform="translate(131 89) rotate(-5)">
            <Site ok={step === 1} />
          </g>
          <g transform="translate(253 97) rotate(7)">
            <Site />
          </g>
        </>
      )}
      {scene === 'journey' && (
        <>
          <g transform="translate(285 99)">
            {step < 2 ? <Site registered={step > 0} /> : <Laptop ok={step === 3} />}
          </g>
          {synced ? (
            <g transform="translate(86 91)">
              <Phone />
            </g>
          ) : (
            <g
              className="lab-moving-key"
              style={{
                transform: step === 3 ? 'translate(212px, 130px)' : 'translate(86px, 91px)',
              }}
            >
              <HardwareKey ok={step === 3} />
            </g>
          )}
          {(step === 1 || (step === 2 && synced)) && <Lane key={step} moving />}
          {step === 1 && (
            <g transform="translate(168 62) scale(.7)">
              <KeyMark color={lavender} />
            </g>
          )}
        </>
      )}
    </svg>
  )
}
