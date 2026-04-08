import { useState, useCallback } from 'react';
import { kochiCityTowns } from './data/kochiCity';
import { pickRandomTowns, gradeAnswer } from './utils/quiz';
import type { Town, Oomachi } from './types';
import type { Answer, GradeResult } from './utils/quiz';
import './App.css';

const OOMACHI_LIST: Oomachi[] = [
  '下知', '五台山', '高須', '大津', '介良', '三里', '初月', '鏡',
  '朝倉', '旭街', '鴨田', '潮江', '長浜', '御畳瀬', '浦戸', '春野',
  '秦', '土佐山', '布師田', '一宮', '南街', '北街', '江ノ口', '上街',
  '高知街', '小高坂',
];

const QUIZ_COUNT = 20;

type QuizItemState = {
  town: Town;
  answer: Answer;
  result: GradeResult | null;
};

type QuizItemProps = {
  index: number;
  state: QuizItemState;
  graded: boolean;
  onChange: (answer: Answer) => void;
};

function QuizItem({ index, state, graded, onChange }: QuizItemProps) {
  const { town, answer, result } = state;

  const readingStatus = graded && result ? (result.reading ? 'correct' : 'incorrect') : '';
  const oomachiStatus = graded && result ? (result.oomachi ? 'correct' : 'incorrect') : '';

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
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {graded && result && !result.oomachi && (
          <span className="correct-answer">正解: {town.oomachi}</span>
        )}
      </div>
    </div>
  );
}

function initQuiz(): QuizItemState[] {
  return pickRandomTowns(kochiCityTowns, QUIZ_COUNT).map((town) => ({
    town,
    answer: { reading: '', oomachi: '' as Oomachi },
    result: null,
  }));
}

export default function App() {
  const [items, setItems] = useState<QuizItemState[]>(initQuiz);
  const [graded, setGraded] = useState(false);

  const handleChange = useCallback((index: number, answer: Answer) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, answer } : item))
    );
  }, []);

  const handleGrade = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        result: gradeAnswer(item.town, item.answer),
      }))
    );
    setGraded(true);
  };

  const handleReset = () => {
    setItems(initQuiz());
    setGraded(false);
  };

  const score = graded
    ? items.filter((item) => item.result?.reading && item.result?.oomachi).length
    : null;

  return (
    <div className="app">
      <h1>高知市 町名テスト</h1>
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
          <button className="btn-grade" onClick={handleGrade}>採点する</button>
        ) : (
          <button className="btn-reset" onClick={handleReset}>もう一度</button>
        )}
      </div>
    </div>
  );
}
