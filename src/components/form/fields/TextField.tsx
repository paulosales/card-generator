import type { ChangeEvent } from 'react'

interface TextFieldProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'tel' | 'url'
  required?: boolean
  hint?: string
}

export function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  hint,
}: TextFieldProps) {
  return (
    <label htmlFor={name} className="flex flex-col gap-1">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </span>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </label>
  )
}
