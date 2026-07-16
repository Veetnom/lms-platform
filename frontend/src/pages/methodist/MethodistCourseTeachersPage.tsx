import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Heading, Text } from '../../components/ui/Typography'
import { UserCheck, GraduationCap } from 'lucide-react'
import { methodistTeachers, methodistCurators, allTeachers, allCurators } from '../../data/mockTeachers'
import { AddPersonModal } from '../../components/methodist/AddPersonModal'

const mockTeachers = methodistTeachers
const mockCurators = methodistCurators

export function MethodistCourseTeachersPage() {
  const { id = '1' } = useParams()

  const [teacherModalOpen, setTeacherModalOpen] = useState(false)
  const [curatorModalOpen, setCuratorModalOpen] = useState(false)

  // Выбранные преподаватели (id)
  const [teacherIds, setTeacherIds] = useState<string[]>(
    mockTeachers.map((t) => t.id)
  )
  // Выбранные кураторы (id)
  const [curatorIds, setCuratorIds] = useState<string[]>(
    mockCurators.map((c) => c.id)
  )

  const toggleTeacher = (id: string) => {
    setTeacherIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleCurator = (id: string) => {
    setCuratorIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const currentTeachers = mockTeachers.filter((t) => teacherIds.includes(t.id))
  const currentCurators = mockCurators.filter((c) => curatorIds.includes(c.id))

  return (
    <div>
      <Heading as="h1" className="mb-4">Название курса</Heading>
      <div className="mb-6">
        <CourseTabs courseId={id} role="methodist" />
      </div>

      {/* Команда курса */}
      <div className="mb-4">
        <Heading as="h2">Команда курса</Heading>
        <Text className="mt-1">
          Преподаватели и ассистенты, работающие с курсом
        </Text>
      </div>

      {/* Преподаватели (лекции и семинары) */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <Text size="base" color="primary" className="text-sm font-semibold">Преподаватели</Text>
          </div>
          <Button variant="blue" size="sm" onClick={() => setTeacherModalOpen(true)}>
            Добавить преподавателя
          </Button>
        </div>
        <div className="space-y-3">
          {currentTeachers.map((person) => (
            <Card key={person.id}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                  {person.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <Text size="base" color="primary" className="font-medium">{person.name}</Text>
                  <Text className="text-sm">{person.email}</Text>
                </div>
                {person.checkedAnswers && (
                  <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    Проверено: {person.checkedAnswers}
                  </span>
                )}
                <button
                  type="button"
                  className="shrink-0 text-sm text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => setTeacherIds((prev) => prev.filter((x) => x !== person.id))}
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
            <Text size="base" color="primary" className="text-sm font-semibold">Кураторы</Text>
          </div>
          <Button variant="purple" size="sm" onClick={() => setCuratorModalOpen(true)}>
            Добавить куратора
          </Button>
        </div>
        <div className="space-y-3">
          {currentCurators.map((person) => (
            <Card key={person.id}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white">
                  {person.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <Text size="base" color="primary" className="font-medium">{person.name}</Text>
                  <Text className="text-sm">{person.email}</Text>
                </div>
                <button
                  type="button"
                  className="shrink-0 text-sm text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => setCuratorIds((prev) => prev.filter((x) => x !== person.id))}
                >
                  Удалить
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Модалка добавления преподавателей */}
      {teacherModalOpen && (
        <AddPersonModal
          title="Добавить преподавателей"
          people={allTeachers}
          selectedIds={teacherIds}
          onToggle={toggleTeacher}
          onClose={() => setTeacherModalOpen(false)}
          onSave={() => setTeacherModalOpen(false)}
        />
      )}

      {/* Модалка добавления кураторов */}
      {curatorModalOpen && (
        <AddPersonModal
          title="Добавить кураторов"
          people={allCurators}
          selectedIds={curatorIds}
          onToggle={toggleCurator}
          onClose={() => setCuratorModalOpen(false)}
          onSave={() => setCuratorModalOpen(false)}
        />
      )}
    </div>
  )
}