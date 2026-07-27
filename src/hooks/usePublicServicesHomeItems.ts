import { useEffect, useMemo, useState } from 'react'

import type { ServiceItem } from '../types/home'
import { fetchPublicServices, mapPublicServicesToHomeItems } from '../services/services/servicesContentService'

interface UsePublicServicesHomeItemsResult {
  data: ServiceItem[]
  isLoading: boolean
  error: string | null
}

export function usePublicServicesHomeItems(initialItems: ServiceItem[]): UsePublicServicesHomeItemsResult {
  const [data, setData] = useState<ServiceItem[]>(initialItems)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fallbackItems = useMemo(() => initialItems, [initialItems])

  useEffect(() => {
    let isMounted = true

    async function loadServices() {
      try {
        const services = await fetchPublicServices()

        if (isMounted && services.length > 0) {
          setData(mapPublicServicesToHomeItems(services))
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setData(fallbackItems)
          setError(err instanceof Error ? err.message : 'Failed to load services.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadServices()

    return () => {
      isMounted = false
    }
  }, [fallbackItems])

  return { data, isLoading, error }
}
