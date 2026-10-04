import type { ReactNode } from 'react'
import {
  FacebookIcon,
  GitHubIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TwitterIcon,
  WhatsAppIcon,
} from '../icons'
import type { CardData } from '../../../types'

export interface ContactEntry {
  key: string
  icon: ReactNode
  label: string
  href?: string
}

/** Builds the list of non-empty contact rows (phone/whatsapp/email/site/address) for a card. */
export function getContactEntries(card: CardData): ContactEntry[] {
  const entries: ContactEntry[] = []
  if (card.phone) {
    entries.push({
      key: 'phone',
      icon: <PhoneIcon />,
      label: card.phone,
      href: `tel:${card.phone.replace(/[^+\d]/g, '')}`,
    })
  }
  if (card.whatsapp) {
    entries.push({
      key: 'whatsapp',
      icon: <WhatsAppIcon />,
      label: card.whatsapp,
      href: `https://wa.me/${card.whatsapp.replace(/[^\d]/g, '')}`,
    })
  }
  if (card.email) {
    entries.push({ key: 'email', icon: <MailIcon />, label: card.email, href: `mailto:${card.email}` })
  }
  if (card.website) {
    entries.push({
      key: 'website',
      icon: <GlobeIcon />,
      label: card.website.replace(/^https?:\/\//, ''),
      href: card.website,
    })
  }
  if (card.address) {
    entries.push({ key: 'address', icon: <MapPinIcon />, label: card.address })
  }
  return entries
}

export interface SocialEntry {
  key: string
  icon: ReactNode
  href: string
}

/** Builds the list of non-empty social icon links for a card. */
export function getSocialEntries(card: CardData): SocialEntry[] {
  const entries: SocialEntry[] = []
  if (card.social.linkedin) entries.push({ key: 'linkedin', icon: <LinkedInIcon />, href: card.social.linkedin })
  if (card.social.instagram)
    entries.push({ key: 'instagram', icon: <InstagramIcon />, href: card.social.instagram })
  if (card.social.twitter) entries.push({ key: 'twitter', icon: <TwitterIcon />, href: card.social.twitter })
  if (card.social.github) entries.push({ key: 'github', icon: <GitHubIcon />, href: card.social.github })
  if (card.social.facebook)
    entries.push({ key: 'facebook', icon: <FacebookIcon />, href: card.social.facebook })
  return entries
}

export function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  const first = parts[0][0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : ''
  return `${first}${last}`.toUpperCase()
}
