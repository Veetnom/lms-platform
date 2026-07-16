import { Link, useParams } from 'react-router-dom'
import { Heading } from '../../components/ui/Typography'
import { AnswerGradingForm } from '../../components/teacher/AnswerGradingForm'
import { essayTask, students } from '../../data/mockData'

export function TeacherCheckingGradingPage() {
  const { assignmentId, submissionId } = useParams()
  const student = students.find((s) => s.id === submissionId)

  return (
    <div>
      <Heading as="h1" className="mb-6">Проверка ответов</Heading>
      <div className="mb-4">
        <Link
          to={`/teacher/checking/${assignmentId}`}
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