import type { FooterContent, NavigationItem } from './home'

export interface PortfolioHeroContent {
  eyebrow: string
  title: string
  description: string
}

export type PortfolioThumbnailTone = 'sky' | 'amber' | 'blue'

export interface PortfolioGalleryImage {
  src: string
  alt: string
  caption: string
}

export interface PortfolioProjectItem {
  id: string
  slug: string
  name: string
  client: string
  year: string
  category: string
  industry: string
  serviceType: string
  summary: string
  challenge: string
  objective: string
  solution: string
  outcome: string
  deliverables: string[]
  technologies: string[]
  gallery: PortfolioGalleryImage[]
  thumbnailLabel: string
  thumbnailTone: PortfolioThumbnailTone
}

export interface PortfolioClosingCtaContent {
  title: string
  description: string
  buttonLabel: string
  buttonHref: string
}

export interface PortfolioContent {
  navItems: NavigationItem[]
  headerCtaLabel: string
  headerCtaHref: string
  footer: FooterContent
  hero: PortfolioHeroContent
  projects: PortfolioProjectItem[]
  closingCta: PortfolioClosingCtaContent
}
