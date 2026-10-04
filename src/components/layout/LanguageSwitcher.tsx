import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES } from '../../i18n/languages'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const currentLanguage = i18n.language.split('-')[0]

  return (
    <label className="flex items-center gap-2 text-xs text-slate-500">
      <span className="sr-only">{t('languageSwitcher.label')}</span>
      <select
        value={currentLanguage}
        onChange={(event) => i18n.changeLanguage(event.target.value)}
        aria-label={t('languageSwitcher.label')}
        className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <option key={language.code} value={language.code}>
            {language.nativeName}
          </option>
        ))}
      </select>
    </label>
  )
}
