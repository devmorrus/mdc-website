import { useEffect, useMemo, useState } from 'react'

import { HOME_STATIC_CONTENT } from '../data/home.static'
import type { HomeContent } from '../types/home'
import { createHomeContentService } from '../services/home/homeContentService'

interface UseHomeContentResult {
  data: HomeContent | null
  isLoading: boolean
  error: string | null
}

export function useHomeContent(): UseHomeContentResult {
  const isApiMode = import.meta.env.VITE_HOME_CONTENT_MODE !== 'static'
  const service = useMemo(() => createHomeContentService(), [])
  const [data, setData] = useState<HomeContent | null>(isApiMode ? null : HOME_STATIC_CONTENT)
  const [isLoading, setIsLoading] = useState(isApiMode)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isApiMode) {
      return
    }

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
          setData(HOME_STATIC_CONTENT)
          setError(null)
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
