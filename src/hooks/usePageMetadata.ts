import { useEffect } from 'react'

interface UsePageMetadataParams {
  title: string
  description: string
  canonicalPath?: string
}

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.morrusdigitalconnecting.com').replace(/\/$/, '')

function getCanonicalUrl(canonicalPath?: string) {
  const path = canonicalPath ?? window.location.pathname
  const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '')
  return `${SITE_URL}${normalizedPath}`
}

export function usePageMetadata({ title, description, canonicalPath }: UsePageMetadataParams): void {
  useEffect(() => {
    const previousTitle = document.title
    const metaDescription = document.querySelector('meta[name="description"]')
    const previousDescription = metaDescription?.getAttribute('content') ?? null
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const previousCanonical = canonicalLink?.getAttribute('href') ?? null
    const createdCanonicalLink = !canonicalLink

    document.title = title

    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }

    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }

    canonicalLink.setAttribute('href', getCanonicalUrl(canonicalPath))

    return () => {
      document.title = previousTitle

      if (metaDescription && previousDescription !== null) {
        metaDescription.setAttribute('content', previousDescription)
      }

      if (canonicalLink) {
        if (createdCanonicalLink) {
          canonicalLink.remove()
        } else if (previousCanonical !== null) {
          canonicalLink.setAttribute('href', previousCanonical)
        }
      }
    }
  }, [canonicalPath, description, title])
}
