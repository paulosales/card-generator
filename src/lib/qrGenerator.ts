import QRCode from 'qrcode'

export interface QrRenderOptions {
  size?: number
  darkColor?: string
  lightColor?: string
  margin?: number
}

/** Renders `value` as a QR Code PNG data URL, fully client-side (no network/backend). */
export async function generateQrDataUrl(value: string, options: QrRenderOptions = {}): Promise<string> {
  const { size = 240, darkColor = '#111111', lightColor = '#ffffff', margin = 1 } = options
  return QRCode.toDataURL(value, {
    width: size,
    margin,
    color: { dark: darkColor, light: lightColor },
    errorCorrectionLevel: 'M',
  })
}
