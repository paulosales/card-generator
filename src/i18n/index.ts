import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './languages'
import RESOURCES from './resources'

// Note: we intentionally don't augment `CustomTypeOptions` with our
// `AppTranslations` shape here. react-i18next derives a literal-string union
// of every possible key path for `t()`, and our resource interface has more
// leaf keys than the TypeScript compiler is willing to enumerate — past that
// point it silently truncates the union, rejecting perfectly valid keys.
// `AppTranslations` still guarantees `pt.ts`/`en.ts` stay in sync (missing or
// mistyped keys fail at compile time there), which is the safety that matters.

const resources = Object.fromEntries(
  Object.entries(RESOURCES).map(([code, translation]) => [code, { translation }]),
)

function syncHtmlLang(language: string) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = language
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES.map((language) => language.code),
    nonExplicitSupportedLngs: true,
    defaultNS: 'translation',
    interpolation: {
      // React already escapes rendered values, so i18next doesn't need to.
      escapeValue: false,
    },
    detection: {
      // Prefer a language the user explicitly picked before, then fall back
      // to their browser/OS language, then the static <html lang> attribute.
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  })
  .then(() => syncHtmlLang(i18n.language))

i18n.on('languageChanged', syncHtmlLang)

export default i18n
