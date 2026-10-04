import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ShareDialog } from '../share/ShareDialog'

interface DesignActionBarProps {
  shareUrl: string
  onReset: () => void
}

export function DesignActionBar({ shareUrl, onReset }: DesignActionBarProps) {
  const { t } = useTranslation()
  const [shareOpen, setShareOpen] = useState(false)

  const handleReset = () => {
    if (window.confirm(t('design.resetConfirm'))) {
      onReset()
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setShareOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        {t('share.button')}
      </button>
      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/view"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
        >
          {t('design.previewButton')}
        </Link>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-rose-300 hover:text-rose-600"
        >
          {t('design.resetButton')}
        </button>
      </div>

      {shareOpen && <ShareDialog shareUrl={shareUrl} onClose={() => setShareOpen(false)} />}
    </div>
  )
}
