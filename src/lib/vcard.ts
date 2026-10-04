import type { CardData } from '../types'
import { slugify } from './slug'

function escapeVCardValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

/** Builds a vCard 3.0 payload so the card can be imported directly into a phone's Contacts app. */
export function buildVCard(card: CardData): string {
  const lines = ['BEGIN:VCARD', 'VERSION:3.0']

  if (card.fullName) {
    lines.push(`FN:${escapeVCardValue(card.fullName)}`)
    const [first, ...rest] = card.fullName.trim().split(/\s+/)
    const last = rest.join(' ')
    lines.push(`N:${escapeVCardValue(last)};${escapeVCardValue(first ?? '')};;;`)
  }
  if (card.company) lines.push(`ORG:${escapeVCardValue(card.company)}`)
  if (card.jobTitle) lines.push(`TITLE:${escapeVCardValue(card.jobTitle)}`)
  if (card.email) lines.push(`EMAIL;TYPE=INTERNET:${escapeVCardValue(card.email)}`)
  if (card.phone) lines.push(`TEL;TYPE=WORK,VOICE:${escapeVCardValue(card.phone)}`)
  if (card.whatsapp) lines.push(`TEL;TYPE=CELL:${escapeVCardValue(card.whatsapp)}`)
  if (card.website) lines.push(`URL:${escapeVCardValue(card.website)}`)
  if (card.address) lines.push(`ADR;TYPE=WORK:;;${escapeVCardValue(card.address)};;;;`)
  if (card.social.linkedin) lines.push(`URL;TYPE=LinkedIn:${escapeVCardValue(card.social.linkedin)}`)
  if (card.photo.startsWith('data:image/')) {
    const [, meta, data] = card.photo.match(/^data:(image\/\w+);base64,(.*)$/) ?? []
    if (data) {
      const subtype = meta?.split('/')[1]?.toUpperCase() ?? 'JPEG'
      lines.push(`PHOTO;ENCODING=b;TYPE=${subtype}:${data}`)
    }
  }

  lines.push('END:VCARD')
  return lines.join('\r\n')
}

/** Triggers a client-side download of a `.vcf` contact file built from the card data. */
export function downloadVCard(card: CardData): void {
  const content = buildVCard(card)
  const blob = new Blob([content], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${slugify(card.fullName)}.vcf`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
