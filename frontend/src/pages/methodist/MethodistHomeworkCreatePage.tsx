import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Heading } from '../../components/ui/Typography'
import { HomeworkForm } from '../../components/methodist/HomeworkForm'
import type { HomeworkFormData } from '../../components/methodist/HomeworkForm'

/** Имитация ответа бэкенда: генерация ID после создания */
function generateHomeworkId(): string {
  return `hw-${Date.now()}`
}

export function MethodistHomeworkCreatePage() {
  const { id: courseId = '1' } = useParams()
  const navigate = useNavigate()

  const handleSubmit = (data: HomeworkFormData) => {
    const newId = generateHomeworkId()
    // Сохраняем данные формы в sessionStorage, чтобы редактор мог их подхватить
    sessionStorage.setItem(`hw-draft-${newId}`, JSON.stringify(data))
    navigate(`/methodist/courses/${courseId}/homework/${newId}/editor`)
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-slate-400">
        <Link to={`/methodist/courses/${courseId}/homework`} className="hover:text-slate-600 transition-colors">
          Домашние задания
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-700 font-medium">Создание</span>
      </nav>

      <Heading as="h1" className="mb-6">Создание домашнего задания</Heading>

      <Card>
        <div className="p-2">
          <HomeworkForm courseId={courseId} onSubmit={handleSubmit} />
        </div>
      </Card>
    </div>
  )
}