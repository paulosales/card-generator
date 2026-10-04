import { TEMPLATE_OPTIONS } from '../data/templates'
import type { CardData } from '../types'

const VALID_TEMPLATE_IDS = new Set(TEMPLATE_OPTIONS.map((option) => option.id))

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padLength = (4 - (base64.length % 4 || 4)) % 4
  const padded = base64 + '='.repeat(padLength)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

/** Minimal structural check so we never trust/persist garbage from a tampered URL. */
function isValidCardShape(value: unknown): value is CardData {
  if (!value || typeof value !== 'object') return false
  const card = value as Partial<CardData>
  return (
    typeof card.id === 'string' &&
    typeof card.fullName === 'string' &&
    typeof card.template === 'string' &&
    VALID_TEMPLATE_IDS.has(card.template as CardData['template']) &&
    typeof card.social === 'object' &&
    card.social !== null
  )
}

/** Encodes card data as a URL-safe base64 string, suitable for a query parameter. */
export function encodeCardToBase64(card: CardData): string {
  const json = JSON.stringify(card)
  const bytes = new TextEncoder().encode(json)
  return toBase64Url(bytes)
}

/** Decodes and validates a base64 query parameter back into `CardData`, or `null` if invalid. */
export function decodeCardFromBase64(value: string): CardData | null {
  try {
    const bytes = fromBase64Url(value)
    const json = new TextDecoder().decode(bytes)
    const parsed = JSON.parse(json)
    return isValidCardShape(parsed) ? parsed : null
  } catch {
    return null
  }
}
