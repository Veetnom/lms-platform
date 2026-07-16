import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Heading } from '../../components/ui/Typography'
import { CourseFormModal, type CourseFormData } from '../../components/methodist/CourseFormModal'
import { methodistCourses as initialCourses } from '../../data/mockCoursesData'
import { pluralize } from '../../lib/pluralize'
import type { MethodistCourseInfo } from '../../data/mockCoursesData'

export function MethodistCourseListPage() {
  const [courses, setCourses] = useState<MethodistCourseInfo[]>(initialCourses)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCreate = (data: CourseFormData) => {
    const newCourse: MethodistCourseInfo = {
      id: `course-${Date.now()}`,
      title: data.title,
      studentCount: 0,
      status: 'draft',
      price: data.price,
      shortDesc: data.shortDesc,
      fullDesc: data.fullDesc,
    }
    setCourses((prev) => [...prev, newCourse])
    setShowCreateModal(false)
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Heading as="h1">Курсы</Heading>
        <Button onClick={() => setShowCreateModal(true)}>Создать курс</Button>
      </div>

      {showCreateModal && (
        <CourseFormModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
        />
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        {courses.map((course) => {
          const colorMap: Record<string, string> = {
            published: 'bg-green-100 text-green-700',
            draft: 'bg-yellow-100 text-yellow-700',
          }
          const labelMap: Record<string, string> = {
            published: 'Опубликован',
            draft: 'Черновик',
          }
          return (
            <Link key={course.id} to={`/methodist/courses/${course.id}`}>
              <Card className="group cursor-pointer transition hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-xl font-bold text-white shadow-sm">
                    {course.title.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {course.title}
                      </h3>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          colorMap[course.status]
                        }`}
                      >
                        {labelMap[course.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {course.studentCount} {pluralize(course.studentCount, ['ученик', 'ученика', 'учеников'])}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}