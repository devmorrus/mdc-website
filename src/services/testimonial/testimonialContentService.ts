import axios from 'axios'

import type { PublicTestimonialItem } from '../../types/testimonial'

interface PublicTestimonialsResponse {
  success: boolean
  message: string
  data: PublicTestimonialItem[]
}

export interface TestimonialContentService {
  getTestimonials: () => Promise<PublicTestimonialItem[]>
}

export class ApiTestimonialContentService implements TestimonialContentService {
  async getTestimonials(): Promise<PublicTestimonialItem[]> {
    const response = await axios.get<PublicTestimonialsResponse>('/api/public/testimonials')
    return response.data?.data ?? []
  }
}

export function createTestimonialContentService(): TestimonialContentService {
  return new ApiTestimonialContentService()
}
