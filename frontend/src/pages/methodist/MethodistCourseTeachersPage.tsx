import { useParams } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { UserCheck, GraduationCap } from 'lucide-react'

const mockTeachers = [
  { id: '1', name: 'Аля Виноградова', email: 'alya@mail.ru', checkedAnswers: 42 },
  { id: '2', name: 'Иван Петров', email: 'ivan@mail.ru', checkedAnswers: 28 },
]

const mockCurators = [
  { id: '3', name: 'Мария Смирнова', email: 'maria@mail.ru' },
  { id: '4', name: 'Анна Кураторова', email: 'anna@mail.ru' },
]

export function MethodistCourseTeachersPage() {
  const { id = '1' } = useParams()

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">Название курса</h1>
      <div className="mb-6">
        <CourseTabs courseId={id} role="methodist" />
      </div>

      {/* Команда курса */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Команда курса</h2>
        <p className="mt-1 text-sm text-slate-500">
          Преподаватели и ассистенты, работающие с курсом
        </p>
      </div>

      {/* Преподаватели (лекции и семинары) */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-900">Преподаватели</h3>
          </div>
          <Button variant="blue" size="sm">Добавить преподавателя</Button>
        </div>
        <div className="space-y-3">
          {mockTeachers.map((person) => (
            <Card key={person.id}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                  {person.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">{person.name}</p>
                  <p className="text-sm text-slate-500">{person.email}</p>
                </div>
                {person.checkedAnswers && (
                  <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    Проверено: {person.checkedAnswers}
                  </span>
                )}
                <button
                  type="button"
                  className="shrink-0 text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  Удалить
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Кураторы */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-violet-600" />
            <h3 className="text-sm font-semibold text-slate-900">Кураторы</h3>
          </div>
          <Button variant="purple" size="sm">Добавить куратора</Button>
        </div>
        <div className="space-y-3">
          {mockCurators.map((person) => (
            <Card key={person.id}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white">
                  {person.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">{person.name}</p>
                  <p className="text-sm text-slate-500">{person.email}</p>
                </div>
                <button
                  type="button"
                  className="shrink-0 text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  Удалить
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}