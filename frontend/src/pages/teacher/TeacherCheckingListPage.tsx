import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Select } from '../../components/ui/Select'
import { SearchInput } from '../../components/ui/SearchInput'
import { Heading, Text } from '../../components/ui/Typography'
import { teacherAssignments } from '../../data/mockData'

export function TeacherCheckingListPage() {
  return (
    <div>
      <Heading as="h1" className="mb-6">Проверка ответов</Heading>
      <Card>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select
            options={[
              { value: 'all', label: 'Все типы' },
              { value: 'task', label: 'Задача' },
              { value: 'homework', label: 'Домашнее задание' },
            ]}
            className="w-full sm:w-48"
          />
          <SearchInput className="flex-1" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {teacherAssignments.map((assignment) => (
            <Card key={assignment.id} className="transition hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-border-light">
                    <FileText className="h-5 w-5 text-muted" />
                  </div>
                  <div>
                    <Text size="base" color="primary" className="font-semibold">{assignment.title}</Text>
                    <span className={`
                      mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium
                      ${assignment.type === 'task'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-purple-50 text-purple-600'
                      }
                    `}>
                      {assignment.type === 'task' ? 'Задача' : 'Домашнее задание'}
                    </span>
                  </div>
                </div>
                <Text className="shrink-0 text-sm">
                  Проверено {assignment.checked}/{assignment.total}
                </Text>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Text className="text-sm">{assignment.points} баллов</Text>
                <Link to={`/teacher/checking/${assignment.id}`}>
                  <Button variant="purple" size="sm">Проверить</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}