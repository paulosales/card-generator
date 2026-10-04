import { Navigate } from 'react-router-dom'
import { hasStoredCard } from '../lib/storage'

/** Sends first-time visitors to the editor, and returning users straight to their saved card. */
export function RootRedirect() {
  return <Navigate to={hasStoredCard() ? '/view' : '/design'} replace />
}
