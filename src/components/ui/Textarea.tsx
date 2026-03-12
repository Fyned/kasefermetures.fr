import { forwardRef, type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className = '', id, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error && id ? `${id}-error` : undefined}
        className={`w-full rounded-lg border bg-kase-light px-4 py-3 text-kase-white placeholder-kase-gray-mid outline-none transition-all duration-300 resize-vertical min-h-[120px] ${
          error
            ? 'border-red-500 focus:ring-2 focus:ring-red-500/40'
            : 'border-kase-charcoal focus:border-kase-green focus:ring-2 focus:ring-kase-green/30'
        } ${className}`}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
