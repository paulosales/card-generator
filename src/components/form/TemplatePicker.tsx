import { useTranslation } from 'react-i18next'
import { TEMPLATE_OPTIONS } from '../../data/templates'
import type { CardData, TemplateId } from '../../types'
import { BusinessCard } from '../card/BusinessCard'
import { ScaledCardPreview } from '../card/ScaledCardPreview'

interface TemplatePickerProps {
  card: CardData
  onSelect: (template: TemplateId) => void
}

/** Grid of live-rendered thumbnails (actual template + current data, scaled down) to pick from. */
export function TemplatePicker({ card, onSelect }: TemplatePickerProps) {
  const { t } = useTranslation()

  return (
    <div className="sm:col-span-2">
      <span className="text-sm font-medium text-slate-700">{t('design.fields.template.label')}</span>
      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {TEMPLATE_OPTIONS.map((option) => {
          const isActive = card.template === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={isActive}
              className={`flex flex-col gap-1.5 rounded-lg border p-2 text-left transition ${
                isActive
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="pointer-events-none w-full">
                <ScaledCardPreview className="ring-1 ring-black/5">
                  <BusinessCard
                    card={{ ...card, template: option.id, qr: { ...card.qr, enabled: false } }}
                    qrDataUrl={null}
                  />
                </ScaledCardPreview>
              </div>
              <span className="text-xs font-semibold text-slate-900">{t(option.labelKey + '.label')}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
