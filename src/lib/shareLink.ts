import { encodeCardToBase64 } from './encoding'
import type { CardData } from '../types'

/**
 * Soft threshold above which the share URL is likely to hit practical limits
 * in some browsers, chat apps or QR Code readers (reliable QR scanning
 * degrades quickly past a few KB of data).
 */
export const SHARE_URL_WARNING_LENGTH = 6000

export function buildShareUrl(card: CardData): string {
  const base = import.meta.env.BASE_URL ?? '/'
  const path = `${base.endsWith('/') ? base : `${base}/`}view`
  const encoded = encodeCardToBase64(card)
  const url = new URL(path, window.location.origin)
  url.searchParams.set('data', encoded)
  return url.toString()
}
