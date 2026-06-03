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
  trustPoints: string[]
}

export interface StatItem {
  label: string
  value: string
  description: string
}

export interface AboutSnippetContent {
  eyebrow: string
  title: string
  summary: string
  description: string
  valuePoints: string[]
  buttonLabel: string
  buttonHref: string
  teamMembers: {
    id: string
    name: string
    role: string
    imageUrl: string
  }[]
}

export interface ServiceItem {
  id: string
  tier: string
  tag: string
  title: string
  price: string
  priceSuffix: string
  description: string
  highlights: string[]
  ctaLabel: string
  href: string
}

export interface AdvantageItem {
  id: string
  title: string
  description: string
  stat: string
}

export interface PortfolioItem {
  id: string
  name: string
  category: string
  summary: string
  outcome: string
  imageUrl: string
  imageAlt: string
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  company: string
  quote: string
}

export interface PartnerItem {
  id: string
  name: string
  abbreviation: string
}

export interface ArticleItem {
  id: string
  category: string
  title: string
  summary: string
  publishedAt: string
  readTime: string
}

export interface ContactCtaContent {
  eyebrow: string
  title: string
  description: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  bulletPoints: string[]
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
  advantages: AdvantageItem[]
  portfolio: PortfolioItem[]
  testimonials: TestimonialItem[]
  partners: PartnerItem[]
  articles: ArticleItem[]
  contactCta: ContactCtaContent
  footer: FooterContent
  whatsappNumber: string
  whatsappMessage: string
}
