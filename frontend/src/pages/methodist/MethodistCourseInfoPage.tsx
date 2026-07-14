import { useParams } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'

export function MethodistCourseInfoPage() {
  const { id = '1' } = useParams()

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">Название курса</h1>
      <div className="mb-6">
        <CourseTabs courseId={id} role="methodist" />
      </div>

      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Название курса" defaultValue="Русский язык" />
          <Input label="Стоимость" defaultValue="24165" />
        </div>
        <div className="mt-4">
          <label className="mb-1 block text-sm text-slate-500">Краткое описание</label>
          <textarea
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            rows={3}
            defaultValue="Основной курс 3.0 — это комплексная система подготовки к ЕГЭ по русскому языку на максимум!"
          />
        </div>
        <div className="mt-4">
          <label className="mb-1 block text-sm text-slate-500">Полное описание</label>
          <textarea
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            rows={8}
            defaultValue="Подробная программа курса включает в себя все разделы языкознания: орфографию, пунктуацию, лексику, грамматику. Каждый модуль содержит теоретические материалы и практические задания."
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input label="Статус" defaultValue="Опубликован" />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary">Отмена</Button>
          <Button variant="blue">Сохранить</Button>
        </div>
      </Card>
    </div>
  )
}