import type { DemoLanguage } from '../../content/discovery'
import { discovery } from '../../content/discovery'

const ink = '#24483e'
const mint = '#a7d9b5'
const lavender = '#bcb1e0'
const paper = '#fffdf3'
const brass = '#f2ce82'

function KeyMark({ color = mint }: { color?: string }) {
  return <g stroke={ink} strokeWidth="2.2" strokeLinejoin="round">
    <path d="M-7-12a12 12 0 1 0 8 21l8 8h8v-6h-5v-5l-5-5a12 12 0 0 0-14-13Z" fill={color} />
    <circle cx="-5" cy="-3" r="3.1" fill={paper} />
    <path d="m5 5 8 8" fill="none" strokeWidth="1" />
  </g>
}

function Check() {
  return <g stroke={ink} strokeWidth="2" strokeLinejoin="round" fill={brass}>
    <circle r="16" />
    <path className="lesson-draw-check" pathLength="1" d="m-7 0 5 5L8-5" fill="none" strokeWidth="3" strokeLinecap="round" />
  </g>
}

function Fingerprint() {
  return <g fill="none" strokeLinecap="round">
    <path d="M-19-11v-8h8m22 0h8v8m0 21v8h-8m-22 0h-8v-8" stroke="#638a75" strokeWidth="1.2" />
    <g className="lesson-fingerprint" stroke={ink} strokeWidth="1.8">
      <path d="M-13 1c0-18 25-18 26 0M-13 7c2-4 0-9 3-13 7-9 20-5 21 7m-20 10c4-5 0-12 4-16 6-6 13-2 13 6 0 4 1 7 3 9m-15 5c5-6 1-13 5-16 3-2 5 0 5 3 0 5 0 8 3 12M0 17c2-4 3-9 2-14" />
    </g>
  </g>
}

function Phone({ ok = false, fingerprint = false, pin = false }: { ok?: boolean; fingerprint?: boolean; pin?: boolean }) {
  return <g stroke={ink} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="-29" y="-52" width="62" height="111" rx="12" fill="#79a38b" />
    <rect x="-32" y="-55" width="61" height="111" rx="12" fill={ink} />
    <rect x="-28" y="-51" width="53" height="103" rx="8" fill="#d1e6cf" strokeWidth="1" />
    <path d="M-26-41q20 3 38-5m-37 50q19 5 48-9" fill="none" stroke="#e7f2dd" strokeWidth="5" />
    <path d="M-10-46H5" strokeWidth="2" /><circle cx="9" cy="-46" r="1.1" fill={ink} stroke="none" />
    <g transform="translate(-1 1)">
      <rect x="-23" y="-23" width="46" height="51" rx="6" fill={paper} stroke="#698b76" strokeWidth="1" />
      {ok ? <Check /> : pin ? <g fill={ink} stroke="none">
        {[-10,0,10].flatMap(x => [-8,2,12].map(y => <circle key={x + ':' + y} cx={x} cy={y} r="2.2"/>))}
      </g> : fingerprint ? <Fingerprint /> : <KeyMark color={mint} />}
    </g>
    <path d="M-9 45H7" strokeWidth="2" />
    <path d="M-33-22v10M-33-7v6M30-16v15" strokeWidth="1.6" />
  </g>
}

function Laptop({ ok = false }: { ok?: boolean }) {
  return <g stroke={ink} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
    <rect x="-52" y="-42" width="108" height="77" rx="6" fill="#9388b7" />
    <rect x="-55" y="-44" width="108" height="78" rx="6" fill={lavender} />
    <rect x="-49" y="-37" width="96" height="63" rx="2.2" fill={paper} strokeWidth="1.5" />
    <circle cx="-1" cy="-40.5" r="1.1" fill={ink} stroke="none" />
    <path d="M-47-27h92" stroke="#c5bdce" strokeWidth="1" />
    <path d="M-43-32h2m3 0h2m3 0h2" strokeWidth="1.6" />
    <g transform="translate(-2 -1)">{ok ? <Check /> : <KeyMark color={lavender} />}</g>
    <path d="M-55 32H54l18 13v3c-3 3-5 4-11 4H-61q-8 0-11-4v-3Z" fill="#998dbb" />
    <path d="M-55 32H54l18 13H-72Z" fill="#d8d0e8" />
    <g stroke="#6c6580" strokeWidth="1">
      <path d="M-43 35h28m33 0h26m-39 0H1m-48 3h25m44 0h26" strokeDasharray="4 2" />
      <path d="m-10 39-2 3h23l-2-3Z" fill="#bcb1cf" />
    </g>
    <path d="M-63 48h8" strokeWidth="2" />
  </g>
}

