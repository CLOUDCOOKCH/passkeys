export type StorageMode = 'synced' | 'bound'
export type RecoveryRoute = 'provider' | 'spare' | 'support'
export type RewindFactor = 'storage' | 'spare' | 'provider'
export interface FridaySetup { storage: StorageMode; spare: boolean }
export interface RecoveryRun extends FridaySetup {
  providerAccess: boolean | null
  route: RecoveryRoute
}
export const firstFriday: FridaySetup = { storage: 'bound', spare: false }

export function resolveMonday(run: RecoveryRun) {
  if (run.route === 'support') return 'support-review'
  if (run.route === 'spare') return run.spare ? 'spare-ok' : 'spare-missing'
  if (run.storage === 'bound') return 'phone-only'
  if (run.providerAccess === null) return 'provider-unchecked'
  return run.providerAccess ? 'provider-ok' : 'provider-locked'
}

export function rewindRecovery(run: RecoveryRun, change: RewindFactor): RecoveryRun {
  switch (change) {
    case 'storage': return { ...run, storage: run.storage === 'bound' ? 'synced' : 'bound' }
    case 'spare': return { ...run, spare: !run.spare }
    case 'provider': return { ...run, providerAccess: !run.providerAccess }
  }
}
