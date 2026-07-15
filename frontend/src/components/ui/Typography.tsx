import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'

interface HeadingProps {
  as?: HeadingLevel
  children: ReactNode
  className?: string
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: 'text-2xl font-bold sm:text-3xl text-primary',
  h2: 'text-lg font-semibold text-primary',
  h3: 'text-sm font-semibold text-primary',
  h4: 'text-xs font-semibold uppercase tracking-wider text-muted',
}

export function Heading({ as: Tag = 'h2', children, className = '' }: HeadingProps) {
  return <Tag className={cn(headingStyles[Tag], className)}>{children}</Tag>
}

type TextSize = 'sm' | 'base'
type TextColor = 'primary' | 'muted'

interface TextProps {
  children: ReactNode
  size?: TextSize
  color?: TextColor
  className?: string
}

const textStyles: Record<TextSize, string> = {
  sm: 'text-sm',
  base: 'text-base',
}

const textColors: Record<TextColor, string> = {
  primary: 'text-primary',
  muted: 'text-muted',
}

export function Text({
  children,
  size = 'sm',
  color = 'muted',
  className = '',
}: TextProps) {
  return (
    <p className={cn(textStyles[size], textColors[color], className)}>
      {children}
    </p>
  )
}