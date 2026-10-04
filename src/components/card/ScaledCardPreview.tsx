import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Canonical design size for every template (standard credit-card ratio, 7:4). */
export const CARD_BASE_WIDTH = 350
export const CARD_BASE_HEIGHT = 200

interface ScaledCardPreviewProps {
  children: ReactNode
  className?: string
}

/**
 * Renders `children` at a fixed canonical pixel size, then scales the whole
 * thing down (via CSS transform + ResizeObserver) to fit whatever container
 * width it's placed in. This keeps every template's typography/spacing
 * pixel-identical everywhere it's shown (editor preview, template picker
 * thumbnails, share dialog, view page) regardless of viewport size.
 */
export function ScaledCardPreview({ children, className = '' }: ScaledCardPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const updateScale = (width: number) => setScale(width / CARD_BASE_WIDTH)
    updateScale(element.clientWidth)

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? element.clientWidth
      updateScale(width)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[7/4] w-full overflow-hidden rounded-2xl ${className}`}
    >
      <div
        style={{
          width: CARD_BASE_WIDTH,
          height: CARD_BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}
