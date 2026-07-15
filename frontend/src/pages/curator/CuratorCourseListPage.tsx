import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { Heading } from '../../components/ui/Typography'
import { PageContainer } from '../../components/ui/PageContainer'
import { methodistCourses } from '../../data/mockCoursesData'

export function CuratorCourseListPage() {
  return (
    <PageContainer>
      <Heading as="h1" className="mb-6">Курсы</Heading>
      <div className="grid gap-5 lg:grid-cols-2">
        {methodistCourses.filter((c) => c.status === 'published').map((course) => (
          <Link key={course.id} to={`/curator/courses/${course.id}`}>
            <Card className="group cursor-pointer transition hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 text-xl font-bold text-white shadow-sm">
                  {course.title.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {course.studentCount} {course.studentCount === 1 ? 'ученик' : 'учеников'}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}
