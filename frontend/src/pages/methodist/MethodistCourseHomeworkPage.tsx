import { useParams } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { HomeworkManageCard } from '../../components/teacher/HomeworkManageCard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Heading } from '../../components/ui/Typography'
import { SearchInput } from '../../components/ui/SearchInput'
import { Select } from '../../components/ui/Select'
import { teacherHomework } from '../../data/mockData'

export function MethodistCourseHomeworkPage() {
  const { id = '1' } = useParams()

  return (
    <div>
      <Heading as="h1" className="mb-4">Название курса</Heading>
      <div className="mb-6">
        <CourseTabs courseId={id} role="methodist" />
      </div>

      <Card>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Select
            options={[
              { value: 'all', label: 'Все статусы' },
              { value: 'published', label: 'Опубликован' },
              { value: 'draft', label: 'Черновик' },
            ]}
            className="w-full sm:w-48"
          />
          <SearchInput className="w-full sm:max-w-xs" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {teacherHomework.map((hw) => (
            <HomeworkManageCard key={hw.id} homework={hw} />
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="purple">Добавить задание</Button>
        </div>
      </Card>
    </div>
  )
}