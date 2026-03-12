import { type ReactNode, type ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'ghost' | 'ghost-light' | 'outline' | 'text'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  external?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  loading?: boolean
  fullWidth?: boolean
  children: ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-kase-green text-white hover:bg-kase-green-dark',
  ghost: 'bg-transparent text-kase-anthracite border border-gray-300 hover:bg-gray-100',
  'ghost-light': 'bg-transparent text-white border border-white/30 hover:bg-white/10',
  outline: 'bg-transparent text-kase-green border border-kase-green hover:bg-kase-green hover:text-white',
  text: 'bg-transparent text-kase-green hover:text-kase-green-light',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  leftIcon,
  rightIcon,
  loading,
  fullWidth,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 cursor-pointer',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-50 pointer-events-none',
    className
  )

  const content = (
    <>
      {loading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </>
  )

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    )
  }

  if (href) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  )
}
