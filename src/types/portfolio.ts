import type { FooterContent, NavigationItem } from './home'

export interface PortfolioHeroContent {
  eyebrow: string
  title: string
  description: string
}

export type PortfolioThumbnailTone = 'sky' | 'amber' | 'blue'

export interface PortfolioProjectItem {
  id: string
  name: string
  industry: string
  serviceType: string
  summary: string
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
