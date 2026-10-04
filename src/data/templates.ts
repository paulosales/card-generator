import type { FontFamily, TemplateOption } from '../types'

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  { id: 'classic', labelKey: 'templates.classic', defaultColors: { primary: '#1d4ed8', secondary: '#1e293b' } },
  {
    id: 'minimalist',
    labelKey: 'templates.minimalist',
    defaultColors: { primary: '#111827', secondary: '#6b7280' },
  },
  {
    id: 'modernGradient',
    labelKey: 'templates.modernGradient',
    defaultColors: { primary: '#7c3aed', secondary: '#db2777' },
  },
  {
    id: 'corporate',
    labelKey: 'templates.corporate',
    defaultColors: { primary: '#0f172a', secondary: '#2563eb' },
  },
  {
    id: 'creativeDiagonal',
    labelKey: 'templates.creativeDiagonal',
    defaultColors: { primary: '#f97316', secondary: '#111827' },
  },
  {
    id: 'darkElegant',
    labelKey: 'templates.darkElegant',
    defaultColors: { primary: '#d4af37', secondary: '#0b0b0f' },
  },
  { id: 'neonTech', labelKey: 'templates.neonTech', defaultColors: { primary: '#22d3ee', secondary: '#0f172a' } },
  {
    id: 'pastelSoft',
    labelKey: 'templates.pastelSoft',
    defaultColors: { primary: '#f472b6', secondary: '#818cf8' },
  },
  {
    id: 'geometricBold',
    labelKey: 'templates.geometricBold',
    defaultColors: { primary: '#ef4444', secondary: '#1e293b' },
  },
  {
    id: 'luxuryGold',
    labelKey: 'templates.luxuryGold',
    defaultColors: { primary: '#c9a227', secondary: '#111111' },
  },
]

export const FONT_STACKS: Record<FontFamily, string> = {
  system:
    "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  helvetica: "Helvetica, Arial, sans-serif",
  georgia: "Georgia, 'Times New Roman', serif",
  verdana: "Verdana, Geneva, sans-serif",
  mono: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
}

export const FONT_OPTIONS: { id: FontFamily; labelKey: string }[] = [
  { id: 'system', labelKey: 'fonts.system' },
  { id: 'helvetica', labelKey: 'fonts.helvetica' },
  { id: 'georgia', labelKey: 'fonts.georgia' },
  { id: 'verdana', labelKey: 'fonts.verdana' },
  { id: 'mono', labelKey: 'fonts.mono' },
]
