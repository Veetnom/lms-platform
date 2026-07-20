import { useState, useRef } from 'react'
import { GripVertical, Plus, X } from 'lucide-react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Heading } from '../../components/ui/Typography'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { ModuleForm } from '../../components/methodist/ModuleForm'
import { courseModules } from '../../data/mockCoursesData'
import { moduleLessons as initialLessons } from '../../data/mockData'
import type { LessonItem, ModuleFormState } from '../../types'

export function MethodistCourseModuleEditPage() {
  const { id = '1', moduleId = '' } = useParams()
  const navigate = useNavigate()
  const module = courseModules.find((m) => m.id === moduleId)

  const [lessons, setLessons] = useState<LessonItem[]>(initialLessons)
  const [formData, setFormData] = useState<ModuleFormState>({
    title: module?.title ?? '',
    startDate: '',
    requiredPoints: 200,
  })
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const dragOverIndex = useRef<number | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [deleteModuleConfirm, setDeleteModuleConfirm] = useState(false)

  const handleDragStart = (index: number) => {
    setDragIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    dragOverIndex.current = index
  }

  const handleDrop = () => {
    if (dragIndex === null || dragOverIndex.current === null) return
    if (dragIndex === dragOverIndex.current) return

    const updated = [...lessons]
    const [moved] = updated.splice(dragIndex, 1)
    updated.splice(dragOverIndex.current, 0, moved)

    setLessons(updated)
    setDragIndex(null)
    dragOverIndex.current = null
  }

  const handleDragEnd = () => {
    setDragIndex(null)
    dragOverIndex.current = null
  }

  return (
    <div>
      <Heading as="h1" className="mb-4">Название курса</Heading>
      <div className="mb-6">
        <CourseTabs courseId={id} role="methodist" />
      </div>

      <div className="mb-4">
        <Link
          to={`/methodist/courses/${id}/structure`}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Назад к модулям
        </Link>
      </div>

      <Card>
        <ModuleForm data={formData} onChange={setFormData} />

        <div className="mt-6">
          <Heading as="h3" className="mb-3">Структура модуля</Heading>
          <div className="rounded-lg border border-slate-200">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 border-b border-slate-100 p-4 last:border-b-0 transition-colors ${
                  dragIndex === index ? 'opacity-50' : ''
                }`}
              >
                <GripVertical className="h-5 w-5 shrink-0 cursor-grab text-slate-400" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">{lesson.title}</p>
                  <p className="text-sm text-slate-500">{lesson.points} баллов</p>
                </div>
                <Link
                  to={`/methodist/courses/${id}/lessons/${lesson.id}/edit`}
                  className="inline-flex items-center justify-center rounded-lg bg-slate-200 px-3 py-1.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-300"
                >
                  Редактировать
                </Link>
              <button
                  type="button"
                  onClick={() => setDeleteConfirmId(lesson.id)}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                  aria-label="Удалить урок"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
            <div className="p-4">
              <Button
                variant="ghost"
                className="w-full border border-slate-300"
                onClick={() => {
                  const newLesson = {
                    id: `lesson-${Date.now()}`,
                    title: 'Новый урок',
                    points: 0,
                  }
                  setLessons((prev) => [...prev, newLesson])
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Добавить урок
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button variant="danger" onClick={() => setDeleteModuleConfirm(true)}>Удалить модуль</Button>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => navigate(`/methodist/courses/${id}/structure`)}>Назад</Button>
            <Button variant="blue">Сохранить</Button>
          </div>
        </div>
      </Card>

      <ConfirmDialog
        isOpen={deleteConfirmId !== null}
        title="Удаление урока"
        message={`Вы уверены, что хотите удалить урок?`}
        onConfirm={() => {
          if (deleteConfirmId) {
            setLessons((prev) => prev.filter((l) => l.id !== deleteConfirmId))
          }
          setDeleteConfirmId(null)
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />

      <ConfirmDialog
        isOpen={deleteModuleConfirm}
        title="Удаление модуля"
        message="Вы уверены, что хотите удалить этот модуль со всеми уроками?"
        onConfirm={() => {
          setDeleteModuleConfirm(false)
        }}
        onCancel={() => setDeleteModuleConfirm(false)}
      />
    </div>
  )
}
