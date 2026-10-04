/** Converts a display name into a safe, lowercase file-name-friendly slug. */
export function slugify(value: string, fallback = 'cartao'): string {
  return (
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || fallback
  )
}
