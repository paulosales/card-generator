import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useInstallPrompt } from '../../hooks/useInstallPrompt'
import { useToast } from '../../hooks/useToast'
import { downloadVCard } from '../../lib/vcard'
import type { CardData } from '../../types'

interface ViewActionBarProps {
  card: CardData
}

export function ViewActionBar({ card }: ViewActionBarProps) {
  const { t } = useTranslation()
  const { showToast } = useToast()
  const { canInstall, installed, promptInstall } = useInstallPrompt()

  const handleSaveContact = () => {
    downloadVCard(card)
    showToast(t('view.savedToast'), 'success')
  }

  const handleInstall = async () => {
    await promptInstall()
  }

  return (
    <div className="flex flex-col gap-3">
      {canInstall && (
        <button
          type="button"
          onClick={handleInstall}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          {t('install.installNow')}
        </button>
      )}
      {installed && (
        <span className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
          {t('install.installedBadge')} · {t('view.offlineReady')}
        </span>
      )}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleSaveContact}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
        >
          {t('view.saveContactButton')}
        </button>
        <Link
          to="/design"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
        >
          {t('view.editButton')}
        </Link>
      </div>
    </div>
  )
}
