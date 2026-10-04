export interface ResizeOptions {
  /** Output is a square of this size (cover-cropped), in pixels. */
  size?: number
  /** JPEG quality between 0 and 1. */
  quality?: number
}

const VALID_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

/**
 * Resizes/compresses an uploaded image client-side (FileReader + canvas) into a
 * small square JPEG data URL, so card photos stay tiny enough to fit in a
 * shareable URL. Never touches a network/backend.
 */
export function resizeImageFile(file: File, options: ResizeOptions = {}): Promise<string> {
  const { size = 240, quality = 0.75 } = options

  if (!VALID_IMAGE_TYPES.has(file.type)) {
    return Promise.reject(new Error('invalid-image-type'))
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('read-failed'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('decode-failed'))
      image.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = size
          canvas.height = size
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('canvas-unavailable'))
            return
          }

          // Cover-crop: scale so the shorter side fills `size`, then center-crop.
          const scale = size / Math.min(image.width, image.height)
          const drawWidth = image.width * scale
          const drawHeight = image.height * scale
          const offsetX = (size - drawWidth) / 2
          const offsetY = (size - drawHeight) / 2
          ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)

          resolve(canvas.toDataURL('image/jpeg', quality))
        } catch (err) {
          reject(err instanceof Error ? err : new Error('resize-failed'))
        }
      }
      image.src = typeof reader.result === 'string' ? reader.result : ''
    }
    reader.readAsDataURL(file)
  })
}
