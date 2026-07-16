import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ChevronRight, ArrowLeft, FileText, Award } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Heading } from '../../components/ui/Typography'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { moduleLessons } from '../../data/mockData'

export function MethodistLessonEditPage() {
  const { courseId = '1', lessonId = '' } = useParams()
  const navigate = useNavigate()

  const lesson = moduleLessons.find((l) => l.id === lessonId)

  const [title, setTitle] = useState(lesson?.title ?? '')
  const [maxPoints, setMaxPoints] = useState(lesson?.points ?? 0)

  const handleProceed = () => {
    // Сохраняем данные формы в sessionStorage для редактора
    sessionStorage.setItem(
      `lesson-draft-${lessonId}`,
      JSON.stringify({ title, maxPoints })
    )
    navigate(`/methodist/courses/${courseId}/lessons/${lessonId}/editor`)
  }

  if (!lesson) {
    return (
      <div>
        <Heading as="h1" className="mb-6">Редактирование урока</Heading>
        <Card>
          <div className="p-2 text-center text-slate-500">Урок не найден</div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-slate-400">
        <Link
          to={`/methodist/courses/${courseId}/structure`}
          className="hover:text-slate-600 transition-colors"
        >
          Структура курса
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-700 font-medium">{lesson.title}</span>
      </nav>

      <Heading as="h1" className="mb-6">Редактирование урока</Heading>

      <Card>
        <div className="space-y-6">
          {/* Основное */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-700">
              <FileText className="h-4 w-4 text-blue-500" />
              <h3 className="text-sm font-semibold">Об уроке</h3>
            </div>

            <Input
              label="Название урока"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название урока"
            />
          </div>

          {/* Оценка */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-700">
              <Award className="h-4 w-4 text-emerald-500" />
              <h3 className="text-sm font-semibold">Оценка</h3>
            </div>

            <Input
              label="Максимальное количество баллов"
              type="number"
              min={0}
              value={maxPoints}
              onChange={(e) => setMaxPoints(Number(e.target.value))}
            />
          </div>

          {/* Кнопки */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4">
            <Button
              variant="secondary"
              onClick={() => navigate(`/methodist/courses/${courseId}/structure`)}
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Назад
            </Button>
            <Button variant="blue" onClick={handleProceed}>
              Перейти к редактору
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}