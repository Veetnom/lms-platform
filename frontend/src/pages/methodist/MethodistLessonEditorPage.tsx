import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Plus,
  X,
  GripVertical,
  BookOpen,
  CheckSquare,
  Save,
} from 'lucide-react'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { StepEditor, type Step } from '../../components/methodist/StepEditor'

// ─── Types ───────────────────────────────────────────────────────────────────

type TaskType = 'lecture' | 'assignment'

interface LessonTask {
  id: number
  title: string
  type: TaskType
  steps: Step[]
}

// ─── Mock ─────────────────────────────────────────────────────────────────────

const makeOption = (): Step['options'][number] => ({
  id: `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  text: '',
  isCorrect: false,
})

const makeStep = (type: TaskType): Step => ({
  id: 1,
  title: 'Шаг 1',
  content: '',
  options: type === 'assignment' ? [makeOption(), makeOption()] : [],
  points: type === 'assignment' ? 5 : 0,
  answerType: 'single',
})

const MOCK_TASKS: LessonTask[] = [
  {
    id: 8,
    title: 'Введение в орфографию',
    type: 'lecture',
    steps: [
      {
        id: 1,
        title: 'Шаг 1',
        content: '<p>Орфография — раздел лингвистики, изучающий правильное написание слов.</p>',
        options: [],
        points: 0,
        answerType: 'single',
      },
      {
        id: 2,
        title: 'Шаг 2',
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
        options: [makeOption(), makeOption(), makeOption(), makeOption()],
        points: 5,
        answerType: 'single',
      },
      {
        id: 2,
        title: 'Шаг 2',
        content: '<p>Выберите все слова с <em>непроверяемой</em> гласной:</p>',
        options: [makeOption(), makeOption(), makeOption()],
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
        options: [makeOption(), makeOption()],
        points: 5,
        answerType: 'single',
      },
    ],
  },
]

// ─── Main Page ────────────────────────────────────────────────────────────────

export function MethodistLessonEditorPage() {
  useParams()
  const navigate = useNavigate()

  const [tasks, setTasks] = useState<LessonTask[]>(MOCK_TASKS)
  const [activeTaskId, setActiveTaskId] = useState<number>(9)
  const [lessonTitle, setLessonTitle] = useState('Урок 1. Орфография')

  // Выбор типа при добавлении
  const [showAddMenu, setShowAddMenu] = useState(false)
  const addBtnRef = useRef<HTMLDivElement>(null)

  // Подтверждение удаления задачи
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null)

  // Активная задача
  const activeTask = tasks.find((t) => t.id === activeTaskId)!

  // Шаги активной задачи (локальное состояние для редактирования)
  const [steps, setSteps] = useState<Step[]>(() => activeTask.steps)
  const [activeStepId, setActiveStepId] = useState<number>(() => steps[0]?.id ?? 1)

  // Перенумерация ID шагов
  const renumberSteps = (items: Step[]): Step[] =>
    items.map((s, i) => ({ ...s, id: i + 1 }))

  // ── Task helpers ──

  const createTask = (type: TaskType) => {
    const newId = Math.max(...tasks.map((t) => t.id), 0) + 1
    const label = type === 'lecture' ? 'Лекция' : 'Задание'
    const newSteps = renumberSteps([makeStep(type)])
    setTasks((prev) => [...prev, { id: newId, title: `${label} №${newId}`, type, steps: newSteps }])
    setActiveTaskId(newId)
    setShowAddMenu(false)
  }

  const updateTaskTitle = (id: number, title: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t))
    )
  }

  // ── Step helpers ──

  const addStep = () => {
    const newStep: Step = {
      id: steps.length + 1,
      title: '',
      content: '',
      options: activeTask.type === 'assignment' ? [makeOption(), makeOption()] : [],
      points: activeTask.type === 'assignment' ? 5 : 0,
      answerType: 'single',
    }
    const updated = renumberSteps([...steps, newStep])
    setSteps(updated)
    setActiveStepId(updated.length)
  }

  const deleteStep = () => {
    if (steps.length <= 1) return
    const filtered = steps.filter((s) => s.id !== activeStepId)
    const renumbered = renumberSteps(filtered)
    setSteps(renumbered)
    const newActiveId = Math.min(activeStepId, renumbered.length)
    setActiveStepId(newActiveId)
  }

  // Сохраняем изменения шагов обратно в tasks
  const syncStepsToTask = () => {
    setTasks((prev) =>
      prev.map((t) => (t.id !== activeTaskId ? t : { ...t, steps }))
    )
  }

  // Загружаем шаги при смене задачи
  useEffect(() => {
    const task = tasks.find((t) => t.id === activeTaskId)
    if (!task) return
    setSteps(task.steps)
    const firstId = task.steps[0]?.id ?? 1
    setActiveStepId(firstId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTaskId])

  // Закрыть меню при клике снаружи
  useEffect(() => {
    if (!showAddMenu) return
    const handler = (e: MouseEvent) => {
      if (addBtnRef.current && !addBtnRef.current.contains(e.target as Node)) {
        setShowAddMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showAddMenu])

  const handleExit = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const isLecture = activeTask?.type === 'lecture'

  return (
    <div className="flex flex-1 overflow-hidden bg-slate-50" style={{ fontFamily: "'Geologica', 'Manrope', sans-serif" }}>
      {/* ── Left Panel — список заданий ── */}
      <aside className="flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-4 py-4">
          <input
            type="text"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {tasks.map((task, index) => {
            const handleDragStart = (e: React.DragEvent) => {
              e.dataTransfer.setData('text/plain', String(index))
              e.dataTransfer.effectAllowed = 'move'
              const el = e.currentTarget as HTMLElement
              el.classList.add('opacity-50')
            }
            const handleDragOver = (e: React.DragEvent) => {
              e.preventDefault()
              e.dataTransfer.dropEffect = 'move'
            }
            const handleDrop = (e: React.DragEvent) => {
              e.preventDefault()
              const fromIndex = Number(e.dataTransfer.getData('text/plain'))
              if (isNaN(fromIndex) || fromIndex === index) return
              const updated = [...tasks]
              const [moved] = updated.splice(fromIndex, 1)
              updated.splice(index, 0, moved)
              setTasks(updated)
            }
            const handleDragEnd = (e: React.DragEvent) => {
              const el = e.currentTarget as HTMLElement
              el.classList.remove('opacity-50')
            }
            return (
              <div
                key={task.id}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                className={`group flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                  activeTaskId === task.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <button
                  className="shrink-0 cursor-grab text-slate-300 active:cursor-grabbing"
                  onClick={() => {
                    syncStepsToTask()
                    setActiveTaskId(task.id)
                  }}
                >
                  <GripVertical className="h-3.5 w-3.5" />
                </button>
                <span
                  onClick={() => {
                    syncStepsToTask()
                    setActiveTaskId(task.id)
                  }}
                  className="flex-1 cursor-pointer truncate"
                >
                  {task.title}
                </span>
                {task.type === 'lecture' && (
                  <span className="shrink-0 rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                    Лекция
                  </span>
                )}
                <button
                  className="shrink-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (tasks.length > 1) {
                      setDeleteTaskId(task.id)
                    }
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <div className="relative" ref={addBtnRef}>
            <button
              onClick={() => setShowAddMenu((v) => !v)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-slate-200 px-4 py-2.5 text-sm text-slate-500 transition-colors hover:border-blue-400 hover:text-blue-500"
            >
              <Plus className="h-4 w-4" />
              Добавить
            </button>
            {showAddMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                <button
                  onClick={() => createTask('lecture')}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-blue-50"
                >
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  Лекция
                </button>
                <button
                  onClick={() => createTask('assignment')}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-blue-50"
                >
                  <CheckSquare className="h-4 w-4 text-emerald-500" />
                  Задание
                </button>
              </div>
            )}
          </div>
          <button
            onClick={handleExit}
            className="mt-2 w-full rounded-lg px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100"
          >
            Выйти из редактирования
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl space-y-5 p-6">
          {/* Заголовок — редактируемый */}
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={activeTask?.title ?? ''}
                onChange={(e) => updateTaskTitle(activeTaskId, e.target.value)}
                className="flex-1 bg-transparent text-base font-semibold text-slate-800 outline-none"
              />
              <span className="shrink-0 text-xs font-normal text-slate-400">
                {isLecture ? 'Лекция' : 'Задача'}
              </span>
            </div>
          </div>

          {/* StepEditor — общий компонент */}
          <StepEditor
            steps={steps}
            activeStepId={activeStepId}
            onStepsChange={setSteps}
            onActiveStepChange={setActiveStepId}
            onAddStep={addStep}
            onDeleteStep={deleteStep}
            showSettings={!isLecture}
            showPoints={!isLecture}
            answerTypes={['single', 'multiple', 'text']}
            saveButton={
              <button
                onClick={syncStepsToTask}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                Сохранить
              </button>
            }
          />
        </div>
      </main>

      <ConfirmDialog
        isOpen={deleteTaskId !== null}
        title="Удаление задания"
        message="Вы уверены, что хотите удалить это задание?"
        onConfirm={() => {
          if (deleteTaskId !== null) {
            const updated = tasks.filter((t) => t.id !== deleteTaskId)
            setTasks(updated)
            if (activeTaskId === deleteTaskId) {
              const next = updated[0]
              setActiveTaskId(next.id)
            }
          }
          setDeleteTaskId(null)
        }}
        onCancel={() => setDeleteTaskId(null)}
      />
    </div>
  )
}