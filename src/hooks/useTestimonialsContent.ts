import { useEffect, useMemo, useState } from 'react'

import type { PublicTestimonialItem } from '../types/testimonial'
import { createTestimonialContentService } from '../services/testimonial/testimonialContentService'

interface UseTestimonialsContentResult {
  data: PublicTestimonialItem[]
  isLoading: boolean
  error: string | null
}

export function useTestimonialsContent(): UseTestimonialsContentResult {
  const service = useMemo(() => createTestimonialContentService(), [])
  const [data, setData] = useState<PublicTestimonialItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadTestimonials() {
      try {
        const items = await service.getTestimonials()

        if (isMounted) {
          setData(items)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load testimonials.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadTestimonials()

    return () => {
      isMounted = false
    }
  }, [service])

  return { data, isLoading, error }
}
