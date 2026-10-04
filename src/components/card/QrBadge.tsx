interface QrBadgeProps {
  dataUrl: string
  size?: number
  className?: string
}

/** Small white-framed QR Code tile, meant to sit in a corner of the card. */
export function QrBadge({ dataUrl, size = 56, className = '' }: QrBadgeProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center rounded-md bg-white p-1 shadow-sm ${className}`}
    >
      <img src={dataUrl} alt="QR Code" width={size - 8} height={size - 8} className="h-full w-full" />
    </div>
  )
}
