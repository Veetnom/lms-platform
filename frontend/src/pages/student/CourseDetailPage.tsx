import { useParams } from 'react-router-dom'
import { Accordion } from '../../components/ui/Accordion'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Heading, Text } from '../../components/ui/Typography'
import { formatPrice, storeCourses } from '../../data/mockData'
import { PageContainer } from '../../components/ui/PageContainer'

export function CourseDetailPage() {
  const { id } = useParams()
  const course = storeCourses.find((c) => c.id === id) ?? storeCourses[0]

  return (
    <PageContainer>
      <div className="space-y-6">
      <Card>
        <Heading as="h1">{course.title}</Heading>
        <Text size="base" color="muted" className="mt-3">{course.subtitle}</Text>
        <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-muted">
          {course.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <Heading as="h2" className="mb-4">Описание</Heading>
          <Text size="base" color="muted" className="leading-relaxed">{course.description}</Text>
          <Text size="base" color="muted" className="mt-4 leading-relaxed">
            К концу курса вы будете знать все правила, уметь применять их на практике и
            уверенно писать сочинение.
          </Text>
        </Card>

        <Card className="h-fit">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-muted">Стоимость курса</span>
            <span className="text-xl font-bold text-primary">{formatPrice(course.price)}</span>
          </div>
          <Button variant="orange" fullWidth>
            В корзину
          </Button>
        </Card>
      </div>

      <Card>
        <Heading as="h2" className="mb-4">Программа курса</Heading>
        <Accordion
          items={course.program.map((mod) => ({
            id: mod.id,
            title: mod.title,
            defaultOpen: mod.expanded,
            content: mod.lessons ? (
              <ol className="list-inside list-decimal space-y-1 text-sm text-muted">
                {mod.lessons.map((lesson, i) => (
                  <li key={i}>{lesson}</li>
                ))}
              </ol>
            ) : undefined,
          }))}
        />
      </Card>
    </div>
    </PageContainer>
  )
}
