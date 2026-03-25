import { useEffect, useMemo, useState } from 'react'

import type { HomeContent } from '../types/home'
import { createHomeContentService } from '../services/home/homeContentService'

interface UseHomeContentResult {
  data: HomeContent | null
  isLoading: boolean
  error: string | null
}

export function useHomeContent(): UseHomeContentResult {
  const service = useMemo(() => createHomeContentService(), [])
  const [data, setData] = useState<HomeContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadContent() {
      try {
        const content = await service.getHomeContent()

        if (isMounted) {
          setData(content)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load home content.')
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
