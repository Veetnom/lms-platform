import { useParams, Link } from 'react-router-dom'
import { Eye, ArrowLeft } from 'lucide-react'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Card } from '../../components/ui/Card'
import { Heading } from '../../components/ui/Typography'
import { courseModules } from '../../data/mockCoursesData'
import { moduleLessons } from '../../data/mockData'

export function CourseStructurePage() {
  const { id = '1', moduleId } = useParams()

  // Если выбран модуль — показываем его уроки
  if (moduleId) {
    const module = courseModules.find((m) => m.id === moduleId)
    const totalPoints = moduleLessons.reduce((sum, l) => sum + l.points, 0)
    const moduleIndex = (module && courseModules.indexOf(module)) ?? 0

    return (
      <div>
        <Heading as="h1" className="mb-4">Название курса</Heading>
        <div className="mb-6">
          <CourseTabs courseId={id} role="teacher" />
        </div>

        <div className="mb-4">
          <Link
            to={`/teacher/courses/${id}/structure`}
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к модулям
          </Link>
        </div>

        {/* Информационная карточка модуля */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5">
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 text-xl font-bold">
                {moduleIndex + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold">{module?.title || 'Модуль'}</p>
                <p className="mt-0.5 text-sm text-blue-100">
                  {moduleLessons.length} {moduleLessons.length === 1 ? 'урок' : 'уроков'} · {totalPoints} баллов
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 divide-x divide-slate-100">
            <div className="px-6 py-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Необходимо баллов</p>
              <p className="mt-1 text-xl font-bold text-slate-900">{totalPoints}</p>
            </div>
            <div className="px-6 py-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Начало модуля</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">15 сен</p>
            </div>
            <div className="px-6 py-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Конец модуля</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">15 окт</p>
            </div>
          </div>

        </Card>

        {/* Список уроков */}
        <Card>
          <Heading as="h3" className="mb-4">Уроки модуля</Heading>
          <div className="rounded-lg border border-slate-200">
            {moduleLessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className="flex items-center gap-3 border-b border-slate-100 p-4 last:border-b-0"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-500">
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">{lesson.title}</p>
                  <p className="text-sm text-slate-500">{lesson.points} баллов</p>
                </div>
                <Link
                  to={`/teacher/courses/${id}/lessons/${lesson.id}/view`}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                >
                  <Eye className="mr-1.5 h-4 w-4" />
                  Просмотреть
                </Link>
              </div>
            ))}
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
        <CourseTabs courseId={id} role="teacher" />
      </div>

      <div className="flex items-center justify-between">
        <Heading as="h2">Модули курса</Heading>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {courseModules.map((mod) => (
          <Link
            key={mod.id}
            to={`/teacher/courses/${id}/structure/${mod.id}`}
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