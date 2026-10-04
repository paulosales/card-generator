import { FONT_STACKS } from '../../../data/templates'
import type { CardData } from '../../../types'
import { Avatar } from '../Avatar'
import { QrBadge } from '../QrBadge'
import { getContactEntries, getSocialEntries } from './shared'

export interface CardTemplateProps {
  card: CardData
  qrDataUrl: string | null
}

/** Template 1 — Classic: photo on the left with a vertical divider, contact list on the right. */
export function ClassicTemplate({ card, qrDataUrl }: CardTemplateProps) {
  const contacts = getContactEntries(card)
  const socials = getSocialEntries(card)
  const showQr = card.qr.enabled && qrDataUrl

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between bg-white p-5 text-slate-800"
      style={{ fontFamily: FONT_STACKS[card.fontFamily] }}
    >
      <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: card.primaryColor }} />
      <div className="flex items-start gap-4">
        <Avatar photo={card.photo} fullName={card.fullName} size={56} placeholderColor={card.primaryColor} />
        <div
          className="h-14 w-px shrink-0"
          style={{ backgroundColor: card.primaryColor, opacity: 0.3 }}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold" style={{ color: card.primaryColor }}>
            {card.fullName}
          </h3>
          <p className="truncate text-xs text-slate-500">
            {[card.jobTitle, card.company].filter(Boolean).join(' · ')}
          </p>
        </div>
        {showQr && <QrBadge dataUrl={qrDataUrl} size={48} />}
      </div>

      <div className="mt-3 flex flex-col gap-1 text-[11px]">
        {contacts.map((entry) => (
          <div key={entry.key} className="flex items-center gap-2 text-slate-600">
            <span style={{ color: card.secondaryColor }}>{entry.icon}</span>
            <span className="truncate">{entry.label}</span>
          </div>
        ))}
      </div>

      {socials.length > 0 && (
        <div className="mt-2 flex gap-2" style={{ color: card.secondaryColor }}>
          {socials.map((entry) => (
            <span key={entry.key}>{entry.icon}</span>
          ))}
        </div>
      )}
    </div>
  )
}
