import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-center text-xs text-slate-400 sm:px-6">
        <p>{t('footer.tagline')}</p>
        <p>{t('footer.privacyNote')}</p>
      </div>
    </footer>
  )
}
