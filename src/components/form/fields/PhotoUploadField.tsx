import { useRef, useState, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { resizeImageFile } from '../../../lib/imageResize'
import { Avatar } from '../../card/Avatar'

interface PhotoUploadFieldProps {
  photo: string
  fullName: string
  onChange: (photo: string) => void
}

export function PhotoUploadField({ photo, fullName, onChange }: PhotoUploadFieldProps) {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setError(null)
    setIsProcessing(true)
    try {
      const dataUrl = await resizeImageFile(file, { size: 240, quality: 0.75 })
      onChange(dataUrl)
    } catch (err) {
      setError(
        err instanceof Error && err.message === 'invalid-image-type'
          ? t('design.photo.invalidType')
          : t('design.photo.tooLarge'),
      )
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:col-span-2">
      <span className="text-sm font-medium text-slate-700">{t('design.sections.photo.title')}</span>
      <div className="flex items-center gap-4">
        <Avatar photo={photo} fullName={fullName} size={64} placeholderColor="#94a3b8" />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isProcessing}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isProcessing ? t('common.loading') : photo ? t('design.photo.change') : t('design.photo.upload')}
            </button>
            {photo && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-rose-300 hover:text-rose-600"
              >
                {t('design.photo.remove')}
              </button>
            )}
          </div>
          <span className="text-xs text-slate-400">{t('design.photo.hint')}</span>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFile}
      />
      {error && <span className="text-xs text-rose-500">{error}</span>}
    </div>
  )
}
