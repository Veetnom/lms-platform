import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: boolean
}

export function Card({ children, className, padding = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white shadow-sm',
        padding && 'p-4 sm:p-6',
        className,
      )}
    >
      {children}
    </div>
  )
}
