import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight, Save } from 'lucide-react'
import { StepEditor, type Step } from '../../components/methodist/StepEditor'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeStep = (): Step => ({
  id: 1,
  title: 'Шаг 1',
  content: '',
  options: [],
  points: 5,
  answerType: 'single',
})

export function MethodistHomeworkEditorPage() {
  const { id: courseId = '1', homeworkId = '0' } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState(() => {
    try {
      const draft = sessionStorage.getItem(`hw-draft-${homeworkId}`)
      if (draft) {
        const parsed = JSON.parse(draft)
        return parsed.title || 'Новое задание'
      }
    } catch {
      // ignore
    }
    return 'Новое задание'
  })
  const [steps, setSteps] = useState<Step[]>([makeStep()])
  const [activeStepId, setActiveStepId] = useState<number>(1)

  // Перенумерация ID шагов
  const renumberSteps = (items: Step[]): Step[] =>
    items.map((s, i) => ({ ...s, id: i + 1 }))

  const addStep = () => {
    const newStep: Step = {
      id: steps.length + 1,
      title: '',
      content: '',
      options: [],
      points: 5,
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

  const handleBack = () => {
    navigate(`/methodist/courses/${courseId}/homework`)
  }

  const handleSave = () => {
    navigate(`/methodist/courses/${courseId}/homework`)
  }

  return (
    <div className="flex flex-1 overflow-hidden bg-slate-50" style={{ fontFamily: "'Geologica', 'Manrope', sans-serif" }}>
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl space-y-5 p-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-sm text-slate-400">
            <Link to={`/methodist/courses/${courseId}/homework`} className="hover:text-slate-600 transition-colors">
              Домашние задания
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-700 font-medium">{title || 'Редактор'}</span>
          </nav>

          {/* Заголовок */}
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 bg-transparent text-base font-semibold text-slate-800 outline-none"
                placeholder="Название задания"
              />
              <span className="shrink-0 text-xs font-normal text-slate-400">Задача</span>
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
            showSettings={true}
            showPoints={true}
            answerTypes={['single', 'multiple', 'text']}
            bottomLeft={
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Назад
                </button>
              </div>
            }
            saveButton={
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                Сохранить
              </button>
            }
          />
        </div>
      </main>
    </div>
  )
}