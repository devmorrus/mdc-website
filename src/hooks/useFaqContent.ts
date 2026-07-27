import { useEffect, useMemo, useState } from 'react'

import type { PublicFaqItem } from '../types/faq'
import { createFaqContentService } from '../services/faq/faqContentService'

interface UseFaqContentResult {
  data: PublicFaqItem[]
  isLoading: boolean
  error: string | null
}

export function useFaqContent(): UseFaqContentResult {
  const service = useMemo(() => createFaqContentService(), [])
  const [data, setData] = useState<PublicFaqItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadFaqItems() {
      try {
        const items = await service.getFaqItems()

        if (isMounted) {
          setData(items)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load FAQ content.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadFaqItems()

    return () => {
      isMounted = false
    }
  }, [service])

  return { data, isLoading, error }
}
