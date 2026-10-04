import { FONT_STACKS } from '../../../data/templates'
import { Avatar } from '../Avatar'
import { QrBadge } from '../QrBadge'
import type { CardTemplateProps } from './ClassicTemplate'
import { getContactEntries, getSocialEntries } from './shared'

/** Template 3 — Modern Gradient: vibrant diagonal gradient background, white text. */
export function ModernGradientTemplate({ card, qrDataUrl }: CardTemplateProps) {
  const contacts = getContactEntries(card)
  const socials = getSocialEntries(card)
  const showQr = card.qr.enabled && qrDataUrl

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden p-5 text-white"
      style={{
        fontFamily: FONT_STACKS[card.fontFamily],
        backgroundImage: `linear-gradient(135deg, ${card.primaryColor}, ${card.secondaryColor})`,
      }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-white/10" />

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar photo={card.photo} fullName={card.fullName} size={52} ringColor="rgba(255,255,255,0.6)" />
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold">{card.fullName}</h3>
            <p className="truncate text-xs text-white/80">
              {[card.jobTitle, card.company].filter(Boolean).join(' · ')}
            </p>
          </div>
        </div>
        {showQr && <QrBadge dataUrl={qrDataUrl} size={48} />}
      </div>

      <div className="relative mt-3 flex flex-col gap-1 text-[11px] text-white/90">
        {contacts.map((entry) => (
          <div key={entry.key} className="flex items-center gap-2">
            {entry.icon}
            <span className="truncate">{entry.label}</span>
          </div>
        ))}
      </div>

      {socials.length > 0 && (
        <div className="relative mt-2 flex gap-2 text-white/90">
          {socials.map((entry) => (
            <span key={entry.key}>{entry.icon}</span>
          ))}
        </div>
      )}
    </div>
  )
}
