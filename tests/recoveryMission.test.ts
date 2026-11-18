import { describe, expect, it } from 'vitest'
import { resolveMonday, rewindRecovery, type RecoveryRun } from '../src/lib/recoveryMission'

const base: RecoveryRun = { storage: 'synced', spare: false, providerAccess: false, route: 'provider' }

describe('Friday preparation, Monday recovery', () => {
  it('requires independent provider access before synced sign-in succeeds', () => {
    expect(resolveMonday({ ...base, providerAccess: null })).toBe('provider-unchecked')
    expect(resolveMonday(base)).toBe('provider-locked')
    const retry = rewindRecovery(base, 'provider')
    expect(retry).toEqual({ ...base, providerAccess: true })
    expect(resolveMonday(retry)).toBe('provider-ok')
    expect(resolveMonday(rewindRecovery(retry, 'storage'))).toBe('phone-only')
  })

  it.each(['bound', 'synced'] as const)('accepts a spare only when it was previously registered with %s storage', storage => {
    const run: RecoveryRun = { ...base, storage, route: 'spare' }
    expect(resolveMonday(run)).toBe('spare-missing')
    const retry = rewindRecovery(run, 'spare')
    expect(retry).toEqual({ ...run, spare: true })
    expect(resolveMonday(retry)).toBe('spare-ok')
  })

  it('keeps support as a human review, even if a registered alternative exists', () => {
    const run: RecoveryRun = { ...base, spare: true, providerAccess: true, route: 'support' }
    expect(resolveMonday(run)).toBe('support-review')
    expect(resolveMonday(rewindRecovery(run, 'spare'))).toBe('support-review')
  })
})
