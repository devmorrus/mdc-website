import { useEffect, useMemo, useState } from 'react'

import { SERVICES_STATIC_CONTENT } from '../data/services.static'
import { createServicesContentService } from '../services/services/servicesContentService'
import type { ServicesContent } from '../types/services'

interface UseServicesContentResult {
  data: ServicesContent | null
  isLoading: boolean
  error: string | null
}

export function useServicesContent(): UseServicesContentResult {
  const isApiMode = import.meta.env.VITE_SERVICES_CONTENT_MODE === 'api'
  const service = useMemo(() => createServicesContentService(), [])
  const [data, setData] = useState<ServicesContent | null>(isApiMode ? null : SERVICES_STATIC_CONTENT)
  const [isLoading, setIsLoading] = useState(isApiMode)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isApiMode) {
      return
    }

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
  }, [isApiMode, service])

  return { data, isLoading, error }
}
