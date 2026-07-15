import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface ModalProps {
  title: string
  children: ReactNode
  footer?: ReactNode
  onClose: () => void
  className?: string
}

export function Modal({ title, children, footer, onClose, className = '' }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className={cn('w-full max-w-lg rounded-xl bg-white p-6 shadow-xl', className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-100"
            aria-label="Р—Р°РєСЂС‹С‚СЊ"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {children}

        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  )
}
