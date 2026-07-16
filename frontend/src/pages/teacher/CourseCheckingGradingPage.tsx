import { Link, useParams } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Heading } from '../../components/ui/Typography'
import { AnswerGradingForm } from '../../components/teacher/AnswerGradingForm'
import { essayTask, students } from '../../data/mockData'

export function CourseCheckingGradingPage() {
  const { id = '1', assignmentId, submissionId } = useParams()
  const student = students.find((s) => s.id === submissionId)

  return (
    <div>
      <Heading as="h1" className="mb-4">Проверка ответов</Heading>
      <div className="mb-6">
        <CourseTabs courseId={id} role="teacher" />
      </div>
      <div className="mb-4">
        <Link
          to={`/teacher/courses/${id}/checking/${assignmentId}`}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Назад к списку работ
        </Link>
      </div>
      <AnswerGradingForm
        task={essayTask}
        studentName={student?.name || 'Ученик'}
        studentAnswer={essayTask.content}
      />
    </div>
  )
}