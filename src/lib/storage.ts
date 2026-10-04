import type { CardData } from '../types'

export const CARD_STORAGE_KEY = 'businessCard:data'

/** Reads the persisted card from `localStorage`, tolerating corrupt/missing data. */
export function loadStoredCard(): CardData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CARD_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as CardData
  } catch {
    return null
  }
}

export function saveStoredCard(card: CardData): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(card))
}

export function hasStoredCard(): boolean {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(CARD_STORAGE_KEY) !== null
}

export function clearStoredCard(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(CARD_STORAGE_KEY)
}
