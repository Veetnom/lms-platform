import { ChevronDown, ChevronRight, Search, Users, X } from 'lucide-react'
import { useState } from 'react'
import { teacherGroups } from '../../data/mockData'
import { allStudents } from '../../data/mockCoursesData'
import { Button } from '../../components/ui/Button'
import { Heading } from '../../components/ui/Typography'
import type { TeacherGroup } from '../../types'

function EditGroupModal({
  group,
  onClose,
}: {
  group: TeacherGroup
  onClose: () => void
}) {
  const [selected, setSelected] = useState<string[]>(
    group.students.map((s) => s.id)
  )
  const [search, setSearch] = useState('')

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const filteredStudents = allStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{group.title} — состав</h3>
          <button type="button" onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Поиск учеников */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск учеников по имени или email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Счётчик выбранных */}
        <div className="mb-2 text-xs text-slate-500">
          Выбрано: {selected.length} / {allStudents.length}
        </div>

        <div className="max-h-72 space-y-1 overflow-y-auto">
          {filteredStudents.length === 0 ? (
            <p className="py-4 text-center text-sm text-slate-400">Ничего не найдено</p>
          ) : (
            filteredStudents.map((student) => (
              <label key={student.id} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={selected.includes(student.id)}
                  onChange={() => toggle(student.id)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">{student.name}</p>
                  <p className="text-xs text-slate-500">{student.email}</p>
                </div>
              </label>
            ))
          )}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Отмена</Button>
          <Button variant="blue" onClick={onClose}>Сохранить</Button>
        </div>
      </div>
    </div>
  )
}

function GroupCard({ group }: { group: TeacherGroup }) {
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-slate-400" />
          <div>
            <span className="font-medium text-slate-900">{group.title}</span>
            <span className="ml-2 text-sm text-slate-500">— {group.courseTitle}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">{group.students.length} уч.</span>
          {open ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-100">
          <div className="flex justify-end px-4 py-2">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(true)}>
              Редактировать состав
            </Button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase text-slate-500">
                <th className="px-4 py-2">Ученик</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Прогресс</th>
                <th className="px-4 py-2">Баллы</th>
              </tr>
            </thead>
            <tbody>
              {group.students.map((student) => (
                <tr key={student.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-2.5 font-medium text-slate-900">{student.name}</td>
                  <td className="px-4 py-2.5 text-slate-500">{student.email}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-slate-600 transition-all"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-slate-700">{student.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && <EditGroupModal group={group} onClose={() => setModalOpen(false)} />}
    </div>
  )
}

export function TeacherGroupsPage() {
  return (
    <div>
      <Heading as="h1" className="mb-6">Мои группы</Heading>
      <div className="space-y-3">
        {teacherGroups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  )
}
