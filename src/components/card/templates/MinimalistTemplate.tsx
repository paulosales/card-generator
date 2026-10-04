import { FONT_STACKS } from '../../../data/templates'
import { QrBadge } from '../QrBadge'
import type { CardTemplateProps } from './ClassicTemplate'
import { getContactEntries, getSocialEntries } from './shared'

/** Template 2 — Minimalist: lots of white space, thin rule, no color blocks. */
export function MinimalistTemplate({ card, qrDataUrl }: CardTemplateProps) {
  const contacts = getContactEntries(card)
  const socials = getSocialEntries(card)
  const showQr = card.qr.enabled && qrDataUrl

  return (
    <div
      className="flex h-full w-full flex-col justify-between bg-white p-6 text-slate-900"
      style={{ fontFamily: FONT_STACKS[card.fontFamily] }}
    >
      <div>
        <h3 className="text-xl font-light tracking-wide">{card.fullName}</h3>
        <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-slate-400">
          {[card.jobTitle, card.company].filter(Boolean).join(' — ')}
        </p>
        <div className="mt-3 h-px w-10" style={{ backgroundColor: card.primaryColor }} />
      </div>

      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1 text-[11px] text-slate-600">
          {contacts.slice(0, 4).map((entry) => (
            <span key={entry.key} className="truncate">
              {entry.label}
            </span>
          ))}
          {socials.length > 0 && (
            <div className="mt-1 flex gap-2 text-slate-400">
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
