import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Heading } from '../../components/ui/Typography'
import { ModuleForm } from '../../components/methodist/ModuleForm'
import type { CourseModule } from '../../data/mockCoursesData'

interface ModuleFormState {
  title: string
  startDate: string
  requiredPoints: number
}

export function MethodistCourseModuleCreatePage() {
  const { id: courseId = '1' } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<ModuleFormState>({
    title: '',
    startDate: '',
    requiredPoints: 200,
  })

  const handleCreate = () => {
    const newModule: CourseModule = {
      id: `m${Date.now()}`,
      title: formData.title,
      lessonCount: 0,
    }
    // Сохраняем модуль через location.state, имитируя добавление
    // В реальном проекте здесь был бы POST запрос
    navigate(`/methodist/courses/${courseId}/structure`, {
      state: { newModule },
    })
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-slate-400">
        <Link
          to={`/methodist/courses/${courseId}/structure`}
          className="hover:text-slate-600 transition-colors"
        >
          Модули
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-700 font-medium">Создание модуля</span>
      </nav>

      <Heading as="h1" className="mb-6">Создание модуля</Heading>

      <Card>
        <ModuleForm data={formData} onChange={setFormData} />
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate(`/methodist/courses/${courseId}/structure`)}
          >
            Отмена
          </Button>
          <Button
            variant="blue"
            onClick={handleCreate}
            disabled={!formData.title.trim()}
          >
            Создать
          </Button>
        </div>
      </Card>
    </div>
  )
}