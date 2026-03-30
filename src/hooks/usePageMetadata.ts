import { useEffect } from 'react'

interface UsePageMetadataParams {
  title: string
  description: string
}

export function usePageMetadata({ title, description }: UsePageMetadataParams): void {
  useEffect(() => {
    const previousTitle = document.title
    const metaDescription = document.querySelector('meta[name="description"]')
    const previousDescription = metaDescription?.getAttribute('content') ?? null

    document.title = title

    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }

    return () => {
      document.title = previousTitle

      if (metaDescription && previousDescription !== null) {
        metaDescription.setAttribute('content', previousDescription)
      }
    }
  }, [description, title])
}
