import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQrCode } from '../../hooks/useQrCode'
import { copyText } from '../../lib/clipboard'
import { SHARE_URL_WARNING_LENGTH } from '../../lib/shareLink'

interface ShareDialogProps {
  shareUrl: string
  onClose: () => void
}

export function ShareDialog({ shareUrl, onClose }: ShareDialogProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const qrDataUrl = useQrCode(shareUrl, true)
  const isTooLong = shareUrl.length > SHARE_URL_WARNING_LENGTH

  const handleCopy = async () => {
    const result = await copyText(shareUrl)
    setCopied(result.success)
    if (result.success) {
      window.setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={t('share.title')}
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{t('share.title')}</h2>
            <p className="mt-1 text-sm text-slate-500">{t('share.description')}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="shrink-0 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {qrDataUrl && (
          <div className="flex flex-col items-center gap-2">
            <img src={qrDataUrl} alt={t('share.title')} width={160} height={160} className="rounded-lg" />
            <p className="text-center text-xs text-slate-500">{t('share.scanHint')}</p>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">{t('share.linkLabel')}</span>
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl}
              onFocus={(event) => event.currentTarget.select()}
              className="w-full truncate rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-600"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              {copied ? t('share.copied') : t('share.copyLink')}
            </button>
          </div>
        </div>

        {isTooLong && (
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">{t('share.sizeWarning')}</p>
        )}

        <a
          href={shareUrl}
          target="_blank"
          rel="noreferrer"
          className="text-center text-xs font-medium text-blue-600 underline-offset-2 hover:underline"
        >
          {t('share.openInNewTab')}
        </a>
      </div>
    </div>
  )
}
