export interface SupportedLanguage {
  /** BCP-47 language code used as the i18next language key. */
  code: string
  /** Name of the language written in the language itself. */
  nativeName: string
}

/**
 * Curated list of the world's most spoken languages (by total speakers),
 * spanning Europe, the Middle East, South/East/Southeast Asia and Africa.
 * `pt` is kept first as the default language.
 */
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'pt', nativeName: 'Português' },
  { code: 'en', nativeName: 'English' },
  { code: 'zh', nativeName: '中文' },
  { code: 'hi', nativeName: 'हिन्दी' },
  { code: 'es', nativeName: 'Español' },
  { code: 'fr', nativeName: 'Français' },
  { code: 'ar', nativeName: 'العربية' },
  { code: 'bn', nativeName: 'বাংলা' },
  { code: 'ru', nativeName: 'Русский' },
  { code: 'ur', nativeName: 'اردو' },
  { code: 'id', nativeName: 'Bahasa Indonesia' },
  { code: 'de', nativeName: 'Deutsch' },
  { code: 'ja', nativeName: '日本語' },
  { code: 'sw', nativeName: 'Kiswahili' },
  { code: 'ta', nativeName: 'தமிழ்' },
  { code: 'tr', nativeName: 'Türkçe' },
  { code: 'vi', nativeName: 'Tiếng Việt' },
  { code: 'ko', nativeName: '한국어' },
  { code: 'fa', nativeName: 'فارسی' },
  { code: 'it', nativeName: 'Italiano' },
  { code: 'nl', nativeName: 'Nederlands' },
  { code: 'pl', nativeName: 'Polski' },
  { code: 'th', nativeName: 'ไทย' },
  { code: 'uk', nativeName: 'Українська' },
]

export const DEFAULT_LANGUAGE = 'pt'
