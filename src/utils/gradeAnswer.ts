import type { Town, Answer, GradeResult } from '../types'

export function gradeAnswer(town: Town, answer: Answer): GradeResult {
  return {
    reading: town.reading === answer.reading,
    oomachi: town.oomachi === answer.oomachi,
  }
}
