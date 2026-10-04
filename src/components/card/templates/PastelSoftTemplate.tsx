import { FONT_STACKS } from '../../../data/templates'
import { Avatar } from '../Avatar'
import { QrBadge } from '../QrBadge'
import type { CardTemplateProps } from './ClassicTemplate'
import { getContactEntries, getSocialEntries } from './shared'

/** Template 8 — Soft Pastel: gentle gradient, big friendly avatar, rounded contact chips. */
export function PastelSoftTemplate({ card, qrDataUrl }: CardTemplateProps) {
  const contacts = getContactEntries(card)
  const socials = getSocialEntries(card)
  const showQr = card.qr.enabled && qrDataUrl

  return (
    <div
      className="flex h-full w-full flex-col justify-between p-5 text-slate-700"
      style={{
        fontFamily: FONT_STACKS[card.fontFamily],
        backgroundImage: `linear-gradient(135deg, ${card.primaryColor}33, ${card.secondaryColor}33)`,
      }}
    >
      <div className="flex items-center gap-3">
        <Avatar photo={card.photo} fullName={card.fullName} size={58} placeholderColor={card.primaryColor} />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold">{card.fullName}</h3>
          <p className="truncate text-xs text-slate-500">
            {[card.jobTitle, card.company].filter(Boolean).join(' · ')}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {contacts.map((entry) => (
          <span
            key={entry.key}
            className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-1 text-[10px] text-slate-600"
          >
            <span style={{ color: card.secondaryColor }}>{entry.icon}</span>
            <span className="max-w-[120px] truncate">{entry.label}</span>
          </span>
        ))}
      </div>

      <div className="mt-2 flex items-end justify-between">
        {socials.length > 0 ? (
          <div className="flex gap-2" style={{ color: card.secondaryColor }}>
            {socials.map((entry) => (
              <span key={entry.key}>{entry.icon}</span>
            ))}
          </div>
        ) : (
          <span />
        )}
        {showQr && <QrBadge dataUrl={qrDataUrl} size={44} />}
      </div>
    </div>
  )
}
