export interface PublicFaqItem {
  id: string
  question: string
  answer: string
  sortOrder: number
  featured: boolean
  publishedAt: string | null
}

export interface PublicFaqCategory {
  id: string
  name: string
  slug: string
  description: string | null
  sortOrder: number
  items: PublicFaqItem[]
}
