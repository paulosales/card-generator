import type { CopyResult } from '../types'

/** Copies plain text to the clipboard, with a legacy `execCommand` fallback. */
export async function copyText(text: string): Promise<CopyResult> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return { success: true }
    } catch (err) {
      return copyTextFallback(text, err)
    }
  }
  return copyTextFallback(text)
}

function copyTextFallback(text: string, previousError?: unknown): CopyResult {
  if (typeof document === 'undefined') {
    return { success: false, error: previousError ?? new Error('document is not available') }
  }
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    const succeeded = document.execCommand('copy')
    document.body.removeChild(textarea)
    return succeeded ? { success: true } : { success: false, error: previousError }
  } catch (err) {
    return { success: false, error: err ?? previousError }
  }
}
