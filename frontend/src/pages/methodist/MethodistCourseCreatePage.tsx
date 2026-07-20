import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Heading } from '../../components/ui/Typography'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { methodistCourses as initialCourses } from '../../data/mockCoursesData'
import type { MethodistCourseInfo } from '../../data/mockCoursesData'

export function MethodistCourseCreatePage() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [fullDesc, setFullDesc] = useState('')

  const handleCreate = () => {
    const newCourse: MethodistCourseInfo = {
      id: `course-${Date.now()}`,
      title,
      studentCount: 0,
      status: 'draft',
      price,
      shortDesc,
      fullDesc,
    }
    // В реальном проекте — POST запрос
    initialCourses.push(newCourse)
    navigate('/methodist/courses')
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-slate-400">
        <Link to="/methodist/courses" className="hover:text-slate-600 transition-colors">
          Курсы
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-700 font-medium">Создание курса</span>
      </nav>

      <Heading as="h1" className="mb-6">Создание курса</Heading>

      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Название курса"
            placeholder="Введите название курса"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Стоимость"
            type="number"
            placeholder="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Textarea
            label="Краткое описание"
            rows={3}
            placeholder="Краткое описание курса"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Textarea
            label="Полное описание"
            rows={8}
            placeholder="Подробное описание курса"
            value={fullDesc}
            onChange={(e) => setFullDesc(e.target.value)}
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => navigate('/methodist/courses')}>
            Отмена
          </Button>
          <Button variant="blue" onClick={handleCreate} disabled={!title.trim()}>
            Создать курс
          </Button>
        </div>
      </Card>
    </div>
  )
}