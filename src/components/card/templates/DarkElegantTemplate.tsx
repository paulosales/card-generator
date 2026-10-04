import { FONT_STACKS } from '../../../data/templates'
import { Avatar } from '../Avatar'
import { QrBadge } from '../QrBadge'
import type { CardTemplateProps } from './ClassicTemplate'
import { getContactEntries, getSocialEntries } from './shared'

/** Template 6 — Dark Elegant: near-black background, thin gold rule, serif-leaning name. */
export function DarkElegantTemplate({ card, qrDataUrl }: CardTemplateProps) {
  const contacts = getContactEntries(card)
  const socials = getSocialEntries(card)
  const showQr = card.qr.enabled && qrDataUrl

  return (
    <div
      className="flex h-full w-full flex-col justify-between p-5 text-slate-200"
      style={{ fontFamily: FONT_STACKS[card.fontFamily], backgroundColor: card.secondaryColor }}
    >
      <div className="flex items-center gap-3">
        <Avatar photo={card.photo} fullName={card.fullName} size={52} ringColor={card.primaryColor} />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold tracking-wide" style={{ color: card.primaryColor }}>
            {card.fullName}
          </h3>
          <p className="truncate text-xs text-slate-400">
            {[card.jobTitle, card.company].filter(Boolean).join(' · ')}
          </p>
        </div>
      </div>

      <div className="my-2 h-px w-full" style={{ backgroundColor: card.primaryColor, opacity: 0.35 }} />

      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1 text-[11px] text-slate-300">
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
        {showQr && <QrBadge dataUrl={qrDataUrl} size={44} />}
      </div>
    </div>
  )
}
