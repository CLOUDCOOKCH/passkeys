export type Experiment = 'hardware' | 'phone' | 'domain' | 'journey'
export type LabChoice = 'usb' | 'nfc' | 'synced' | 'bound'

export interface LabState {
  experiment: Experiment
  connection: 'usb' | 'nfc'
  storage: 'synced' | 'bound'
  step: number
  wrongDomain: boolean
}

export type LabAction =
  | { type: 'choose'; experiment: Experiment }
  | { type: 'option'; choice: LabChoice }
  | { type: 'domain'; address: 'atelier.example' | 'atelier-help.example' }
  | { type: 'advance' | 'restart' }

export const initialLab: LabState = {
  experiment: 'hardware',
  connection: 'usb',
  storage: 'synced',
  step: 0,
  wrongDomain: false,
}

export function updateLab(state: LabState, action: LabAction): LabState {
  switch (action.type) {
    case 'choose':
      return { ...state, experiment: action.experiment, step: 0, wrongDomain: false }
    case 'option':
      if (action.choice === 'usb' || action.choice === 'nfc')
        return { ...state, connection: action.choice, step: 0 }
      return { ...state, storage: action.choice, step: 0 }
    case 'advance':
      if (state.experiment === 'domain') return state
      return { ...state, step: Math.min(state.step + 1, state.experiment === 'journey' ? 3 : 2) }
    case 'domain':
      if (state.experiment !== 'domain' || state.step !== 0) return state
      return action.address === 'atelier.example'
        ? { ...state, wrongDomain: false, step: 1 }
        : { ...state, wrongDomain: true }
    case 'restart':
      return { ...state, step: 0, wrongDomain: false }
  }
}
