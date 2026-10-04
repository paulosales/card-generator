export type TemplateId =
  | 'classic'
  | 'minimalist'
  | 'modernGradient'
  | 'corporate'
  | 'creativeDiagonal'
  | 'darkElegant'
  | 'neonTech'
  | 'pastelSoft'
  | 'geometricBold'
  | 'luxuryGold'

export type FontFamily = 'system' | 'helvetica' | 'georgia' | 'verdana' | 'mono'

export interface SocialLinks {
  linkedin: string
  instagram: string
  twitter: string
  github: string
  facebook: string
}

export interface QrCodeConfig {
  /** Arbitrary text/URL encoded into the QR Code (e.g. a link to the user's profile). */
  value: string
  /** Whether the QR Code should be rendered on the card. */
  enabled: boolean
}

export interface CardData {
  id: string
  fullName: string
  jobTitle: string
  company: string
  email: string
  phone: string
  whatsapp: string
  website: string
  address: string
  social: SocialLinks
  /** Small, compressed data URL (JPEG/WebP) so the share link stays short. */
  photo: string
  qr: QrCodeConfig
  template: TemplateId
  primaryColor: string
  secondaryColor: string
  fontFamily: FontFamily
  /** ISO timestamp of the last edit, used to detect newer data when merging. */
  updatedAt: string
}

export interface TemplateOption {
  id: TemplateId
  /** i18n key for the template's display name. */
  labelKey: string
  /** Default color pair applied when the user first selects this template. */
  defaultColors: { primary: string; secondary: string }
}

export type CopyResult = { success: true } | { success: false; error: unknown }
