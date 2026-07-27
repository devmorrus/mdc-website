export interface PublicTestimonialItem {
  id: string
  name: string
  role: string
  company: string
  quote: string
  rating: number | null
  sortOrder: number
  featured: boolean
  publishedAt: string | null
}
