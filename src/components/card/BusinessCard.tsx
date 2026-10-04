import type { CardData } from '../../types'
import { ClassicTemplate } from './templates/ClassicTemplate'
import { CorporateTemplate } from './templates/CorporateTemplate'
import { CreativeDiagonalTemplate } from './templates/CreativeDiagonalTemplate'
import { DarkElegantTemplate } from './templates/DarkElegantTemplate'
import { GeometricBoldTemplate } from './templates/GeometricBoldTemplate'
import { LuxuryGoldTemplate } from './templates/LuxuryGoldTemplate'
import { MinimalistTemplate } from './templates/MinimalistTemplate'
import { ModernGradientTemplate } from './templates/ModernGradientTemplate'
import { NeonTechTemplate } from './templates/NeonTechTemplate'
import { PastelSoftTemplate } from './templates/PastelSoftTemplate'

interface BusinessCardProps {
  card: CardData
  qrDataUrl: string | null
}

/** Dispatches to the template component matching `card.template`. */
export function BusinessCard({ card, qrDataUrl }: BusinessCardProps) {
  switch (card.template) {
    case 'minimalist':
      return <MinimalistTemplate card={card} qrDataUrl={qrDataUrl} />
    case 'modernGradient':
      return <ModernGradientTemplate card={card} qrDataUrl={qrDataUrl} />
    case 'corporate':
      return <CorporateTemplate card={card} qrDataUrl={qrDataUrl} />
    case 'creativeDiagonal':
      return <CreativeDiagonalTemplate card={card} qrDataUrl={qrDataUrl} />
    case 'darkElegant':
      return <DarkElegantTemplate card={card} qrDataUrl={qrDataUrl} />
    case 'neonTech':
      return <NeonTechTemplate card={card} qrDataUrl={qrDataUrl} />
    case 'pastelSoft':
      return <PastelSoftTemplate card={card} qrDataUrl={qrDataUrl} />
    case 'geometricBold':
      return <GeometricBoldTemplate card={card} qrDataUrl={qrDataUrl} />
    case 'luxuryGold':
      return <LuxuryGoldTemplate card={card} qrDataUrl={qrDataUrl} />
    case 'classic':
    default:
      return <ClassicTemplate card={card} qrDataUrl={qrDataUrl} />
  }
}
