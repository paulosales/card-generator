import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DesignActionBar } from '../components/actions/DesignActionBar'
import { BusinessCard } from '../components/card/BusinessCard'
import { CardStage } from '../components/card/CardStage'
import { CardForm } from '../components/form/CardForm'
import { useCardStorage } from '../hooks/useCardStorage'
import { useQrCode } from '../hooks/useQrCode'
import { buildShareUrl } from '../lib/shareLink'
import type { CardData, SocialLinks } from '../types'

export function DesignPage() {
  const { t } = useTranslation()
  const { card, updateCard, resetCard } = useCardStorage()
  const qrDataUrl = useQrCode(card.qr.value, card.qr.enabled)
  const shareUrl = useMemo(() => buildShareUrl(card), [card])

  const handleFieldChange = <K extends keyof CardData>(field: K, value: CardData[K]) => {
    updateCard((current) => ({ ...current, [field]: value }))
  }

  const handleSocialChange = <K extends keyof SocialLinks>(field: K, value: string) => {
    updateCard((current) => ({ ...current, social: { ...current.social, [field]: value } }))
  }

  const handleQrChange = <K extends keyof CardData['qr']>(field: K, value: CardData['qr'][K]) => {
    updateCard((current) => ({ ...current, qr: { ...current.qr, [field]: value } }))
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">{t('design.heading')}</h2>
        <p className="mt-1 text-sm text-slate-500">{t('design.subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <CardForm
          card={card}
          onFieldChange={handleFieldChange}
          onSocialChange={handleSocialChange}
          onQrChange={handleQrChange}
          shareUrl={shareUrl}
        />
        <div className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
          <CardStage>
            <BusinessCard card={card} qrDataUrl={qrDataUrl} />
          </CardStage>
          <DesignActionBar shareUrl={shareUrl} onReset={resetCard} />
        </div>
      </div>
    </main>
  )
}
