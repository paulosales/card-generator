import { useCallback, useState } from 'react'
import { createDefaultCard } from '../data/defaultCard'
import { loadStoredCard, saveStoredCard } from '../lib/storage'
import type { CardData } from '../types'

export type CardUpdater = CardData | ((current: CardData) => CardData)

/** Loads the active card from `localStorage` (or a sample default) and keeps it persisted on every edit. */
export function useCardStorage() {
  const [card, setCardState] = useState<CardData>(() => loadStoredCard() ?? createDefaultCard())

  const updateCard = useCallback((updater: CardUpdater) => {
    setCardState((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      const withTimestamp: CardData = { ...next, updatedAt: new Date().toISOString() }
      saveStoredCard(withTimestamp)
      return withTimestamp
    })
  }, [])

  const resetCard = useCallback(() => {
    updateCard(createDefaultCard())
  }, [updateCard])

  return { card, updateCard, resetCard }
}
