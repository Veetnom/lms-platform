import { cn } from '../../lib/cn'
import type { LabelHTMLAttributes, ReactNode } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
}

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={cn('text-sm text-muted', className)} {...props}>
      {children}
    </label>
  )
}
