interface ColorFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const HEX_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

export function ColorField({ label, value, onChange }: ColorFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          aria-label={`${label} (seletor)`}
          value={HEX_PATTERN.test(value) ? value : '#000000'}
          onChange={(event) => onChange(event.target.value)}
          className="h-9 w-10 cursor-pointer rounded-md border border-slate-300 bg-white p-0.5"
        />
        <input
          type="text"
          aria-label={`${label} (hexadecimal)`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="#000000"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  )
}
