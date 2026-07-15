import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { Heading, Text } from '../../components/ui/Typography'
import { enrolledCourses } from '../../data/mockData'
import { PageContainer } from '../../components/ui/PageContainer'

export function MyCoursesPage() {
  return (
    <PageContainer>
      <Heading as="h1" className="mb-6">Мои курсы</Heading>
      <div className="grid gap-5 lg:grid-cols-2">
        {enrolledCourses.map((course) => (
          <Link key={course.id} to={`/my-courses/${course.id}`}>
            <Card className="group cursor-pointer transition hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-xl font-bold text-white shadow-sm">
                  {course.title.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-primary group-hover:text-emerald-600 transition-colors">
                    {course.title}
                  </h3>
                  <Text className="mt-1">{course.progress}% материалов пройдено</Text>
                  <ProgressBar value={course.progress} className="mt-2" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}
