import { FONT_STACKS } from '../../../data/templates'
import { Avatar } from '../Avatar'
import { QrBadge } from '../QrBadge'
import type { CardTemplateProps } from './ClassicTemplate'
import { getContactEntries, getSocialEntries } from './shared'

/** Template 4 — Corporate: dark sidebar with identity, light content area with contact details. */
export function CorporateTemplate({ card, qrDataUrl }: CardTemplateProps) {
  const contacts = getContactEntries(card)
  const socials = getSocialEntries(card)
  const showQr = card.qr.enabled && qrDataUrl

  return (
    <div
      className="flex h-full w-full overflow-hidden bg-white text-slate-800"
      style={{ fontFamily: FONT_STACKS[card.fontFamily] }}
    >
      <div
        className="flex w-[38%] shrink-0 flex-col items-center justify-center gap-2 p-3 text-center text-white"
        style={{ backgroundColor: card.primaryColor }}
      >
        <Avatar photo={card.photo} fullName={card.fullName} size={52} ringColor="rgba(255,255,255,0.4)" />
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold leading-tight">{card.fullName}</h3>
          <p className="truncate text-[10px] text-white/80">{card.jobTitle}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="truncate text-sm font-semibold" style={{ color: card.secondaryColor }}>
            {card.company}
          </p>
          <div className="mt-2 flex flex-col gap-1 text-[11px] text-slate-600">
            {contacts.map((entry) => (
              <div key={entry.key} className="flex items-center gap-2">
                <span style={{ color: card.primaryColor }}>{entry.icon}</span>
                <span className="truncate">{entry.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between">
          {socials.length > 0 ? (
            <div className="flex gap-2 text-slate-400">
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
    </div>
  )
}
