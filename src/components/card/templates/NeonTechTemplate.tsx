import { FONT_STACKS } from '../../../data/templates'
import { Avatar } from '../Avatar'
import { QrBadge } from '../QrBadge'
import type { CardTemplateProps } from './ClassicTemplate'
import { getContactEntries, getSocialEntries } from './shared'

/** Template 7 — Neon Tech: dark grid background with glowing neon accents. */
export function NeonTechTemplate({ card, qrDataUrl }: CardTemplateProps) {
  const contacts = getContactEntries(card)
  const socials = getSocialEntries(card)
  const showQr = card.qr.enabled && qrDataUrl

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden p-5"
      style={{ fontFamily: FONT_STACKS[card.fontFamily], backgroundColor: card.secondaryColor }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(${card.primaryColor} 1px, transparent 1px), linear-gradient(90deg, ${card.primaryColor} 1px, transparent 1px)`,
          backgroundSize: '14px 14px',
        }}
      />

      <div className="relative flex items-center gap-3">
        <Avatar photo={card.photo} fullName={card.fullName} size={52} ringColor={card.primaryColor} />
        <div className="min-w-0">
          <h3
            className="truncate text-lg font-bold tracking-wide"
            style={{ color: card.primaryColor, textShadow: `0 0 10px ${card.primaryColor}` }}
          >
            {card.fullName}
          </h3>
          <p className="truncate text-xs text-slate-300">
            {[card.jobTitle, card.company].filter(Boolean).join(' · ')}
          </p>
        </div>
      </div>

      <div className="relative mt-3 flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1 text-[11px] text-slate-200">
          {contacts.map((entry) => (
            <div key={entry.key} className="flex items-center gap-2">
              <span style={{ color: card.primaryColor }}>{entry.icon}</span>
              <span className="truncate">{entry.label}</span>
            </div>
          ))}
          {socials.length > 0 && (
            <div className="mt-1 flex gap-2" style={{ color: card.primaryColor }}>
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
