import { useEffect, useMemo, useState } from 'react'

import { createContactContentService } from '../services/contact/contactContentService'
import type { ContactContent } from '../types/contact'

interface UseContactContentResult {
  data: ContactContent | null
  isLoading: boolean
  error: string | null
}

export function useContactContent(): UseContactContentResult {
  const service = useMemo(() => createContactContentService(), [])
  const [data, setData] = useState<ContactContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadContent() {
      try {
        const content = await service.getContactContent()

        if (isMounted) {
          setData(content)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load contact content.')
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
