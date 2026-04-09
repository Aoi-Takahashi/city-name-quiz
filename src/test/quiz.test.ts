import { describe, it, expect } from 'vitest'
import { pickRandomTowns } from '../utils/quiz'
import { gradeAnswer } from '../utils/quiz'
import type { Town } from '../types'

const sampleTowns: Town[] = Array.from({ length: 30 }, (_, i) => ({
  name: `町名${i}`,
  reading: `まちめい${i}`,
  oomachi: '上街',
}))

describe('pickRandomTowns', () => {
  it('20件を返す', () => {
    const result = pickRandomTowns(sampleTowns, 20)
    expect(result).toHaveLength(20)
  })

  it('重複なく返す', () => {
    const result = pickRandomTowns(sampleTowns, 20)
    const names = result.map((t) => t.name)
    expect(new Set(names).size).toBe(20)
  })

  it('元のデータに含まれる町名のみ返す', () => {
    const result = pickRandomTowns(sampleTowns, 20)
    const sourceNames = new Set(sampleTowns.map((t) => t.name))
    result.forEach((t) => expect(sourceNames.has(t.name)).toBe(true))
  })

  it('件数がデータ件数より多い場合は全件返す', () => {
    const small = sampleTowns.slice(0, 5)
    const result = pickRandomTowns(small, 20)
    expect(result).toHaveLength(5)
  })
})

describe('gradeAnswer', () => {
  const town: Town = { name: '唐人町', reading: 'とうじんまち', oomachi: '高知街' }

  it('読み方・大街ともに正解', () => {
    const result = gradeAnswer(town, { reading: 'とうじんまち', oomachi: '高知街' })
    expect(result.reading).toBe(true)
    expect(result.oomachi).toBe(true)
  })

  it('読み方のみ不正解', () => {
    const result = gradeAnswer(town, { reading: 'まちがい', oomachi: '高知街' })
    expect(result.reading).toBe(false)
    expect(result.oomachi).toBe(true)
  })

  it('大街のみ不正解', () => {
    const result = gradeAnswer(town, { reading: 'とうじんまち', oomachi: '上街' })
    expect(result.reading).toBe(true)
    expect(result.oomachi).toBe(false)
  })

  it('両方不正解', () => {
    const result = gradeAnswer(town, { reading: 'まちがい', oomachi: '上街' })
    expect(result.reading).toBe(false)
    expect(result.oomachi).toBe(false)
  })
})
