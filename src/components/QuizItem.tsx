import type { Town, Oomachi, Answer, GradeResult } from '../types'
import { OOMACHI_LIST } from '../constants'

export type QuizItemState = {
  town: Town
  answer: Answer
  result: GradeResult | null
}

type QuizItemProps = {
  index: number
  state: QuizItemState
  graded: boolean
  onChange: (answer: Answer) => void
}

export function QuizItem({ index, state, graded, onChange }: QuizItemProps) {
  const { town, answer, result } = state

  const readingStatus = graded && result ? (result.reading ? 'correct' : 'incorrect') : ''
  const oomachiStatus = graded && result ? (result.oomachi ? 'correct' : 'incorrect') : ''

  return (
    <div className="quiz-item">
      <span className="quiz-number">問{index + 1}.</span>
      <span className="town-name">{town.name}</span>

      <div className={`input-group ${readingStatus}`}>
        <input
          type="text"
          placeholder="読み方"
          value={answer.reading}
          disabled={graded}
          onChange={(e) => onChange({ ...answer, reading: e.target.value })}
        />
        {graded && result && !result.reading && (
          <span className="correct-answer">正解: {town.reading}</span>
        )}
      </div>

      <div className={`input-group ${oomachiStatus}`}>
        <select
          value={answer.oomachi}
          disabled={graded}
          onChange={(e) => onChange({ ...answer, oomachi: e.target.value as Oomachi })}
        >
          <option value="">大街を選択</option>
          {OOMACHI_LIST.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {graded && result && !result.oomachi && (
          <span className="correct-answer">正解: {town.oomachi}</span>
        )}
      </div>
    </div>
  )
}
