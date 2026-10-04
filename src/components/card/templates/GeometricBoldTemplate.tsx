import { FONT_STACKS } from '../../../data/templates'
import { Avatar } from '../Avatar'
import { QrBadge } from '../QrBadge'
import type { CardTemplateProps } from './ClassicTemplate'
import { getContactEntries, getSocialEntries } from './shared'

/** Template 9 — Bold Geometric: strong overlapping shapes as background decoration. */
export function GeometricBoldTemplate({ card, qrDataUrl }: CardTemplateProps) {
  const contacts = getContactEntries(card)
  const socials = getSocialEntries(card)
  const showQr = card.qr.enabled && qrDataUrl

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden p-5 text-white"
      style={{ fontFamily: FONT_STACKS[card.fontFamily], backgroundColor: card.secondaryColor }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full"
        style={{ backgroundColor: card.primaryColor }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 left-10 h-20 w-20"
        style={{ backgroundColor: card.primaryColor, opacity: 0.4, transform: 'rotate(20deg)' }}
      />
      <div
        className="pointer-events-none absolute bottom-6 right-16 h-10 w-10 rounded-full border-2"
        style={{ borderColor: card.primaryColor }}
      />

      <div className="relative flex items-center gap-3">
        <Avatar photo={card.photo} fullName={card.fullName} size={52} ringColor={card.primaryColor} />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-black uppercase">{card.fullName}</h3>
          <p className="truncate text-xs text-white/80">
            {[card.jobTitle, card.company].filter(Boolean).join(' · ')}
          </p>
        </div>
      </div>

      <div className="relative mt-3 flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1 text-[11px] text-white/90">
          {contacts.map((entry) => (
            <div key={entry.key} className="flex items-center gap-2">
              {entry.icon}
              <span className="truncate">{entry.label}</span>
            </div>
          ))}
          {socials.length > 0 && (
            <div className="mt-1 flex gap-2 text-white/90">
              {socials.map((entry) => (
                <span key={entry.key}>{entry.icon}</span>
              ))}
            </div>
          )}
        </div>
        {showQr && <QrBadge dataUrl={qrDataUrl} size={44} className="relative" />}
      </div>
    </div>
  )
}
