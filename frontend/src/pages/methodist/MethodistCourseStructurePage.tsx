import { GripVertical, Plus, X } from 'lucide-react'
import { useParams, Link } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Heading } from '../../components/ui/Typography'
import { Input } from '../../components/ui/Input'
import { courseModules } from '../../data/mockCoursesData'
import { moduleLessons } from '../../data/mockData'

export function MethodistCourseStructurePage() {
  const { id = '1', moduleId } = useParams()

  // Если выбран модуль — показываем его детальную страницу с редактированием
  if (moduleId) {
    const module = courseModules.find((m) => m.id === moduleId)
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
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="Модуль" placeholder="Название модуля" defaultValue={module?.title} />
            <Input label="Начало модуля" type="date" />
            <Input label="Необходимо баллов" defaultValue="200" />
          </div>

          <div className="mt-6">
            <Heading as="h3" className="mb-3">Структура модуля</Heading>
            <div className="rounded-lg border border-slate-200">
              {moduleLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 border-b border-slate-100 p-4 last:border-b-0"
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
                    className="rounded p-1 text-slate-400 hover:bg-slate-100"
                    aria-label="Удалить урок"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <div className="p-4">
                <Button variant="ghost" className="w-full border border-slate-300">
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить урок
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button variant="danger">Удалить модуль</Button>
            <div className="flex gap-3">
              <Button variant="secondary">Назад</Button>
              <Button variant="blue">Сохранить</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Список модулей
  return (
    <div>
      <Heading as="h1" className="mb-4">Название курса</Heading>
      <div className="mb-6">
        <CourseTabs courseId={id} role="methodist" />
      </div>

      <div className="flex items-center justify-between">
        <Heading as="h2">Модули курса</Heading>
        <Button variant="blue" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Добавить модуль
        </Button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {courseModules.map((mod) => (
          <Link
            key={mod.id}
            to={`/methodist/courses/${id}/structure/${mod.id}`}
          >
            <Card className="cursor-pointer transition hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-lg font-bold text-white">
                  {mod.id.slice(-1)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{mod.title}</h3>
                  <p className="text-sm text-slate-500">
                    {mod.lessonCount} {mod.lessonCount === 1 ? 'урок' : 'уроков'}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}