import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarClock, FileText, Award, ArrowLeft } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export interface HomeworkFormData {
  title: string
  openDate: string
  deadline: string
  maxPoints: number
}

interface HomeworkFormProps {
  /** ID курса для кнопки "Назад" */
  courseId: string
  /** Данные для редактирования (если переданы — форма предзаполнена) */
  initialData?: Partial<HomeworkFormData>
  /** Коллбек при сабмите */
  onSubmit: (data: HomeworkFormData) => void
  /** Текст на кнопке */
  submitLabel?: string
}

export function HomeworkForm({
  courseId,
  initialData,
  onSubmit,
  submitLabel = 'Перейти к редактору',
}: HomeworkFormProps) {
  const navigate = useNavigate()
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [openDate, setOpenDate] = useState(initialData?.openDate ?? '')
  const [deadline, setDeadline] = useState(initialData?.deadline ?? '')
  const [maxPoints, setMaxPoints] = useState(initialData?.maxPoints ?? 100)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, openDate, deadline, maxPoints })
  }

  const handleBack = () => {
    navigate(`/methodist/courses/${courseId}/homework`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ─── Секция: Основное ─── */}
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 text-slate-700">
          <FileText className="h-4 w-4 text-blue-500" />
          <h3 className="text-sm font-semibold">О задании</h3>
        </div>

        <Input
          label="Название задания"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите название"
          required
        />
      </div>

      {/* ─── Секция: Сроки ─── */}
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 text-slate-700">
          <CalendarClock className="h-4 w-4 text-amber-500" />
          <h3 className="text-sm font-semibold">Сроки</h3>
        </div>

        <Input
          label="Дата открытия"
          type="date"
          value={openDate}
          onChange={(e) => setOpenDate(e.target.value)}
          required
        />

        <Input
          label="Дедлайн"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>

      {/* ─── Секция: Оценка ─── */}
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 text-slate-700">
          <Award className="h-4 w-4 text-emerald-500" />
          <h3 className="text-sm font-semibold">Оценка</h3>
        </div>

        <Input
          label="Максимальное количество баллов"
          type="number"
          min={1}
          value={maxPoints}
          onChange={(e) => setMaxPoints(Number(e.target.value))}
          required
        />
      </div>

      {/* ─── Кнопки ─── */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4">
        <Button type="button" variant="secondary" onClick={handleBack}>
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Назад
        </Button>
        <Button type="submit" variant="blue">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}