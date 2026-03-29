import { useEffect, useMemo, useState } from 'react'

import { createPortfolioContentService } from '../services/portfolio/portfolioContentService'
import type { PortfolioContent } from '../types/portfolio'

interface UsePortfolioContentResult {
  data: PortfolioContent | null
  isLoading: boolean
  error: string | null
}

export function usePortfolioContent(): UsePortfolioContentResult {
  const service = useMemo(() => createPortfolioContentService(), [])
  const [data, setData] = useState<PortfolioContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadContent() {
      try {
        const content = await service.getPortfolioContent()

        if (isMounted) {
          setData(content)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load portfolio content.')
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
