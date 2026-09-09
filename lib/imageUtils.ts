/**
 * Normalizes image URLs from Google Drive, Dropbox, and other cloud providers
 * into fast, direct, embeddable image CDN links or high-speed proxy endpoints.
 */
export function normalizeImageUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string') return ''
  let trimmed = url.trim()

  // Handle broken/partial protocols
  if (trimmed.startsWith('://')) {
    trimmed = 'https' + trimmed
  } else if (
    !trimmed.startsWith('http://') &&
    !trimmed.startsWith('https://') &&
    !trimmed.startsWith('/') &&
    !trimmed.startsWith('data:')
  ) {
    trimmed = 'https://' + trimmed
  }

  // Extract Google Drive file IDs from all known formats including /api/proxy-image?id=...
  const gDriveMatch = trimmed.match(
    /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=view&)?id=)|docs\.google\.com\/(?:file\/d\/|open\?id=)|googleusercontent\.com\/d\/|proxy-image\?(?:.*&)?id=)([a-zA-Z0-9_-]{20,})/i
  )
  if (gDriveMatch && gDriveMatch[1]) {
    const fileId = gDriveMatch[1]
    return `https://lh3.googleusercontent.com/d/${fileId}=w1200-rw`
  }

  // Already a googleusercontent link with custom params
  if (trimmed.includes('googleusercontent.com/d/')) {
    if (!trimmed.includes('=')) {
      return `${trimmed}=w1200-rw`
    }
    return trimmed
  }

  // Unsplash links: Ensure fast WebP compression and format
  if (trimmed.includes('images.unsplash.com')) {
    const separator = trimmed.includes('?') ? '&' : '?'
    if (!trimmed.includes('auto=format')) {
      return `${trimmed}${separator}auto=format&fit=crop&q=80`
    }
    return trimmed
  }

  // Dropbox links: convert ?dl=0 to direct content link
  if (trimmed.includes('dropbox.com')) {
    return trimmed
      .replace(/[?&]dl=0/, '')
      .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
  }

  return trimmed
}
