import { useEffect, useMemo, useState } from 'react'

import { createAboutContentService } from '../services/about/aboutContentService'
import type { AboutContent } from '../types/about'

interface UseAboutContentResult {
  data: AboutContent | null
  isLoading: boolean
  error: string | null
}

export function useAboutContent(): UseAboutContentResult {
  const service = useMemo(() => createAboutContentService(), [])
  const [data, setData] = useState<AboutContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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
  }, [service])

  return { data, isLoading, error }
}
