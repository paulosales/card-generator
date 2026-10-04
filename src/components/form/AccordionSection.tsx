import type { ReactNode } from 'react'

interface AccordionSectionProps {
  title: string
  description?: string
  defaultOpen?: boolean
  children: ReactNode
}

/** Native `<details>`-based disclosure: accessible, keyboard friendly, zero extra JS state. */
export function AccordionSection({
  title,
  description,
  defaultOpen = false,
  children,
}: AccordionSectionProps) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-xl border border-slate-200 bg-white shadow-sm open:shadow-md"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 select-none">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
        </div>
        <span
          aria-hidden="true"
          className="shrink-0 rounded-full border border-slate-300 p-1 text-slate-500 transition-transform duration-200 group-open:rotate-180"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </summary>
      <div className="grid grid-cols-1 gap-4 border-t border-slate-100 px-4 py-4 sm:grid-cols-2">
        {children}
      </div>
    </details>
  )
}
