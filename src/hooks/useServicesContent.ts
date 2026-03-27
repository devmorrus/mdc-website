import { useEffect, useMemo, useState } from 'react'

import { createServicesContentService } from '../services/services/servicesContentService'
import type { ServicesContent } from '../types/services'

interface UseServicesContentResult {
  data: ServicesContent | null
  isLoading: boolean
  error: string | null
}

export function useServicesContent(): UseServicesContentResult {
  const service = useMemo(() => createServicesContentService(), [])
  const [data, setData] = useState<ServicesContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadContent() {
      try {
        const content = await service.getServicesContent()

        if (isMounted) {
          setData(content)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load services content.')
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
