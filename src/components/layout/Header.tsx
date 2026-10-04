import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { t } = useTranslation()

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-1.5 text-sm font-medium transition ${
      isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
    }`

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{t('header.title')}</h1>
            <p className="max-w-xl text-xs text-slate-500 sm:text-sm">{t('header.subtitle')}</p>
          </div>
          <LanguageSwitcher />
        </div>
        <nav className="flex gap-2">
          <NavLink to="/design" className={navLinkClass}>
            {t('nav.design')}
          </NavLink>
          <NavLink to="/view" className={navLinkClass}>
            {t('nav.view')}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
