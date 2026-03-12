import { cn } from '../../lib/utils'

interface SectionTitleProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  light?: boolean
}

export default function SectionTitle({ label, title, subtitle, align = 'center', light }: SectionTitleProps) {
  return (
    <div className={cn('mb-12', align === 'center' && 'text-center')}>
      {label && (
        <span className="inline-block text-kase-green text-sm font-semibold uppercase tracking-widest mb-3">
          {label}
        </span>
      )}
      <h2 className={cn(
        'font-bold leading-tight',
        'text-2xl md:text-3xl lg:text-4xl',
        light ? 'text-kase-anthracite' : 'text-white'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 text-base md:text-lg max-w-2xl',
          align === 'center' && 'mx-auto',
          light ? 'text-kase-gray-dark' : 'text-kase-gray-mid'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
