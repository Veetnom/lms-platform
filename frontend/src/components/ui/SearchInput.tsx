import { Search } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { InputHTMLAttributes } from 'react'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        type="search"
        placeholder="Поиск..."
        className="w-full rounded-lg border border-border py-2 pl-9 pr-3 text-sm outline-none transition focus:border-info focus:ring-2 focus:ring-info/20"
        {...props}
      />
    </div>
  )
}
