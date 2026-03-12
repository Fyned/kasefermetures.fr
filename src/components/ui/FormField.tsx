import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  id: string
  error?: string
  required?: boolean
  children: ReactNode
}

export default function FormField({ label, id, error, required, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-kase-gray-light">
        {label}
        {required && <span className="ml-1 text-kase-green">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
