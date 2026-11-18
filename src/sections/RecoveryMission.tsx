import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Cloud, Headphones, KeyRound, Laptop, Rewind, RotateCcw, Smartphone } from 'lucide-react'
import { recoveryCopy } from '../content/recoveryMission'
import type { Lang } from '../i18n/home'
import {
  firstFriday, resolveMonday, rewindRecovery,
  type RecoveryRoute, type RecoveryRun, type RewindFactor,
} from '../lib/recoveryMission'
import './recovery-mission.css'

type Comparison = { before: RecoveryRun; after: RecoveryRun; factor: RewindFactor }

export function RecoveryMission({ lang }: { lang: Lang }) {
  const t = recoveryCopy[lang]
  const [setup, setSetup] = useState(firstFriday)
  const [monday, setMonday] = useState(false)
  const [route, setRoute] = useState<RecoveryRoute | null>(null)
  const [providerAccess, setProviderAccess] = useState<boolean | null>(null)
  const [run, setRun] = useState<RecoveryRun | null>(null)
  const [comparison, setComparison] = useState<Comparison | null>(null)
  const fridayHeading = useRef<HTMLHeadingElement>(null)
  const mondayHeading = useRef<HTMLHeadingElement>(null)
  const reposition = useRef(false)

  useEffect(() => {
    if (reposition.current) {
      const heading = monday ? mondayHeading : fridayHeading
      heading.current?.focus()
      reposition.current = false
    }
  }, [monday])

  function attempt(next: RecoveryRoute) {
    setRoute(next)
    setComparison(null)
    setRun(next === 'provider' && setup.storage === 'synced' && providerAccess === null
      ? null
      : { ...setup, providerAccess, route: next })
  }

  function unlock(access: boolean) {
    setProviderAccess(access)
    setComparison(null)
    setRun({ ...setup, providerAccess: access, route: 'provider' })
  }

  function rewind(factor: RewindFactor) {
    if (!run) return
    const after = rewindRecovery(run, factor)
    setComparison({ before: run, after, factor })
    setRun(after)
    setSetup({ storage: after.storage, spare: after.spare })
    setProviderAccess(after.providerAccess)
  }

  function restart() {
    reposition.current = true
    setMonday(false)
    setSetup(firstFriday)
    setProviderAccess(null)
    setRoute(null)
    setRun(null)
    setComparison(null)
  }

  function factorLabel(item: RecoveryRun, factor: RewindFactor): string {
    if (factor === 'storage') return t[item.storage]
    if (factor === 'provider') return item.providerAccess ? t.confirmAccess : t.lockedAccess
    return item.spare ? t.spareYes : t.spareNo
  }

  const outcome = run && resolveMonday(run)
  const success = outcome === 'provider-ok' || outcome === 'spare-ok'

  return (
    <article id="recovery-mission" className="rm-case" aria-labelledby="rm-title">
      <header className="rm-intro"><h3 id="rm-title">{t.title}</h3><p>{t.intro}</p></header>
      <div className={monday ? 'rm-timeline rm-monday' : 'rm-timeline'}>
        <div className="rm-date"><span>{t.fri}</span><time>17:00</time><Smartphone aria-hidden="true" /></div>
        <div className="rm-page rm-friday">
          {monday ? (
            <div className="rm-receipt">
              <Check size={18} aria-hidden="true" /><div><strong>{t.receipt}</strong><p>{t[setup.storage]} · {setup.spare ? t.spareYes : t.spareNo}</p></div>
            </div>
          ) : (
            <>
              <h4 ref={fridayHeading} tabIndex={-1}>{t.friday}</h4>
              <fieldset><legend>{t.choose}</legend><div className="rm-choices">
                {(['synced', 'bound'] as const).map(value => (
                  <label key={value}><input type="radio" name="rm-storage" value={value} checked={setup.storage === value}
                    onChange={() => setSetup({ ...setup, storage: value })} /><span>{t[value]}</span></label>
                ))}
              </div></fieldset>
              <fieldset><legend>{t.spareQuestion}</legend><div className="rm-choices">
                {([true, false] as const).map(value => (
                  <label key={String(value)}><input type="radio" name="rm-spare" value={value ? 'yes' : 'no'}
                    checked={setup.spare === value} onChange={() => setSetup({ ...setup, spare: value })} /><span>{value ? t.yes : t.no}</span></label>
                ))}
              </div></fieldset>
              <button className="rm-primary" type="button" data-action="friday-login" onClick={() => {
                reposition.current = true
                setMonday(true)
              }}>{t.login}<ArrowRight size={17} aria-hidden="true" /></button>
            </>
          )}
        </div>
        {monday && <>
          <div className="rm-date rm-date-mon"><span>{t.mon}</span><time>08:30</time><Laptop aria-hidden="true" /></div>
          <div className="rm-page">
            <h4 ref={mondayHeading} tabIndex={-1}>{t.monday}</h4><p>{t.borrowed}</p>
            <fieldset><legend>{t.route}</legend><div className="rm-routes">
              {(['provider', 'spare', 'support'] as const).map(id => {
                const Icon = { provider: Cloud, spare: KeyRound, support: Headphones }[id]
                return <button key={id} type="button" data-route={id} aria-pressed={route === id} onClick={() => attempt(id)}>
                  <Icon size={18} aria-hidden="true" />{t[id]}</button>
              })}
            </div></fieldset>
            {route === 'provider' && setup.storage === 'synced' && <fieldset className="rm-provider"><legend>{t.access}</legend>
              <p>{t.providerHint}</p><div className="rm-routes">
                {[true, false].map(value => <button key={String(value)} type="button" data-provider-access={value ? 'yes' : 'no'}
                  aria-pressed={providerAccess === value} onClick={() => unlock(value)}>{value ? t.canAccess : t.cannotAccess}</button>)}
              </div></fieldset>}
            {run && outcome && <>
              <div className="rm-outcome" role="status" data-outcome={outcome} data-success={success}>
                {success ? <Check size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
                <div><strong>{t.results[outcome][0]}</strong><p>{t.results[outcome][1]}</p></div>
              </div>
              {outcome !== 'provider-unchecked' && <div className="rm-rewind">
                <h5><Rewind size={18} aria-hidden="true" />{t.rewind}</h5><p>{t.replay}</p>
                <div className="rm-routes">
                  {run.route === 'provider' && <button type="button" data-rewind="storage" onClick={() => rewind('storage')}>{t.flipStorage}</button>}
                  {run.route === 'provider' && run.storage === 'synced' && <button type="button" data-rewind="provider"
                    onClick={() => rewind('provider')}>{run.providerAccess ? t.lock : t.unlock}</button>}
                  {run.route !== 'provider' && <button type="button" data-rewind="spare" onClick={() => rewind('spare')}>{run.spare ? t.omitSpare : t.addSpare}</button>}
                </div>
              </div>}
            </>}
            {comparison && <section className="rm-comparison" data-comparison aria-live="polite" aria-atomic="true">
              <h5>{t.comparison}</h5>
              <div className="rm-ledger">
                {(['before', 'after'] as const).map(side => {
                  const item = comparison[side]
                  return <div key={side}><strong>{t[side]}</strong><dl>
                    <div><dt>{t.change}</dt><dd>{factorLabel(item, comparison.factor)}</dd></div>
                    <div><dt>{t.sameRoute}</dt><dd>{t[item.route]}</dd></div>
                    <div><dt>{t.result}</dt><dd>{t.results[resolveMonday(item)][0]}</dd></div>
                  </dl></div>
                })}
              </div>
              {run?.route === 'support' && <p>{t.supportNote}</p>}
            </section>}
            <button type="button" className="rm-reset" data-action="restart" onClick={restart}><RotateCcw size={15} aria-hidden="true" />{t.restart}</button>
          </div>
        </>}
      </div>
    </article>
  )
}
