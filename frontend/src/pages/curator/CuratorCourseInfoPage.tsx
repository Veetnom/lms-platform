import { useParams } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Card } from '../../components/ui/Card'
import { Heading } from '../../components/ui/Typography'
import { PageContainer } from '../../components/ui/PageContainer'

export function CuratorCourseInfoPage() {
  const { id = '1' } = useParams()

  return (
    <PageContainer>
      <Heading as="h1" className="mb-4">Название курса</Heading>
      <div className="mb-6">
        <CourseTabs courseId={id} role="curator" />
      </div>

      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-sm text-slate-500">Название курса</p>
            <p className="font-medium text-slate-900">Русский язык</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-slate-500">Преподаватель</p>
            <p className="font-medium text-slate-900">Аля Виноградова</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-1 text-sm text-slate-500">Описание</p>
          <p className="text-sm text-slate-700">
            Основной курс 3.0 — это комплексная система подготовки к ЕГЭ по русскому языку на максимум!
          </p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-sm text-slate-500">Стоимость</p>
            <p className="font-medium text-slate-900">24 165 ₽</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-slate-500">Статус</p>
            <p className="font-medium text-green-600">Опубликован</p>
          </div>
        </div>
      </Card>
    </PageContainer>
  )
}