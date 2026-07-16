import type { Curator } from '../../types'
import { Avatar } from '../ui/Avatar'

interface CuratorTableProps {
  curators: Curator[]
}

export function CuratorTable({ curators }: CuratorTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-4 py-3 font-medium text-slate-600">#</th>
            <th className="px-4 py-3 font-medium text-slate-600">Преподаватель</th>
            <th className="px-4 py-3 font-medium text-slate-600">Email</th>
            <th className="px-4 py-3 font-medium text-slate-600">Проверил работ</th>
            <th className="px-4 py-3 font-medium text-slate-600">Назначен преподавателем</th>
          </tr>
        </thead>
        <tbody>
          {curators.map((curator, idx) => (
            <tr key={curator.id} className="border-b border-slate-100">
              <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Avatar name={curator.name} size="sm" />
                  <span className="font-medium text-slate-900">{curator.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-600">{curator.email}</td>
              <td className="px-4 py-3 text-slate-600">{curator.checkedAnswers}</td>
              <td className="px-4 py-3 text-slate-600">{curator.appointedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
