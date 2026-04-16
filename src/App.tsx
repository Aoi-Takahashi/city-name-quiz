import { useState, useCallback } from 'react'
import { pickRandomTowns } from './utils/pickRandomTowns'
import { gradeAnswer } from './utils/gradeAnswer'
import type { Oomachi, Answer } from './types'
import { QuizItem } from './components/QuizItem'
import type { QuizItemState } from './components/QuizItem'
import { KOCHI_CITY_LIST, QUIZ_COUNT } from './constants'
import './App.css'

function initQuiz(): QuizItemState[] {
  return pickRandomTowns(KOCHI_CITY_LIST, QUIZ_COUNT).map((town) => ({
    town,
    answer: { reading: '', oomachi: '' as Oomachi },
    result: null,
  }))
}

export default function App() {
  const [items, setItems] = useState<QuizItemState[]>(initQuiz)
  const [graded, setGraded] = useState(false)

  const handleChange = useCallback((index: number, answer: Answer) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, answer } : item)))
  }, [])

  const handleGrade = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        result: gradeAnswer(item.town, item.answer),
      })),
    )
    setGraded(true)
  }

  const handleReset = () => {
    setItems(initQuiz())
    setGraded(false)
  }

  const score = graded
    ? items.filter((item) => item.result?.reading && item.result?.oomachi).length
    : null

  return (
    <div className="app">
      <h1>高知市 町名クイズ</h1>
      <p className="instruction">以下の町名の読み方と、町名が属する大街を解答しなさい。</p>

      <div className="quiz-list">
        {items.map((item, i) => (
          <QuizItem
            key={item.town.name}
            index={i}
            state={item}
            graded={graded}
            onChange={(answer) => handleChange(i, answer)}
          />
        ))}
      </div>

      {graded && score !== null && (
        <div className="score">
          得点: {score} / {items.length}
        </div>
      )}

      <div className="actions">
        {!graded ? (
          <button className="btn-grade" onClick={handleGrade}>
            採点する
          </button>
        ) : (
          <button className="btn-reset" onClick={handleReset}>
            もう一度
          </button>
        )}
      </div>
    </div>
  )
}
