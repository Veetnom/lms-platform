import { useState, useEffect, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Link as LinkExtension } from '@tiptap/extension-link'
import { TextAlign } from '@tiptap/extension-text-align'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import {
  Plus,
  X,
  GripVertical,
  ChevronDown,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Strikethrough,
  Code,
  Undo2,
  Redo2,
  Trash2,
  Save,
  List,
  ListOrdered,
  Quote,
  Minus,
  Braces,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  CheckSquare,
  Table as TableIcon,
} from 'lucide-react'
import { ConfirmDialog } from '../ui/ConfirmDialog'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AnswerOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface Step {
  id: number
  title: string
  content: string
  options: AnswerOption[]
  points: number
  answerType: 'single' | 'multiple' | 'text'
}

export interface StepEditorProps {
  steps: Step[]
  activeStepId: number
  onStepsChange: (steps: Step[]) => void
  onActiveStepChange: (id: number) => void
  onAddStep: () => void
  onDeleteStep: () => void
  /** Показывать блок настроек (тип ответа, варианты) */
  showSettings?: boolean
  /** Показывать поле баллов */
  showPoints?: boolean
  /** Доступные типы ответа */
  answerTypes?: ('single' | 'multiple' | 'text')[]
  /** Кнопка сохранения (кастомный контент справа внизу) */
  saveButton?: React.ReactNode
  /** Кастомная левая кнопка внизу (вместо "Удалить шаг") */
  bottomLeft?: React.ReactNode
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeOption = (): AnswerOption => ({
  id: `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  text: '',
  isCorrect: false,
})

// ─── Toolbar (Tiptap) ──────────────────────────────────────────────────────────

const toolbarBtn =
  'p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed'
const toolbarBtnActive = 'p-1.5 rounded bg-slate-200 text-slate-800 transition-colors'

interface ToolbarProps {
  editor: NonNullable<ReturnType<typeof useEditor>>
}

function EditorToolbar({ editor }: ToolbarProps) {
  // ── Ссылка ──
  const handleLink = useCallback(() => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run()
      return
    }
    const url = window.prompt('Введите URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  // ── Таблица ──
  const handleInsertTable = useCallback(() => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }, [editor])

  const handleAddColumnBefore = useCallback(() => {
    editor.chain().focus().addColumnBefore().run()
  }, [editor])

  const handleAddColumnAfter = useCallback(() => {
    editor.chain().focus().addColumnAfter().run()
  }, [editor])

  const handleAddRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run()
  }, [editor])

  const handleAddRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run()
  }, [editor])

  const handleDeleteColumn = useCallback(() => {
    editor.chain().focus().deleteColumn().run()
  }, [editor])

  const handleDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run()
  }, [editor])

  const handleDeleteTable = useCallback(() => {
    editor.chain().focus().deleteTable().run()
  }, [editor])

  // ── Состояние для выпадающего меню таблицы ──
  const [tableMenuOpen, setTableMenuOpen] = useState(false)
  const inTable = editor.isActive('table')

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 px-4 py-2">
      {/* Undo / Redo */}
      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={toolbarBtn}>
        <Undo2 className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={toolbarBtn}>
        <Redo2 className="h-4 w-4" />
      </button>

      <div className="mx-1 h-5 w-px bg-slate-200" />

      {/* Заголовки */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? toolbarBtnActive : toolbarBtn}
        title="Заголовок 1"
      >
        <Heading1 className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? toolbarBtnActive : toolbarBtn}
        title="Заголовок 2"
      >
        <Heading2 className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? toolbarBtnActive : toolbarBtn}
        title="Заголовок 3"
      >
        <Heading3 className="h-4 w-4" />
      </button>

      <div className="mx-1 h-5 w-px bg-slate-200" />

      {/* Форматирование */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? toolbarBtnActive : toolbarBtn} title="Жирный">
        <Bold className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? toolbarBtnActive : toolbarBtn} title="Курсив">
        <Italic className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? toolbarBtnActive : toolbarBtn} title="Зачёркнутый">
        <Strikethrough className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? toolbarBtnActive : toolbarBtn} title="Код (inline)">
        <Code className="h-4 w-4" />
      </button>

      <div className="mx-1 h-5 w-px bg-slate-200" />

      {/* Списки */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? toolbarBtnActive : toolbarBtn} title="Маркированный список">
        <List className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? toolbarBtnActive : toolbarBtn} title="Нумерованный список">
        <ListOrdered className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleTaskList().run()} className={editor.isActive('taskList') ? toolbarBtnActive : toolbarBtn} title="Чекбокс-список">
        <CheckSquare className="h-4 w-4" />
      </button>

      <div className="mx-1 h-5 w-px bg-slate-200" />

      {/* Выравнивание */}
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? toolbarBtnActive : toolbarBtn} title="По левому краю">
        <AlignLeft className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? toolbarBtnActive : toolbarBtn} title="По центру">
        <AlignCenter className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? toolbarBtnActive : toolbarBtn} title="По правому краю">
        <AlignRight className="h-4 w-4" />
      </button>

      <div className="mx-1 h-5 w-px bg-slate-200" />

      {/* Ссылка */}
      <button onClick={handleLink} className={editor.isActive('link') ? toolbarBtnActive : toolbarBtn} title="Ссылка">
        <Link className="h-4 w-4" />
      </button>

      <div className="mx-1 h-5 w-px bg-slate-200" />

      {/* Блоки */}
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? toolbarBtnActive : toolbarBtn} title="Цитата">
        <Quote className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? toolbarBtnActive : toolbarBtn} title="Блок кода">
        <Braces className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={toolbarBtn} title="Разделитель">
        <Minus className="h-4 w-4" />
      </button>

      {/* Таблица — выпадающее меню */}
      <div className="mx-1 h-5 w-px bg-slate-200" />
      <div className="relative">
        <button
          onClick={() => setTableMenuOpen((prev) => !prev)}
          className={inTable ? toolbarBtnActive : toolbarBtn}
          title="Таблица"
        >
          <TableIcon className="h-4 w-4" />
        </button>
        {tableMenuOpen && (
          <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            {!inTable ? (
              <button onClick={() => { handleInsertTable(); setTableMenuOpen(false) }} className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                Вставить таблицу 3×3
              </button>
            ) : (
              <>
                <button onClick={() => { handleAddColumnBefore(); setTableMenuOpen(false) }} className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                  Добавить столбец слева
                </button>
                <button onClick={() => { handleAddColumnAfter(); setTableMenuOpen(false) }} className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                  Добавить столбец справа
                </button>
                <button onClick={() => { handleAddRowBefore(); setTableMenuOpen(false) }} className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                  Добавить строку сверху
                </button>
                <button onClick={() => { handleAddRowAfter(); setTableMenuOpen(false) }} className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                  Добавить строку снизу
                </button>
                <div className="my-1 border-t border-slate-100" />
                <button onClick={() => { handleDeleteColumn(); setTableMenuOpen(false) }} className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">
                  Удалить колонку
                </button>
                <button onClick={() => { handleDeleteRow(); setTableMenuOpen(false) }} className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">
                  Удалить строку
                </button>
                <button onClick={() => { handleDeleteTable(); setTableMenuOpen(false) }} className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">
                  Удалить таблицу
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Затемнение при открытом меню */}
      {tableMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setTableMenuOpen(false)} />}
    </div>
  )
}

// ─── Answer Option Row (с drag-and-drop) ─────────────────────────────────────

interface AnswerRowProps {
  option: AnswerOption
  answerType: 'single' | 'multiple'
  index: number
  allOptions: AnswerOption[]
  onChange: (id: string, text: string) => void
  onSelect: (id: string) => void
  onRemove: (id: string) => void
  onReorder: (options: AnswerOption[]) => void
}

function AnswerOptionRow({ option, answerType, index, allOptions, onChange, onSelect, onRemove, onReorder }: AnswerRowProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', String(index))
    e.dataTransfer.effectAllowed = 'move'
    const el = e.currentTarget as HTMLElement
    el.classList.add('opacity-50')
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const fromIndex = Number(e.dataTransfer.getData('text/plain'))
    if (isNaN(fromIndex) || fromIndex === index) return
    const updated = [...allOptions]
    const [moved] = updated.splice(fromIndex, 1)
    updated.splice(index, 0, moved)
    onReorder(updated)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    const el = e.currentTarget as HTMLElement
    el.classList.remove('opacity-50')
  }

  return (
    <div
      className="group flex items-center gap-2"
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      <button className="cursor-grab text-slate-300 hover:text-slate-500 transition-colors active:cursor-grabbing">
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition-colors hover:border-slate-300">
        <input
          type="text"
          value={option.text}
          onChange={(e) => onChange(option.id, e.target.value)}
          placeholder="Введите вариант ответа"
          className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
        <button onClick={() => onSelect(option.id)} className="shrink-0">
          {answerType === 'single' ? (
            <div
              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors ${
                option.isCorrect ? 'border-blue-500' : 'border-slate-300'
              }`}
            >
              {option.isCorrect && <div className="h-2 w-2 rounded-full bg-blue-500" />}
            </div>
          ) : (
            <div
              className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-colors ${
                option.isCorrect ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
              }`}
            >
              {option.isCorrect && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              )}
            </div>
          )}
        </button>
      </div>
      <button
        onClick={() => onRemove(option.id)}
        className="shrink-0 text-slate-300 opacity-0 transition-colors hover:text-red-400 group-hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

// ─── Step Editor ─────────────────────────────────────────────────────────────

export function StepEditor({
  steps,
  activeStepId,
  onStepsChange,
  onActiveStepChange,
  onAddStep,
  onDeleteStep,
  showSettings = true,
  showPoints = true,
  answerTypes = ['single', 'multiple', 'text'],
  saveButton,
  bottomLeft,
}: StepEditorProps) {
  const activeStep = steps.find((s) => s.id === activeStepId)

  // Подтверждение удаления
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  // ── Tiptap editor ──
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({ placeholder: 'Введите текст…' }),
      LinkExtension.configure({
        openOnClick: true,
        HTMLAttributes: { class: 'text-blue-600 underline cursor-pointer hover:text-blue-800' },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: activeStep?.content ?? '',
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML()
      onStepsChange(
        steps.map((s) => (s.id !== activeStepId ? s : { ...s, content: html }))
      )
    },
  })

  // Обновляем editor.content при смене шага
  useEffect(() => {
    if (editor && activeStep) {
      const current = editor.getHTML()
      if (current !== activeStep.content) {
        editor.commands.setContent(activeStep.content ?? '')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStepId, editor])

  // ── Step helpers ──

  const updateStepField = <K extends keyof Step>(key: K, value: Step[K]) => {
    onStepsChange(
      steps.map((s) => (s.id !== activeStepId ? s : { ...s, [key]: value }))
    )
  }

  // ── Option helpers ──

  const updateOption = (optId: string, text: string) => {
    onStepsChange(
      steps.map((s) =>
        s.id !== activeStepId
          ? s
          : { ...s, options: s.options.map((o) => (o.id === optId ? { ...o, text } : o)) }
      )
    )
  }

  const selectOption = (optId: string) => {
    onStepsChange(
      steps.map((s) => {
        if (s.id !== activeStepId) return s
        return {
          ...s,
          options: s.options.map((o) =>
            s.answerType === 'single'
              ? { ...o, isCorrect: o.id === optId }
              : { ...o, isCorrect: o.id === optId ? !o.isCorrect : o.isCorrect }
          ),
        }
      })
    )
  }

  const removeOption = (optId: string) => {
    onStepsChange(
      steps.map((s) =>
        s.id !== activeStepId ? s : { ...s, options: s.options.filter((o) => o.id !== optId) }
      )
    )
  }

  const addOption = () => {
    onStepsChange(
      steps.map((s) =>
        s.id !== activeStepId ? s : { ...s, options: [...s.options, makeOption()] }
      )
    )
  }

  const reorderOptions = (newOptions: AnswerOption[]) => {
    onStepsChange(
      steps.map((s) =>
        s.id !== activeStepId ? s : { ...s, options: newOptions }
      )
    )
  }

  const handleDeleteConfirm = () => {
    onDeleteStep()
    setDeleteConfirmOpen(false)
  }

  return (
    <>
      {/* Шаги — кружочки */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => onActiveStepChange(step.id)}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                activeStepId === step.id
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {step.id}
            </button>
          ))}
          <button
            onClick={onAddStep}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-slate-300 text-slate-400 transition-colors hover:border-blue-400 hover:text-blue-500"
          >
            <Plus className="h-4 w-4" />
          </button>
          <span className="ml-auto text-xs text-slate-400">
            Шаг {activeStepId} из {steps.length}
          </span>
        </div>

        {/* Название шага */}
        <div className="border-b border-slate-100 px-6 py-4">
          <input
            type="text"
            value={activeStep?.title ?? ''}
            onChange={(e) => updateStepField('title', e.target.value)}
            placeholder="Введите название шага"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Tiptap Toolbar */}
        {editor && <EditorToolbar editor={editor} />}

        {/* Tiptap Editor */}
        <div className="px-6 py-4">
          <EditorContent
            editor={editor}
            className="tiptap-editor prose prose-sm max-w-none"
          />
        </div>
      </div>

      {/* Настройки — только если showSettings */}
      {showSettings && activeStep && (
        <div className="space-y-5 rounded-xl border border-slate-200 bg-white px-6 py-5">
          <h3 className="font-semibold text-slate-800">Настройки</h3>

          {/* Тип ответа */}
          <div className="relative inline-block">
            <select
              value={activeStep.answerType}
              onChange={(e) => updateStepField('answerType', e.target.value as 'single' | 'multiple' | 'text')}
              className="appearance-none cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none transition-colors focus:border-blue-400"
            >
              {answerTypes.includes('single') && (
                <option value="single">Один вариант ответа</option>
              )}
              {answerTypes.includes('multiple') && (
                <option value="multiple">Несколько вариантов</option>
              )}
              {answerTypes.includes('text') && (
                <option value="text">Развернутый ответ</option>
              )}
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {/* Варианты ответа — скрыты для text */}
          {activeStep.answerType !== 'text' && (
            <div>
              <h4 className="mb-3 text-sm font-medium text-slate-700">Варианты ответа</h4>
              <div className="space-y-2">
                {activeStep.options.map((opt, optIndex) => (
                  <AnswerOptionRow
                    key={opt.id}
                    option={opt}
                    index={optIndex}
                    allOptions={activeStep.options}
                    answerType={activeStep.answerType as 'single' | 'multiple'}
                    onChange={updateOption}
                    onSelect={selectOption}
                    onRemove={removeOption}
                    onReorder={reorderOptions}
                  />
                ))}
                <button
                  onClick={addOption}
                  className="mt-1 w-full rounded-lg border border-slate-200 py-2.5 text-sm text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  Добавить вариант
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Нижняя панель */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center gap-2">
          {bottomLeft}
          <button
            onClick={() => setDeleteConfirmOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Удалить шаг
          </button>
        </div>

        <div className="flex items-center gap-4">
          {showPoints && (
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap text-xs text-slate-500">Баллы за правильный ответ</label>
              <input
                type="number"
                min={0}
                value={activeStep?.points ?? 0}
                onChange={(e) => updateStepField('points', Number(e.target.value))}
                className="w-16 rounded-lg border border-slate-200 px-3 py-2 text-center text-sm text-slate-700 outline-none transition-colors focus:border-blue-400"
              />
            </div>
          )}
          {saveButton ?? (
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              Сохранить
            </button>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Удаление шага"
        message="Вы уверены, что хотите удалить этот шаг?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </>
  )
}