import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
}

export function Checkbox({ label, className = '', id, ...props }: CheckboxProps) {
  const checkboxId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s/g, '-') : undefined)

  const input = (
    <input
      type="checkbox"
      id={checkboxId}
      className={cn(
        'h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20',
        className
      )}
      {...props}
    />
  )

  if (!label) return input

  return (
    <label htmlFor={checkboxId} className="flex cursor-pointer items-center gap-3">
      {input}
      <span className="text-sm text-slate-900">{label}</span>
    </label>
  )
}
