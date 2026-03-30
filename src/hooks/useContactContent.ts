import { useEffect, useMemo, useState } from 'react'

import { CONTACT_STATIC_CONTENT } from '../data/contact.static'
import { createContactContentService } from '../services/contact/contactContentService'
import type { ContactContent } from '../types/contact'

interface UseContactContentResult {
  data: ContactContent | null
  isLoading: boolean
  error: string | null
}

export function useContactContent(): UseContactContentResult {
  const isApiMode = import.meta.env.VITE_CONTACT_CONTENT_MODE === 'api'
  const service = useMemo(() => createContactContentService(), [])
  const [data, setData] = useState<ContactContent | null>(isApiMode ? null : CONTACT_STATIC_CONTENT)
  const [isLoading, setIsLoading] = useState(isApiMode)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isApiMode) {
      return
    }

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
  }, [isApiMode, service])

  return { data, isLoading, error }
}
