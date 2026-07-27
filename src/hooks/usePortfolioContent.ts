import { useEffect, useMemo, useState } from 'react'

import { PORTFOLIO_STATIC_CONTENT } from '../data/portfolio.static'
import { createPortfolioContentService } from '../services/portfolio/portfolioContentService'
import type { PortfolioContent } from '../types/portfolio'

interface UsePortfolioContentResult {
  data: PortfolioContent | null
  isLoading: boolean
  error: string | null
}

export function usePortfolioContent(): UsePortfolioContentResult {
  const isApiMode = import.meta.env.VITE_PORTFOLIO_CONTENT_MODE !== 'static'
  const service = useMemo(() => createPortfolioContentService(), [])
  const [data, setData] = useState<PortfolioContent | null>(isApiMode ? null : PORTFOLIO_STATIC_CONTENT)
  const [isLoading, setIsLoading] = useState(isApiMode)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isApiMode) {
      return
    }

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
          setData(PORTFOLIO_STATIC_CONTENT)
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
