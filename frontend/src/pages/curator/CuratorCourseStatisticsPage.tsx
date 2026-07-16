import { useParams } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Card } from '../../components/ui/Card'
import { Heading } from '../../components/ui/Typography'
import { PageContainer } from '../../components/ui/PageContainer'
import { curatorStatStudents } from '../../data/mockStudents'
import { curatorTeachers } from '../../data/mockTeachers'

const mockStudents = curatorStatStudents
const mockTeachers = curatorTeachers

export function CuratorCourseStatisticsPage() {
  const { id = '1' } = useParams()

  return (
    <PageContainer>
      <Heading as="h1" className="mb-4">Название курса</Heading>
      <div className="mb-6">
        <CourseTabs courseId={id} role="curator" />
      </div>

      {/* Ученики */}
      <Heading as="h2" className="mb-3">Ученики</Heading>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Имя</th>
              <th className="px-4 py-3 font-medium">Прогресс</th>
              <th className="px-4 py-3 font-medium">Баллы</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockStudents.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-900">{s.name}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${s.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">{s.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-900">{s.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Преподаватели */}
      <Heading as="h2" className="mb-3 mt-8">Преподаватели</Heading>
      <div className="space-y-3">
        {mockTeachers.map((t) => (
          <Card key={t.id}>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white">
                {t.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900">{t.name}</p>
                <p className="text-sm text-slate-500">{t.email}</p>
              </div>
              <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {t.role}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}