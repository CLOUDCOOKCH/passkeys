export type Experiment = 'hardware' | 'phone' | 'domain' | 'journey'
export type LabChoice = 'usb' | 'nfc' | 'synced' | 'bound'
export type LabDomain = 'atelier.example' | 'atelier-help.example'

export interface LabState {
  experiment: Experiment
  connection: 'usb' | 'nfc'
  storage: 'synced' | 'bound'
  step: number
  wrongDomain: boolean
  fullAddress: boolean
  verification: 'fingerprint' | 'pin'
  cancelled: boolean
  unavailable: boolean
  blocked: boolean
  usedBackup: boolean
}

export type LabAction =
  | { type: 'choose'; experiment: Experiment }
  | { type: 'option'; choice: LabChoice }
  | { type: 'domain'; address: LabDomain }
  | { type: 'addresses'; full: boolean }
  | { type: 'verification'; method: LabState['verification'] }
  | { type: 'availability'; unavailable: boolean }
  | { type: 'advance' | 'restart' | 'cancel' | 'resume' | 'backup' }

export const initialLab: LabState = {
  experiment: 'hardware',
  connection: 'usb',
  storage: 'synced',
  step: 0,
  wrongDomain: false,
  fullAddress: false,
  verification: 'fingerprint',
  cancelled: false,
  unavailable: false,
  blocked: false,
  usedBackup: false,
}

const lastStep: Record<Experiment, number> = { hardware: 2, phone: 2, domain: 1, journey: 3 }

export function updateLab(state: LabState, action: LabAction): LabState {
  const atVerification =
    (state.experiment === 'phone' || state.experiment === 'hardware') && state.step === 1
  const atDeviceChange = state.experiment === 'journey' && state.step === 2
  switch (action.type) {
    case 'choose':
      return { ...initialLab, experiment: action.experiment }
    case 'option':
      if (state.experiment === 'hardware' && (action.choice === 'usb' || action.choice === 'nfc'))
        return { ...initialLab, experiment: state.experiment, connection: action.choice }
      if (
        state.experiment === 'journey' &&
        (action.choice === 'synced' || action.choice === 'bound')
      )
        return { ...initialLab, experiment: state.experiment, storage: action.choice }
      return state
    case 'cancel':
    case 'resume':
      return atVerification ? { ...state, cancelled: action.type === 'cancel' } : state
    case 'verification':
      return state.experiment === 'phone' && atVerification && !state.cancelled
        ? { ...state, verification: action.method }
        : state
    case 'availability':
      return atDeviceChange ? { ...state, unavailable: action.unavailable, blocked: false } : state
    case 'backup':
      return atDeviceChange && state.blocked
        ? { ...state, usedBackup: true, blocked: false, step: 3 }
        : state
    case 'advance':
      if (state.experiment === 'domain' || state.cancelled || state.blocked) return state
      if (atDeviceChange && state.unavailable) return { ...state, blocked: true }
      return { ...state, step: Math.min(state.step + 1, lastStep[state.experiment]) }
    case 'addresses':
      return state.experiment === 'domain' && state.step === 0
        ? { ...state, fullAddress: action.full, wrongDomain: false }
        : state
    case 'domain':
      if (state.experiment !== 'domain' || state.step !== 0) return state
      return action.address === 'atelier.example'
        ? { ...state, wrongDomain: false, step: 1 }
        : { ...state, wrongDomain: true }
    case 'restart':
      return {
        ...initialLab,
        experiment: state.experiment,
        connection: state.connection,
        storage: state.storage,
      }
  }
}