function HardwareKey({ ok = false }: { ok?: boolean }) {
  return <g stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
    <path d="M5-11h28v22H5z" fill="#c3ceca" />
    <path d="M9-8h23" stroke="#fffdf5" strokeWidth="2" />
    <path d="M18-5h6m-6 9h6" strokeWidth="3" />
    <rect x="-46" y="-17" width="60" height="39" rx="14" fill="#659e83" />
    <rect x="-47" y="-20" width="60" height="37" rx="14" fill={mint} />
    <circle cx="-36" cy="-2" r="3.5" fill={paper} />
    <circle cx="-7" cy="-2" r="11" fill={ok ? '#f7c459' : brass} />
    <circle cx="-7" cy="-2" r="8" stroke="#8b6829" strokeWidth="1" fill="none" />
    <path d="M-10 2c1-1 0-7 3-7s1 5 4 6" fill="none" strokeWidth="1.5" strokeLinecap="round" />
  </g>
}

function Site({ ok = false, registered = true }: { ok?: boolean; registered?: boolean }) {
  return <g stroke={ink} strokeWidth="2.3" strokeLinejoin="round">
    <rect x="-51" y="-35" width="107" height="78" rx="6" fill="#b2aaaa" />
    <rect x="-55" y="-39" width="108" height="79" rx="6" fill={paper} />
    <path d="M-55-24h108" />
    <path d="M-47-31h1m6 0h1m6 0h1" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M-45-17h26m-26 7h14" stroke="#a0ab9f" strokeWidth="1.3" />
    <g transform="translate(9 9)">{ok ? <Check /> : registered ? <KeyMark color={lavender} /> :
      <rect x="-15" y="-12" width="30" height="25" rx="4" strokeDasharray="3 3" strokeWidth="1.4" fill="none" />}</g>
  </g>
}

type TransferKind = 'public' | 'challenge' | 'signature' | 'sync'

function Transfer({ kind }: { kind: TransferKind }) {
  const reverse = kind === 'challenge'
  const colors = { public: lavender, challenge: brass, signature: paper, sync: mint }
  return <g stroke={ink} strokeLinecap="round" strokeLinejoin="round" fill="none">
    <path d="M123 89C150 70 208 70 234 89" stroke="#698572" strokeWidth="1.6" strokeDasharray="3 5" />
    <path d={reverse ? 'm124 81-3 9 10-1' : 'm226 89 10 2-3-10'} strokeWidth="2" />
    <g className={'lesson-parcel' + (reverse ? ' lesson-parcel-back' : '')}>
      <rect x="-12" y="-10" width="24" height="20" rx="5" strokeWidth="1.6" fill={colors[kind]} />
      {kind === 'public' && <g transform="scale(.4)"><KeyMark color={paper} /></g>}
      {kind === 'challenge' && <path d="M-7-3h2m3 0h7m-12 6h5m3 0h4" strokeWidth="2" />}
      {kind === 'signature' && <path d="M-8 4q3-5 6-8c3-2 0 8 2 7l3-3q-1 5 5 1" strokeWidth="1.7" />}
      {kind === 'sync' && <path d="m-6-3 10 0-2-2m4 8H-4l2 2" strokeWidth="1.6" />}
    </g>
  </g>
}

export function CryptoDiagram({ lang, step }: { lang: DemoLanguage; step: number }) {
  const copy = discovery[lang]
  const labels = [copy.pair, copy.publicKey, copy.privateKey, copy.challenge, copy.signature, copy.confirmed]
  const transfers: Partial<Record<number, TransferKind>> = { 1: 'public', 3: 'challenge', 4: 'signature' }
  const transfer = transfers[step]
  return <svg viewBox="0 0 380 190" className="lesson-art" aria-hidden="true">
    <ellipse cx="84" cy="143" rx="45" ry="4" fill="#c0d3b3" /><ellipse cx="294" cy="139" rx="63" ry="4" fill="#c0d3b3" />
    {transfer && <Transfer key={step} kind={transfer} />}
    <g transform="translate(84 83) rotate(-4)"><Phone fingerprint={step === 4} /></g>
    <g transform="translate(294 89)"><Site ok={step === 5} registered={step > 0} /></g>
    {step === 0 && <g transform="translate(132 72) rotate(7) scale(.77)"><KeyMark color={lavender} /></g>}
    {step === 2 && <g transform="translate(117 108)" stroke={ink} strokeWidth="1.7">
      <path d="M-12-10 0-14l12 4v11c-1 6-7 10-12 13C-6 11-11 7-12 1Z" fill={brass} />
      <path d="m-5 0 4 4 7-8" fill="none" strokeLinecap="round" />
    </g>}
    <g fontSize="12" textAnchor="middle" fill={ink} fontWeight="680">
      <text x="84" y="165">{copy.device}</text><text x="294" y="165">{copy.service}</text>
      <text x="183" y="34" fontSize="11">{labels[step]}</text>
    </g>
  </svg>
}

