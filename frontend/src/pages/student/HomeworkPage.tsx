import { Heading } from '../../components/ui/Typography'
import { HomeworkCard } from '../../components/homework/HomeworkCard'
import { homeworkItems } from '../../data/mockData'
import { PageContainer } from '../../components/ui/PageContainer'

export function HomeworkPage() {
  return (
    <PageContainer>
      <Heading as="h1" className="mb-6">Домашние работы</Heading>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {homeworkItems.map((hw) => (
          <HomeworkCard
            key={hw.id}
            title={hw.title}
            subject={hw.subject}
            daysLeft={hw.daysLeft}
          />
        ))}
      </div>
    </PageContainer>
  )
}
