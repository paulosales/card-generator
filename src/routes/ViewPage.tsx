import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { ViewActionBar } from '../components/actions/ViewActionBar'
import { BusinessCard } from '../components/card/BusinessCard'
import { CardStage } from '../components/card/CardStage'
import { useQrCode } from '../hooks/useQrCode'
import { useToast } from '../hooks/useToast'
import { decodeCardFromBase64 } from '../lib/encoding'
import { loadStoredCard, saveStoredCard } from '../lib/storage'
import type { CardData } from '../types'

type ImportOutcome = 'imported' | 'invalid' | null

function resolveInitialCard(encoded: string | null): { card: CardData | null; outcome: ImportOutcome } {
  if (!encoded) return { card: loadStoredCard(), outcome: null }

  const decoded = decodeCardFromBase64(encoded)
  if (decoded) {
    saveStoredCard(decoded)
    return { card: decoded, outcome: 'imported' }
  }
  return { card: loadStoredCard(), outcome: 'invalid' }
}

export function ViewPage() {
  const { t } = useTranslation()
  const { showToast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  // Computed once, synchronously, from the URL present at mount — this is a
  // one-time import of a shared link, not state that should react to further
  // navigation, so it belongs in the lazy initializer rather than an effect.
  const [{ card, outcome }] = useState(() => resolveInitialCard(searchParams.get('data')))

  useEffect(() => {
    if (outcome === 'imported') showToast(t('view.importedToast'), 'success')
    if (outcome === 'invalid') showToast(t('view.invalidLinkToast'), 'error')
    if (searchParams.has('data')) {
      // Strip the (potentially large) query param once it's been persisted,
      // so reloading/sharing this tab doesn't depend on the URL anymore.
      setSearchParams({}, { replace: true })
    }
    // Runs once, right after the import decision made during initial render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const qrDataUrl = useQrCode(card?.qr.value ?? '', card?.qr.enabled ?? false)

  if (!card) {
    return (
      <main className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <h2 className="text-xl font-bold text-slate-900">{t('view.emptyTitle')}</h2>
        <p className="text-sm text-slate-500">{t('view.emptyDescription')}</p>
        <Link
          to="/design"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          {t('view.createCta')}
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-4 py-10 sm:px-6">
      <CardStage>
        <BusinessCard card={card} qrDataUrl={qrDataUrl} />
      </CardStage>
      <ViewActionBar card={card} />
    </main>
  )
}