function AddressCard({ x, y, address, result }: { x: number; y: number; address: string; result?: 'matched' | 'unrelated' }) {
  return <g transform={'translate(' + x + ' ' + y + ')'} stroke={ink} strokeLinejoin="round">
    <rect x="3" y="4" width="194" height="52" rx="8" fill="#ccbda2" strokeWidth="1.5" />
    <rect width="194" height="52" rx="8" fill={paper} strokeWidth="2" />
    <path d="M1 13h192" strokeWidth="1.3" />
    <path d="M10 7h1m5 0h1m5 0h1" strokeLinecap="round" strokeWidth="2.3" />
    <text x="12" y="37" fill={ink} stroke="none" fontSize={address.startsWith('https:') ? 9 : 12.5} fontWeight="710">{address}</text>
    {result && <g transform="translate(173 32) scale(.66)">{result === 'matched' ? <Check /> :
      <g strokeWidth="2" strokeLinecap="round"><circle r="14" fill="#f6dfbb" /><path d="m-4-4 8 8m0-8-8 8" /></g>}</g>}
  </g>
}

type Scene = 'usb' | 'nfc' | 'phone' | 'domain' | 'journey'

export function PlaygroundDrawing({ scene, step, synced = true, wrongDomain = false,
  pin = false, interrupted = false, unavailable = false, backup = false,
  addresses = ['atelier-help.example', 'atelier.example'] }:
  { scene: Scene; step: number; synced?: boolean; wrongDomain?: boolean; pin?: boolean;
    interrupted?: boolean; unavailable?: boolean; backup?: boolean; addresses?: string[] }) {
  return <svg className="lesson-art lab-art" viewBox="0 0 380 190" aria-hidden="true">
    {scene !== 'domain' && <ellipse cx="195" cy="158" rx={scene === 'phone' ? 68 : 130} ry="6" fill="#adbfae" opacity=".52" />}
    {scene === 'usb' && <>
      <g transform="translate(252 96) scale(1.24)"><Laptop ok={step === 2} /></g>
      {step === 0 && <path d="M125 132h33m-5-4 5 4-5 4" fill="none" stroke={ink} strokeDasharray="3 3" strokeWidth="1.5" strokeLinecap="round" />}
      <g className="lab-moving-key" style={{ transform: step ? 'translate(162px, 141px)' : 'translate(83px, 132px)' }}><HardwareKey ok={step === 2} /></g>
    </>}
    {scene === 'nfc' && <>
      <g transform="translate(222 84) rotate(8)"><Phone ok={step === 2} /></g>
      <g className="lab-moving-key" style={{ transform: step ? 'translate(170px, 107px) rotate(-25deg)' : 'translate(105px, 128px) rotate(-25deg)' }}><HardwareKey ok={step === 2} /></g>
      {step > 0 && <g className="lab-nfc-field" fill="none" stroke={ink} strokeWidth="2.3" strokeLinecap="round"><path d="M169 67q8 1 10 8m-9-15q13 2 16 13" /></g>}
    </>}
    {scene === 'phone' && <g transform="translate(190 91) rotate(-7) scale(1.22)"><Phone ok={step === 2} fingerprint={step === 1 && !interrupted} pin={step === 1 && pin && !interrupted} /></g>}
    {scene === 'domain' && <>
      <AddressCard x={122} y={34} address={addresses[0]} result={wrongDomain || step ? 'unrelated' : undefined} />
      <AddressCard x={62} y={104} address={addresses[1]} result={step ? 'matched' : undefined} />
    </>}
    {scene === 'journey' && <>
      <g transform="translate(285 99)">{step < 2 ? <Site registered={step > 0} /> : <Laptop ok={step === 3} />}</g>
      {synced ? <g transform="translate(85 89)" opacity={unavailable ? .43 : 1}><Phone /></g> :
        <g className="lab-moving-key" opacity={unavailable ? .38 : 1} style={{ transform: step === 3 && !backup ? 'translate(213px, 133px)' : 'translate(84px, 91px)' }}>
          <HardwareKey ok={step === 3} />
        </g>}
      {step === 1 && <Transfer kind="public" />}
      {step === 2 && synced && !unavailable && <Transfer kind="sync" />}
      {backup && <g transform="translate(213 133) rotate(-8)"><HardwareKey ok/><path d="M-22-18v33" stroke="#825297" strokeWidth="5"/></g>}
    </>}
    {interrupted && <g transform="translate(201 72)" stroke="#694c2d" strokeWidth="2" strokeLinecap="round">
      <circle r="15" fill="#f6dfb6"/><path d="m-4-4 8 8m-8 0 8-8"/>
    </g>}
  </svg>
}
