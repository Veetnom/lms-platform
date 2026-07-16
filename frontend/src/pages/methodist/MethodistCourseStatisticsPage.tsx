import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { CuratorTable } from '../../components/teacher/CuratorTable'
import { StudentTable } from '../../components/teacher/StudentTable'
import { Card } from '../../components/ui/Card'
import { Heading } from '../../components/ui/Typography'
import { SearchInput } from '../../components/ui/SearchInput'
import { ToggleButtons } from '../../components/ui/ToggleButtons'
import { curators, students } from '../../data/mockData'

export function MethodistCourseStatisticsPage() {
  const { id = '1' } = useParams()
  const [view, setView] = useState('students')

  return (
    <div>
      <Heading as="h1" className="mb-4">Название курса</Heading>
      <div className="mb-6">
        <CourseTabs courseId={id} role="methodist" />
      </div>

      <Card>
        <ToggleButtons
          options={[
            { value: 'students', label: 'Ученики' },
            { value: 'teachers', label: 'Преподаватели' },
          ]}
          value={view}
          onChange={setView}
        />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Heading as="h2">
            {view === 'students' ? 'Ученики курса' : 'Преподаватели курса'}
          </Heading>
          <SearchInput className="w-full sm:max-w-xs" />
        </div>

        <div className="mt-4">
          {view === 'students' ? (
            <StudentTable students={students} />
          ) : (
            <CuratorTable curators={curators} />
          )}
        </div>

      </Card>
    </div>
  )
}