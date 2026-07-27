export interface PublicBlogSeo {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  ogImageUrl?: string
}

export interface PublicBlogTag {
  id: string
  name: string
  slug: string
}

export interface PublicBlogCategory {
  id: string
  name: string
  slug: string
}

export interface PublicBlogContentSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface PublicBlogContent {
  author?: string
  coverImageUrl?: string
  coverImageAlt?: string
  introduction?: string
  sections?: PublicBlogContentSection[]
  closing?: string
}

export interface PublicBlogPost {
  id: string
  slug: string
  title: string
  excerpt?: string | null
  content?: PublicBlogContent | null
  featured?: boolean
  publishedAt?: string | null
  seo?: PublicBlogSeo | null
  category?: PublicBlogCategory | null
  tags?: PublicBlogTag[]
}
