import axios from 'axios'

import type { PublicFaqCategory, PublicFaqItem } from '../../types/faq'

interface PublicFaqResponse {
  success: boolean
  message: string
  data: PublicFaqCategory[]
}

export interface FaqContentService {
  getFaqItems: () => Promise<PublicFaqItem[]>
}

export class ApiFaqContentService implements FaqContentService {
  async getFaqItems(): Promise<PublicFaqItem[]> {
    const response = await axios.get<PublicFaqResponse>('/api/public/faqs')
    const categories = response.data?.data ?? []

    return categories.flatMap((category) => category.items)
  }
}

export function createFaqContentService(): FaqContentService {
  return new ApiFaqContentService()
}
