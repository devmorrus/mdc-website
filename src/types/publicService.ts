export interface PublicServiceSeo {
  title: string
  description: string
  keywords: string[]
  canonicalUrl: string | null
  ogImageUrl: string | null
}

export interface PublicServiceCategory {
  id: string
  name: string
  slug: string
}

export interface PublicServiceContent {
  homeCard?: {
    tier?: string
    tag?: string
    originalPrice?: string
    priceSuffix?: string
    features?: string[]
    ctaLabel?: string
    ctaHref?: string
    whatsappMessage?: string
  }
  detailPage?: {
    icon?: string
    benefits?: string[]
    ctaLabel?: string
    ctaHref?: string
  }
}

export interface PublicServiceItem {
  id: string
  slug: string
  name: string
  shortDescription: string | null
  description: string | null
  content: PublicServiceContent | null
  iconName: string | null
  featured: boolean
  sortOrder: number
  seo: PublicServiceSeo
  category: PublicServiceCategory | null
}
