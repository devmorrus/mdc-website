import { useEffect, useMemo, useState } from 'react'

import { ABOUT_STATIC_CONTENT } from '../data/about.static'
import { createAboutContentService } from '../services/about/aboutContentService'
import type { AboutContent } from '../types/about'

interface UseAboutContentResult {
  data: AboutContent | null
  isLoading: boolean
  error: string | null
}

export function useAboutContent(): UseAboutContentResult {
  const isApiMode = import.meta.env.VITE_ABOUT_CONTENT_MODE === 'api'
  const service = useMemo(() => createAboutContentService(), [])
  const [data, setData] = useState<AboutContent | null>(isApiMode ? null : ABOUT_STATIC_CONTENT)
  const [isLoading, setIsLoading] = useState(isApiMode)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isApiMode) {
      return
    }

    let isMounted = true

    async function loadContent() {
      try {
        const content = await service.getAboutContent()

        if (isMounted) {
          setData(content)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load about content.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadContent()

    return () => {
      isMounted = false
    }
  }, [isApiMode, service])

  return { data, isLoading, error }
}
