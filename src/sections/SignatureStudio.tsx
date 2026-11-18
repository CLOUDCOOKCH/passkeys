import { useEffect, useRef, useState } from 'react'
import { Check, CircleAlert, Download, PenLine, RotateCcw, Shuffle, ShieldCheck } from 'lucide-react'
import { SignatureScope } from '../components/animations/SignatureScope'
import { saveSignaturePrint } from '../lib/exportSignaturePrint'
import { studioCopy } from '../content/signatureStudio'
import type { Lang } from '../i18n/home'
import { freshChallenge, generateStudioKeys, hex, signPayload, verifyPayload, type StudioPayload } from '../lib/signatureStudio'

type Phase = 'ready' | 'signed' | 'verified' | 'changed' | 'blocked'
type Busy = 'signing' | 'checking' | null

interface SignedSample extends StudioPayload {
  readonly bytes: ArrayBuffer
  readonly hex: string
}

function makeChallenge() {
  try {
    return globalThis.crypto?.subtle ? freshChallenge() : ''
  } catch {
    return ''
  }
}

const challengeId = (value: string) => value.slice(0, 8).toUpperCase()

export function SignatureStudio({ lang, onComplete }: { lang: Lang; onComplete: () => void }) {
  const t = studioCopy[lang]
  const [message, setMessage] = useState<string>(t.demo)
  const [challenge, setChallenge] = useState(makeChallenge)
  const [sample, setSample] = useState<SignedSample | null>(null)
  const [phase, setPhase] = useState<Phase>(challenge ? 'ready' : 'blocked')
  const [busy, setBusy] = useState<Busy>(null)
  const keys = useRef<CryptoKeyPair | null>(null)
  // Ignore late crypto completions after an edit, another action, reset or unmount.
  const revision = useRef(0)
  useEffect(() => () => { revision.current += 1; keys.current = null }, [])

  function reset() {
    revision.current += 1
    keys.current = null
    const next = makeChallenge()
    setChallenge(next)
    setMessage(t.demo)
    setPhase(next ? 'ready' : 'blocked')
    setSample(null)
    setBusy(null)
  }

  async function check(current: StudioPayload) {
    const request = ++revision.current
    const pair = keys.current
    if (!sample || !pair) {
      setBusy(null)
      return
    }
    setBusy('checking')
    try {
      const valid = await verifyPayload(pair.publicKey, sample.bytes, current)
      if (request !== revision.current) return
      setPhase(valid ? 'verified' : 'changed')
      if (valid) onComplete()
    } catch {
      if (request === revision.current) setPhase('blocked')
    } finally {
      if (request === revision.current) setBusy(null)
    }
  }

  async function sign() {
    const request = ++revision.current
    const payload = { message, challenge }
    setBusy('signing')
    try {
      const pair = keys.current ?? await generateStudioKeys()
      if (request !== revision.current) return
      const bytes = await signPayload(pair.privateKey, payload)
      if (request !== revision.current) return
      keys.current = pair
      setSample({ ...payload, bytes, hex: hex(bytes) })
      setPhase('signed')
    } catch {
      if (request === revision.current) setPhase('blocked')
    } finally {
      if (request === revision.current) setBusy(null)
    }
  }

  function changeMessage(next: string) {
    setMessage(next)
    void check({ message: next, challenge })
  }

  function changeChallenge() {
    const next = makeChallenge()
    if (!next) {
      revision.current += 1
      setPhase('blocked')
      setBusy(null)
      return
    }
    setChallenge(next)
    void check({ message, challenge: next })
  }

  const blocked = phase === 'blocked'
  const changed = sample && (sample.message !== message || sample.challenge !== challenge)
  const resultIcon = phase === 'verified' ? <ShieldCheck aria-hidden="true" />
    : phase === 'changed' || blocked ? <CircleAlert aria-hidden="true" />
    : phase === 'signed' ? <Check aria-hidden="true" /> : <PenLine aria-hidden="true" />

  return (
    <section id="signature-studio" className="sig-studio" aria-labelledby="sig-title">
      <div className="sig-instrument" data-phase={phase}>
        <div className="sig-screen">
          <SignatureScope lang={lang} phase={phase} message={message} challenge={challenge} signature={sample?.hex ?? ''} />
        </div>
        <div className="sig-console">
          <header className="sig-heading">
            <h3 id="sig-title">{t.title}</h3>
            <p>{t.intro}</p>
          </header>
          <div className="sig-message">
            <label htmlFor="sig-message">{t.message}</label>
            <input id="sig-message" autoComplete="off" maxLength={96} value={message}
              disabled={blocked} onChange={event => changeMessage(event.currentTarget.value)} />
          </div>
          <div className="sig-challenge">
            <span title={t.challengeHint}>{t.challenge} <code>{challenge ? challengeId(challenge) : '—'}</code></span>
            <button type="button" disabled={blocked} onClick={changeChallenge}>
              <Shuffle size={14} aria-hidden="true" />{t.newChallenge}
            </button>
          </div>
          <div className="sig-actions">
            <button className="sig-sign" type="button" disabled={blocked || !message.length || !!busy} onClick={() => void sign()}>
              <PenLine size={16} aria-hidden="true" />{sample ? t.again : t.sign}
            </button>
            <button className="sig-check" type="button" disabled={blocked || !sample || !!busy}
              onClick={() => void check({ message, challenge })}>
              <ShieldCheck size={16} aria-hidden="true" />{t.check}
            </button>
          </div>
          <div className="sig-result" role="status" aria-live="polite" aria-atomic="true" data-phase={phase} aria-busy={!!busy}>
            {resultIcon}<div><strong>{busy ? t[busy] : t[phase]}</strong><p>{t[`${phase}Desc`]}</p></div>
          </div>
          {changed && (
            <dl className="sig-comparison" aria-label={t.compare}>
              <div><dt>{t.signedText}</dt><dd>«{sample.message}» · <code>{challengeId(sample.challenge)}</code></dd></div>
              <div><dt>{t.testText}</dt><dd>«{message}» · <code>{challengeId(challenge)}</code></dd></div>
            </dl>
          )}
          <div className="sig-tools">
            <button type="button" className="sig-reset" onClick={reset}><RotateCcw size={14} aria-hidden="true" />{t.reset}</button>
            {sample && !changed && (phase === 'signed' || phase === 'verified') && (
              <button type="button" className="sig-export" disabled={!!busy}
                onClick={() => saveSignaturePrint({ lang, phase, message, challenge, signature: sample.hex })}>
                <Download size={15} aria-hidden="true" />{t.save}
              </button>
            )}
          </div>
        </div>
      </div>
      <p className="sig-note">{t.note}</p>
    </section>
  )
}
