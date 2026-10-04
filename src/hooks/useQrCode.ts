import { useEffect, useState } from 'react'
import { generateQrDataUrl } from '../lib/qrGenerator'

/** Regenerates the QR Code PNG data URL whenever `value`/`enabled` change. */
export function useQrCode(value: string, enabled: boolean): string | null {
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const trimmedValue = value.trim()
  const isActive = enabled && trimmedValue.length > 0

  useEffect(() => {
    if (!isActive) return
    let cancelled = false
    generateQrDataUrl(trimmedValue)
      .then((url) => {
        if (!cancelled) setDataUrl(url)
      })
      .catch(() => {
        if (!cancelled) setDataUrl(null)
      })
    return () => {
      cancelled = true
    }
  }, [trimmedValue, isActive])

  // Masks any stale/in-flight data URL the instant the QR Code is disabled or
  // cleared, without needing a synchronous setState at the top of the effect.
  return isActive ? dataUrl : null
}
