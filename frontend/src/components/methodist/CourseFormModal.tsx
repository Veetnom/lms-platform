import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Button } from '../ui/Button'

export interface CourseFormData {
  title: string
  price: string
  shortDesc: string
  fullDesc: string
}

interface CourseFormModalProps {
  onClose: () => void
  onCreate: (data: CourseFormData) => void
}

export function CourseFormModal({ onClose, onCreate }: CourseFormModalProps) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [fullDesc, setFullDesc] = useState('')

  const handleSave = () => {
    onCreate({ title, price, shortDesc, fullDesc })
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Modal onClose={onClose} title="Создание курса">
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
        <Button variant="secondary" onClick={handleCancel}>Отмена</Button>
        <Button variant="blue" onClick={handleSave}>Создать курс</Button>
      </div>
    </Modal>
  )
}