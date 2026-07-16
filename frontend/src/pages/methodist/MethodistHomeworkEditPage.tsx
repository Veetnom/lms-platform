import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Heading } from '../../components/ui/Typography'
import { HomeworkForm } from '../../components/methodist/HomeworkForm'
import type { HomeworkFormData } from '../../components/methodist/HomeworkForm'
import { teacherHomework } from '../../data/mockData'

export function MethodistHomeworkEditPage() {
  const { id: courseId = '1', homeworkId } = useParams()
  const navigate = useNavigate()

  const homework = teacherHomework.find((h) => h.id === homeworkId)

  const handleSubmit = (data: HomeworkFormData) => {
    // Сохраняем данные формы в sessionStorage, чтобы редактор мог их подхватить
    if (homeworkId) {
      sessionStorage.setItem(`hw-draft-${homeworkId}`, JSON.stringify(data))
    }
    navigate(`/methodist/courses/${courseId}/homework/${homeworkId}/editor`)
  }

  if (!homework) {
    return (
      <div>
        <Heading as="h1" className="mb-6">Редактирование задания</Heading>
        <Card>
          <div className="p-2 text-center text-slate-500">
            Задание не найдено
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-slate-400">
        <Link to={`/methodist/courses/${courseId}/homework`} className="hover:text-slate-600 transition-colors">
          Домашние задания
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-700 font-medium">{homework.title}</span>
      </nav>

      <Heading as="h1" className="mb-6">Редактирование задания</Heading>

      <Card>
        <div className="p-2">
          <HomeworkForm
            courseId={courseId}
            initialData={{
              title: homework.title,
              openDate: homework.openDate,
              deadline: homework.deadline,
              maxPoints: homework.points,
            }}
            onSubmit={handleSubmit}
          />
        </div>
      </Card>
    </div>
  )
}