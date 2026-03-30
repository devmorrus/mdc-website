import type { FooterContent, NavigationItem } from './home'

export interface ServicesHeroContent {
  eyebrow: string
  title: string
  description: string
}

export interface ServiceDetailItem {
  id: string
  icon: string
  title: string
  description: string
  benefits: string[]
  ctaLabel: string
  ctaHref: string
}

export interface ServicesClosingCtaContent {
  title: string
  description: string
  buttonLabel: string
  buttonHref: string
}

export interface ServicesContent {
  navItems: NavigationItem[]
  headerCtaLabel: string
  headerCtaHref: string
  footer: FooterContent
  hero: ServicesHeroContent
  services: ServiceDetailItem[]
  closingCta: ServicesClosingCtaContent
}
