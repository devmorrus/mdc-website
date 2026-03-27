export interface NavigationItem {
  id: string
  label: string
  href: string
}

export interface HeroContent {
  eyebrow: string
  title: string
  description: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

export interface StatItem {
  label: string
  value: string
}

export interface AboutSnippetContent {
  title: string
  summary: string
  valuePoints: string[]
  buttonLabel: string
  buttonHref: string
}

export interface ServiceItem {
  id: string
  icon: string
  title: string
  description: string
  highlights: string[]
}

export interface PortfolioItem {
  id: string
  name: string
  category: string
  summary: string
}

export interface ContactCtaContent {
  eyebrow: string
  title: string
  description: string
  buttonLabel: string
  buttonHref: string
}

export interface FooterQuickLink {
  label: string
  href: string
}

export interface FooterContent {
  companyName: string
  shortDescription: string
  quickLinks: FooterQuickLink[]
  email: string
  phone: string
}

export interface HomeContent {
  navItems: NavigationItem[]
  headerCtaLabel: string
  headerCtaHref: string
  hero: HeroContent
  stats: StatItem[]
  about: AboutSnippetContent
  services: ServiceItem[]
  portfolio: PortfolioItem[]
  contactCta: ContactCtaContent
  footer: FooterContent
  whatsappNumber: string
  whatsappMessage: string
}
