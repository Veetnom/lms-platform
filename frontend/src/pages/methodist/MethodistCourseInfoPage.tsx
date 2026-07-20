import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Heading, Text } from '../../components/ui/Typography'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { mockCourseInfo } from '../../data/mockCoursesData'

export function MethodistCourseInfoPage() {
  const { id = '1' } = useParams()

  const [title, setTitle] = useState(mockCourseInfo.title)
  const [price, setPrice] = useState(mockCourseInfo.price)
  const [shortDesc, setShortDesc] = useState(mockCourseInfo.shortDesc)
  const [fullDesc, setFullDesc] = useState(mockCourseInfo.fullDesc)
  const [isPublished, setIsPublished] = useState(mockCourseInfo.isPublished)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [showPublishConfirm, setShowPublishConfirm] = useState(false)

  const handleSave = () => {
    // TODO: сохранить через API
  }

  const handleCancel = () => {
    setShowCancelConfirm(true)
  }

  const handlePublish = () => {
    setIsPublished(true)
    setShowPublishConfirm(false)
    // TODO: отправить запрос на публикацию
  }

  return (
    <div>
      <Heading as="h1" className="mb-4">Название курса</Heading>
      <div className="mb-6">
        <CourseTabs courseId={id} role="methodist" />
      </div>

      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Название курса"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Стоимость"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Textarea
            label="Краткое описание"
            rows={3}
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Textarea
            label="Полное описание"
            rows={8}
            value={fullDesc}
            onChange={(e) => setFullDesc(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Text size="sm" className="mb-1 block font-medium text-slate-500">
            Статус
          </Text>
          <div className="flex items-center gap-3">
            {isPublished ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Опубликован
              </span>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  Черновик
                </span>
                <Button variant="green" size="sm" onClick={() => setShowPublishConfirm(true)}>
                  Опубликовать
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={handleCancel}>Отмена</Button>
          <Button variant="blue" onClick={handleSave}>Сохранить</Button>
        </div>
      </Card>

      <ConfirmDialog
        isOpen={showCancelConfirm}
        title="Подтверждение"
        message="Все несохранённые изменения будут потеряны. Отменить?"
        confirmLabel="Отменить изменения"
        variant="default"
        onConfirm={() => setShowCancelConfirm(false)}
        onCancel={() => setShowCancelConfirm(false)}
      />

      <ConfirmDialog
        isOpen={showPublishConfirm}
        title="Публикация курса"
        message="После публикации курс станет доступен ученикам. Продолжить?"
        confirmLabel="Опубликовать"
        variant="default"
        onConfirm={handlePublish}
        onCancel={() => setShowPublishConfirm(false)}
      />
    </div>
  )
}