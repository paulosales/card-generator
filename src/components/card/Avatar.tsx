import { getInitials } from './templates/shared'

interface AvatarProps {
  photo: string
  fullName: string
  size?: number
  ringColor?: string
  placeholderColor?: string
  className?: string
}

/** Round avatar: shows the uploaded photo, or a colored initials placeholder when there is none. */
export function Avatar({
  photo,
  fullName,
  size = 56,
  ringColor,
  placeholderColor = '#64748b',
  className = '',
}: AvatarProps) {
  const style = { width: size, height: size, boxShadow: ringColor ? `0 0 0 2px ${ringColor}` : undefined }

  if (photo) {
    return (
      <img
        src={photo}
        alt={fullName}
        style={style}
        className={`shrink-0 rounded-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      style={{ ...style, backgroundColor: placeholderColor }}
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${className}`}
    >
      <span style={{ fontSize: size * 0.36 }}>{getInitials(fullName)}</span>
    </div>
  )
}
