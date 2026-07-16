import { Input } from '../ui/Input'

interface ModuleFormData {
  title: string
  startDate: string
  requiredPoints: number
}

interface ModuleFormProps {
  data: ModuleFormData
  onChange: (data: ModuleFormData) => void
}

export function ModuleForm({ data, onChange }: ModuleFormProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Input
        label="Модуль"
        placeholder="Название модуля"
        value={data.title}
        onChange={(e) => onChange({ ...data, title: e.target.value })}
      />
      <Input
        label="Начало модуля"
        type="date"
        value={data.startDate}
        onChange={(e) => onChange({ ...data, startDate: e.target.value })}
      />
      <Input
        label="Необходимо баллов"
        placeholder="200"
        type="number"
        value={data.requiredPoints}
        onChange={(e) =>
          onChange({ ...data, requiredPoints: Number(e.target.value) })
        }
      />
    </div>
  )
}