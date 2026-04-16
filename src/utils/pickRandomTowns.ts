import type { Town } from '../types'

export function pickRandomTowns(towns: Town[], count: number): Town[] {
  const shuffled = [...towns]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, Math.min(count, towns.length))
}
