import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/Button'
import type { Person } from '../../data/mockTeachers'

interface AddPersonModalProps {
  title: string
  people: Person[]
  selectedIds: string[]
  onToggle: (id: string) => void
  onClose: () => void
  onSave: () => void
}

export function AddPersonModal({
  title,
  people,
  selectedIds,
  onToggle,
  onClose,
  onSave,
}: AddPersonModalProps) {
  const [search, setSearch] = useState('')

  const filtered = people.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button type="button" onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Поиск */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Счётчик */}
        <div className="mb-2 text-xs text-slate-500">
          Выбрано: {selectedIds.length} / {people.length}
        </div>

        {/* Список */}
        <div className="max-h-72 space-y-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="py-4 text-center text-sm text-slate-400">Ничего не найдено</p>
          ) : (
            filtered.map((person) => (
              <label key={person.id} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(person.id)}
                  onChange={() => onToggle(person.id)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">{person.name}</p>
                  <p className="text-xs text-slate-500">{person.email}</p>
                </div>
              </label>
            ))
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Отмена</Button>
          <Button variant="blue" onClick={onSave}>Сохранить</Button>
        </div>
      </div>
    </div>
  )
}