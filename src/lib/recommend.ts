export type Platform = 'apple' | 'google' | 'windows' | 'mixed'
export type Recommendation = Exclude<Platform, 'mixed'> | 'hardware' | 'manager'

export interface Answers {
  platform: Platform
  usesManager: boolean
  prefersHardware: boolean
}

export function recommend({ platform, usesManager, prefersHardware }: Answers): Recommendation {
  if (prefersHardware) return 'hardware'
  if (usesManager || platform === 'mixed') return 'manager'
  return platform
}
