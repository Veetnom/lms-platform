import { cn } from '../../lib/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'orange' | 'purple' | 'blue' | 'green' | 'dark' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800',
  secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
  orange: 'bg-orange-500 text-white hover:bg-orange-600',
  purple: 'bg-violet-600 text-white hover:bg-violet-700',
  blue: 'bg-blue-600 text-white hover:bg-blue-700',
  green: 'bg-green-700 text-white hover:bg-green-800',
  dark: 'bg-slate-900 text-white hover:bg-slate-800',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  variant = 'secondary',
  size = 'md',
  children,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:opacity-50',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
