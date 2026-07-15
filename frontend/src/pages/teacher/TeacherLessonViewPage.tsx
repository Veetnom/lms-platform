import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, CheckSquare } from 'lucide-react'

// ─── Types (копия из MethodistLessonEditorPage) ─────────────────────────────

interface AnswerOption {
  id: string
  text: string
  isCorrect: boolean
}

interface Step {
  id: number
  title: string
  content: string
  options: AnswerOption[]
  points: number
  answerType: 'single' | 'multiple'
}

interface LessonTask {
  id: number
  title: string
  type: 'lecture' | 'assignment'
  steps: Step[]
}

// ─── Mock ─────────────────────────────────────────────────────────────────────

const MOCK_TASKS: LessonTask[] = [
  {
    id: 8,
    title: 'Введение в орфографию',
    type: 'lecture',
    steps: [
      {
        id: 1,
        title: 'Что такое орфография',
        content: '<p>Орфография — раздел лингвистики, изучающий правильное написание слов.</p>',
        options: [],
        points: 0,
        answerType: 'single',
      },
      {
        id: 2,
        title: 'Основные принципы',
        content: '<p>Основные принципы русской орфографии:</p><ul><li>Морфологический</li><li>Фонетический</li><li>Традиционный</li></ul>',
        options: [],
        points: 0,
        answerType: 'single',
      },
    ],
  },
  {
    id: 9,
    title: 'Задание №9',
    type: 'assignment',
    steps: [
      {
        id: 1,
        title: 'Шаг 1',
        content: '<p>Какое слово пишется с <strong>безударной</strong> гласной?</p>',
        options: [
          { id: 'a', text: 'Собака', isCorrect: true },
          { id: 'b', text: 'Стол', isCorrect: false },
          { id: 'c', text: 'Книга', isCorrect: false },
          { id: 'd', text: 'Окно', isCorrect: false },
        ],
        points: 5,
        answerType: 'single',
      },
      {
        id: 2,
        title: 'Шаг 2',
        content: '<p>Выберите все слова с <em>непроверяемой</em> гласной:</p>',
        options: [
          { id: 'e', text: 'Молоко', isCorrect: true },
          { id: 'f', text: 'Берёза', isCorrect: true },
          { id: 'g', text: 'Трава', isCorrect: false },
        ],
        points: 10,
        answerType: 'multiple',
      },
    ],
  },
  {
    id: 10,
    title: 'Задание №10',
    type: 'assignment',
    steps: [
      {
        id: 1,
        title: 'Шаг 1',
        content: '<p>Найдите ошибку в тексте:</p>',
        options: [
          { id: 'h', text: 'Прекрасный', isCorrect: false },
          { id: 'i', text: 'Искустный', isCorrect: true },
        ],
        points: 5,
        answerType: 'single',
      },
    ],
  },
]

// ─── HTML-рендер (упрощённый) ────────────────────────────────────────────────

function renderHtml(html: string) {
  return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}

// ─── Компонент варианта ответа (read-only) ────────────────────────────────────

function AnswerOptionView({ option, answerType }: { option: AnswerOption; answerType: 'single' | 'multiple' }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 transition-colors">
      {answerType === 'single' ? (
        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
            option.isCorrect ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300'
          }`}
        >
          {option.isCorrect && <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />}
        </div>
      ) : (
        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
            option.isCorrect ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
          }`}
        >
          {option.isCorrect && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <polyline points="20,6 9,17 4,12" />
            </svg>
          )}
        </div>
      )}
      <span className="text-sm text-slate-700">{option.text}</span>
      {option.isCorrect && (
        <span className="ml-auto shrink-0 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
          Правильный
        </span>
      )}
    </div>
  )
}

// ─── Основная страница ────────────────────────────────────────────────────────

export function TeacherLessonViewPage() {
  const navigate = useNavigate()

  // В реальном приложении lessonId брался бы из useParams и подгружался с бэка
  const tasks = MOCK_TASKS
  const [activeTaskIndex, setActiveTaskIndex] = useState(0)
  const activeTask = tasks[activeTaskIndex]
  const [activeStepId, setActiveStepId] = useState(1)
  const activeStep = activeTask.steps.find((s) => s.id === activeStepId) || activeTask.steps[0]

  return (
    <div className="flex flex-1 overflow-hidden bg-slate-50" style={{ fontFamily: "'Geologica', 'Manrope', sans-serif" }}>
      {/* ── Left Panel — список заданий ── */}
      <aside className="flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-4 py-4">
          <p className="text-sm font-semibold text-slate-800">Урок 1. Орфография</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => {
                setActiveTaskIndex(tasks.indexOf(task))
                setActiveStepId(task.steps[0]?.id ?? 1)
              }}
              className={`group flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                task.id === activeTask.id
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {task.type === 'lecture' ? (
                <BookOpen className="h-4 w-4 shrink-0 text-blue-500" />
              ) : (
                <CheckSquare className="h-4 w-4 shrink-0 text-emerald-500" />
              )}
              <span className="flex-1 truncate">{task.title}</span>
              {task.type === 'lecture' && (
                <span className="shrink-0 rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                  Лекция
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к курсу
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl space-y-5 p-6">
          {/* Заголовок */}
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="flex-1 text-base font-semibold text-slate-800">{activeTask.title}</span>
              <span className="shrink-0 text-xs font-normal text-slate-400">
                {activeTask.type === 'lecture' ? 'Лекция' : 'Задача'}
              </span>
            </div>
          </div>

          {/* Шаги — кружочки */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
              {activeTask.steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                    activeStepId === step.id
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {step.id}
                </button>
              ))}
              <span className="ml-auto text-xs text-slate-400">
                Шаг {activeStepId} из {activeTask.steps.length}
              </span>
            </div>

            {/* Название шага */}
            <div className="border-b border-slate-100 px-6 py-4">
              <p className="text-sm text-slate-700">{activeStep?.title || 'Без названия'}</p>
            </div>

            {/* Содержимое (HTML) */}
            <div className="px-6 py-4">{renderHtml(activeStep?.content || '')}</div>
          </div>

          {/* Варианты ответа — только для заданий */}
          {activeTask.type === 'assignment' && activeStep && activeStep.options.length > 0 && (
            <div className="space-y-4 rounded-xl border border-slate-200 bg-white px-6 py-5">
              <h3 className="font-semibold text-slate-800">
                {activeStep.answerType === 'single' ? 'Один вариант ответа' : 'Несколько вариантов ответа'}
              </h3>
              <div className="space-y-2">
                {activeStep.options.map((opt) => (
                  <AnswerOptionView key={opt.id} option={opt} answerType={activeStep.answerType} />
                ))}
              </div>
              {activeStep.points > 0 && (
                <p className="text-xs text-slate-400">Баллов за шаг: {activeStep.points}</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}