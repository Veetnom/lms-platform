import { cn } from '../../lib/cn'
import type { TextareaHTMLAttributes } from 'react'
import { Label } from './Label'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function Textarea({ label, className, id, ...props }: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label htmlFor={textareaId}>{label}</Label>}
      <textarea
        id={textareaId}
        className={cn(
          'w-full rounded-lg border border-border px-3 py-2 text-sm outline-none transition focus:border-info focus:ring-2 focus:ring-info/20',
          'resize-y',
          className,
        )}
        {...props}
      />
    </div>
  )
}
