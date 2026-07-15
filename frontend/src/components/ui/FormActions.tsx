import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Button } from './Button'

interface FormActionsProps {
  onCancel?: () => void
  onSave?: () => void
  cancelLabel?: string
  saveLabel?: string
  cancelVariant?: 'secondary' | 'danger'
  saveVariant?: 'blue' | 'primary'
  leftAction?: ReactNode
  className?: string
}

export function FormActions({
  onCancel,
  onSave,
  cancelLabel = 'РћС‚РјРµРЅР°',
  saveLabel = 'РЎРѕС…СЂР°РЅРёС‚СЊ',
  cancelVariant = 'secondary',
  saveVariant = 'blue',
  leftAction,
  className = '',
}: FormActionsProps) {
  return (
    <div
      className={cn(
        'mt-6 flex flex-col gap-3 sm:flex-row',
        leftAction ? 'sm:justify-between' : 'sm:justify-end',
        className
      )}
    >
      {leftAction}
      <div className="flex gap-3 sm:justify-end">
        {onCancel && (
          <Button type="button" variant={cancelVariant} onClick={onCancel}>
            {cancelLabel}
          </Button>
        )}
        {onSave && (
          <Button type="button" variant={saveVariant} onClick={onSave}>
            {saveLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
