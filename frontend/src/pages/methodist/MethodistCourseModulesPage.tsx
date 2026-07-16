import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Heading } from '../../components/ui/Typography'
import { courseModules as initialModules } from '../../data/mockCoursesData'
import { pluralize } from '../../lib/pluralize'
import type { CourseModule } from '../../data/mockCoursesData'

export function MethodistCourseModulesPage() {
  const { id = '1' } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [modules, setModules] = useState<CourseModule[]>(initialModules)

  // Принимаем новый модуль из навигации (создан на странице /create)
  useEffect(() => {
    const newModule = location.state?.newModule as CourseModule | undefined
    if (newModule) {
      setModules((prev) => [...prev, newModule])
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  return (
    <div>
      <Heading as="h1" className="mb-4">Название курса</Heading>
      <div className="mb-6">
        <CourseTabs courseId={id} role="methodist" />
      </div>

      <div className="flex items-center justify-between">
        <Heading as="h2">Модули курса</Heading>
        <Button
          variant="blue"
          size="sm"
          onClick={() => navigate(`/methodist/courses/${id}/structure/create`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Добавить модуль
        </Button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {modules.map((mod, index) => (
          <Link
            key={mod.id}
            to={`/methodist/courses/${id}/structure/${mod.id}`}
          >
            <Card className="cursor-pointer transition hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-lg font-bold text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{mod.title}</h3>
                  <p className="text-sm text-slate-500">
                    {mod.lessonCount} {pluralize(mod.lessonCount, ['урок', 'урока', 'уроков'])}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

    </div>
  )
}
