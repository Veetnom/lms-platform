import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Единый контейнер для контента страницы.
 * Используется внутри <main> — добавляет отступы и ограничение ширины.
 */
export function PageContainer({ children, className = '' }: PageContainerProps) {
  return <div className={cn('mx-auto w-full max-w-5xl space-y-6', className)}>{children}</div>
}