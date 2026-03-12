import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'green' | 'dark' | 'outline'
  pulse?: boolean
  className?: string
}

export default function Badge({ children, variant = 'green', pulse, className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider',
      variant === 'green' && 'bg-kase-green/15 text-kase-green border border-kase-green/30',
      variant === 'dark' && 'bg-kase-light text-kase-gray-light',
      variant === 'outline' && 'bg-transparent text-kase-gray-mid border border-kase-gray-mid/30',
      className
    )}>
      {pulse && <span className="w-2 h-2 rounded-full bg-kase-green animate-pulse" />}
      {children}
    </span>
  )
}
