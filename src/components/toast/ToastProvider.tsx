import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { ToastContext, type ToastVariant } from './ToastContext'

interface ToastItem {
  id: number
  message: string
  variant: ToastVariant
}

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: 'border-emerald-400/40 bg-emerald-500 text-white',
  error: 'border-red-400/40 bg-red-500 text-white',
  info: 'border-slate-400/40 bg-slate-800 text-white',
}

const VARIANT_ICON: Record<ToastVariant, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const idRef = useRef(0)

  const showToast = useCallback((message: string, variant: ToastVariant = 'success') => {
    const id = ++idRef.current
    setToasts((current) => [...current, { id, message, variant }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3200)
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex w-full max-w-sm items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg shadow-black/10 animate-[toast-in_0.25s_ease-out] ${VARIANT_STYLES[toast.variant]}`}
          >
            <span aria-hidden="true" className="text-base leading-none">
              {VARIANT_ICON[toast.variant]}
            </span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
