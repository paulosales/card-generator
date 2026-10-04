import { FONT_STACKS } from '../../../data/templates'
import { Avatar } from '../Avatar'
import { QrBadge } from '../QrBadge'
import type { CardTemplateProps } from './ClassicTemplate'
import { getContactEntries, getSocialEntries } from './shared'

/** Template 10 — Luxury Gold: black background framed in gold, centered elegant layout. */
export function LuxuryGoldTemplate({ card, qrDataUrl }: CardTemplateProps) {
  const contacts = getContactEntries(card)
  const socials = getSocialEntries(card)
  const showQr = card.qr.enabled && qrDataUrl

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center gap-2 p-5 text-center text-slate-100"
      style={{ fontFamily: FONT_STACKS[card.fontFamily], backgroundColor: card.secondaryColor }}
    >
      <div
        className="pointer-events-none absolute inset-2 rounded-sm border"
        style={{ borderColor: card.primaryColor }}
      />

      <Avatar photo={card.photo} fullName={card.fullName} size={48} ringColor={card.primaryColor} />
      <h3 className="text-base font-semibold tracking-[0.15em]" style={{ color: card.primaryColor }}>
        {card.fullName.toUpperCase()}
      </h3>
      <p className="text-[10px] uppercase tracking-widest text-slate-300">
        {[card.jobTitle, card.company].filter(Boolean).join(' · ')}
      </p>

      <div className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-[10px] text-slate-300">
        {contacts.map((entry) => (
          <span key={entry.key} className="inline-flex items-center gap-1">
            <span style={{ color: card.primaryColor }}>{entry.icon}</span>
            {entry.label}
          </span>
        ))}
      </div>

      {socials.length > 0 && (
        <div className="flex gap-2" style={{ color: card.primaryColor }}>
          {socials.map((entry) => (
            <span key={entry.key}>{entry.icon}</span>
          ))}
        </div>
      )}

      {showQr && <QrBadge dataUrl={qrDataUrl} size={40} className="absolute bottom-3 right-3" />}
    </div>
  )
}
