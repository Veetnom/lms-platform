import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Select } from '../../components/ui/Select'
import { Heading, Text } from '../../components/ui/Typography'
import { assignmentSubmissions, students, teacherAssignments, teacherGroups } from '../../data/mockData'

export function CourseCheckingSubmissionsPage() {
  const { id = '1', assignmentId } = useParams()
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const groupOptions = [
    { value: 'all', label: 'Все группы' },
    ...teacherGroups.map((g) => ({ value: g.id, label: g.title })),
  ]

  const assignment = teacherAssignments.find((a) => a.id === assignmentId)
  const submissions = assignmentSubmissions[assignmentId || ''] || []

  const studentIdsInGroup = selectedGroup === 'all'
    ? null
    : new Set(teacherGroups
        .filter((g) => g.id === selectedGroup)
        .flatMap((g) => g.students.map((s) => s.id))
      )

  let filteredSubmissions = studentIdsInGroup
    ? submissions.filter((sub) => studentIdsInGroup.has(sub.studentId))
    : submissions

  if (statusFilter !== 'all') {
    filteredSubmissions = filteredSubmissions.filter((sub) => sub.status === statusFilter)
  }

  return (
    <div>
      <Heading as="h1" className="mb-4">Проверка ответов</Heading>
      <div className="mb-6">
        <CourseTabs courseId={id} role="teacher" />
      </div>
      <div className="mb-4">
        <Link
          to={`/teacher/courses/${id}/checking`}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Назад к списку заданий
        </Link>
      </div>

      <Card>
        <div className="mb-4">
          <Heading as="h2">{assignment?.title || 'Задание'}</Heading>
          <Text className="mt-1">
            Проверено: {assignment?.checked || 0} / {assignment?.total || 0}
          </Text>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select
            options={groupOptions}
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select
            options={[
              { value: 'all', label: 'Все статусы' },
              { value: 'checked', label: 'Проверено' },
              { value: 'pending', label: 'Ожидает' },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48"
          />
        </div>

        <div className="space-y-3">
          {filteredSubmissions.length === 0 ? (
            <Text className="py-8 text-center">Нет работ для выбранной группы</Text>
          ) : (
            filteredSubmissions.map((sub) => {
              const student = students.find((s) => s.id === sub.studentId)
              return (
                <div
                  key={sub.studentId}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition hover:bg-border-light"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                      {student?.name.charAt(0) || '?'}
                    </div>
                    <div>
                      <Text size="base" color="primary" className="font-medium">{student?.name || 'Ученик'}</Text>
                      <Text className="text-sm">Сдано: {sub.submittedAt}</Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {sub.status === 'checked' ? (
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                        {sub.points}/{sub.maxPoints}
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                        Ожидает
                      </span>
                    )}
                    <Link to={`/teacher/courses/${id}/checking/${assignmentId}/${sub.studentId}`}>
                      <Button variant="blue" size="sm">Оценить</Button>
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted" />
                  </div>
                </div>
              )
            })
          )}
        </div>
      </Card>
    </div>
  )
}