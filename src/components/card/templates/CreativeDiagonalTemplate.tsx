import { FONT_STACKS } from '../../../data/templates'
import { Avatar } from '../Avatar'
import { QrBadge } from '../QrBadge'
import type { CardTemplateProps } from './ClassicTemplate'
import { getContactEntries, getSocialEntries } from './shared'

/** Template 5 — Creative Diagonal: bold diagonal color split. */
export function CreativeDiagonalTemplate({ card, qrDataUrl }: CardTemplateProps) {
  const contacts = getContactEntries(card)
  const socials = getSocialEntries(card)
  const showQr = card.qr.enabled && qrDataUrl

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-white p-5 text-slate-800"
      style={{ fontFamily: FONT_STACKS[card.fontFamily] }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rotate-45"
        style={{ backgroundColor: card.primaryColor }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-6 h-24 w-24 rotate-45"
        style={{ backgroundColor: card.secondaryColor, opacity: 0.85 }}
      />

      <div className="relative flex items-center gap-3">
        <Avatar photo={card.photo} fullName={card.fullName} size={52} placeholderColor={card.secondaryColor} />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-extrabold uppercase tracking-tight">{card.fullName}</h3>
          <p className="truncate text-xs font-medium" style={{ color: card.primaryColor }}>
            {[card.jobTitle, card.company].filter(Boolean).join(' · ')}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-3 flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1 text-[11px] text-slate-600">
          {contacts.map((entry) => (
            <div key={entry.key} className="flex items-center gap-2">
              {entry.icon}
              <span className="truncate">{entry.label}</span>
            </div>
          ))}
          {socials.length > 0 && (
            <div className="mt-1 flex gap-2 text-slate-500">
              {socials.map((entry) => (
                <span key={entry.key}>{entry.icon}</span>
              ))}
            </div>
          )}
        </div>
        {showQr && <QrBadge dataUrl={qrDataUrl} size={44} className="relative z-10" />}
      </div>
    </div>
  )
}
