import type { Town, Oomachi } from '../types'

export type Answer = {
  reading: string
  oomachi: Oomachi
}

export type GradeResult = {
  reading: boolean
  oomachi: boolean
}

export function pickRandomTowns(towns: Town[], count: number): Town[] {
  const shuffled = [...towns]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, Math.min(count, towns.length))
}

export function gradeAnswer(town: Town, answer: Answer): GradeResult {
  return {
    reading: town.reading === answer.reading,
    oomachi: town.oomachi === answer.oomachi,
  }
}
