import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import type { TeacherHomework, CourseStatus } from '../../types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { ConfirmDialog } from '../ui/ConfirmDialog'

interface HomeworkManageCardProps {
  homework: TeacherHomework
  courseId?: string
  onStatusChange?: (id: string, status: CourseStatus) => void
}

export function HomeworkManageCard({ homework, courseId = '1', onStatusChange }: HomeworkManageCardProps) {
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)

  const hasSteps = () => {
    try {
      const raw = sessionStorage.getItem(`hw-steps-${homework.id}`)
      if (!raw) return false
      const steps = JSON.parse(raw)
      return Array.isArray(steps) && steps.length > 0
    } catch {
      return false
    }
  }

  const handleToggle = () => {
    // Если пытаемся опубликовать — проверяем наличие шагов
    if (homework.status === 'draft' && !hasSteps()) {
      setShowConfirm(true)
      return
    }
    // Иначе просто переключаем
    onStatusChange?.(homework.id, homework.status === 'draft' ? 'published' : 'draft')
  }

  const handleConfirmPublish = () => {
    setShowConfirm(false)
    onStatusChange?.(homework.id, 'published')
  }

  return (
    <>
      <Card>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-slate-900">{homework.title}</h3>
            <Badge variant={homework.status === 'published' ? 'published' : 'draft'} className="mt-2">
              {homework.status === 'published' ? 'Опубликован' : 'Черновик'}
            </Badge>
          </div>
          <span className="shrink-0 text-sm text-slate-500">До {homework.deadline}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-slate-500">{homework.points} баллов</span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => navigate(`/methodist/courses/${courseId}/homework/${homework.id}`)}>
              Редактировать
            </Button>
            {homework.status === 'draft' ? (
              <button
                type="button"
                onClick={handleToggle}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
              >
                <Eye className="h-4 w-4" />
                Опубликовать
              </button>
            ) : (
              <button
                type="button"
                onClick={handleToggle}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
              >
                <EyeOff className="h-4 w-4" />
                В черновик
              </button>
            )}
          </div>
        </div>
      </Card>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Публикация пустого задания"
        message="В задании нет шагов. Студенты увидят пустое задание. Вы можете добавить шаги позже."
        confirmLabel="Всё равно опубликовать"
        cancelLabel="Отмена"
        variant="default"
        onConfirm={handleConfirmPublish}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  )
}
