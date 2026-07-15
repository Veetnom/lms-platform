import { Heading } from '../../components/ui/Typography'
import { StoreCourseCard } from '../../components/store/StoreCourseCard'
import { storeCourses } from '../../data/mockData'
import { PageContainer } from '../../components/ui/PageContainer'

export function StorePage() {
  return (
    <PageContainer>
      <Heading as="h1" className="mb-6">Магазин</Heading>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {storeCourses.map((course) => (
          <StoreCourseCard key={course.id} course={course} />
        ))}
      </div>
    </PageContainer>
  )
}
