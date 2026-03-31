import { useMemo } from 'react'

import { mapHomeContentToViewModel } from '../services/home/homeContentMapper'
import { useHomeContent } from './useHomeContent'

interface UseHomePageViewModelResult {
  data: ReturnType<typeof mapHomeContentToViewModel> | null
  isLoading: boolean
  error: string | null
}

export function useHomePageViewModel(): UseHomePageViewModelResult {
  const { data, isLoading, error } = useHomeContent()

  const viewModel = useMemo(() => {
    if (!data) {
      return null
    }

    return mapHomeContentToViewModel(data)
  }, [data])

  return {
    data: viewModel,
    isLoading,
    error,
  }
}
