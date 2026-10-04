import type { ReactNode } from 'react'
import { ScaledCardPreview } from './ScaledCardPreview'

/** Centered stage that hosts the card preview at a comfortable max width. */
export function CardStage({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <ScaledCardPreview className="shadow-xl ring-1 ring-black/5">{children}</ScaledCardPreview>
    </div>
  )
}
