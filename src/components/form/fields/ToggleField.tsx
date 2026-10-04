interface ToggleFieldProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function ToggleField({ label, checked, onChange }: ToggleFieldProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 sm:col-span-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onChange(!checked)
          }
        }}
        tabIndex={0}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 ${
          checked ? 'bg-blue-600' : 'bg-slate-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </span>
    </label>
  )
}
