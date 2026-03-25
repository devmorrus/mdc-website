export interface HeroContent {
  eyebrow: string
  title: string
  description: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
}

export interface StatItem {
  label: string
  value: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  highlights: string[]
}

export interface HomeContent {
  hero: HeroContent
  stats: StatItem[]
  services: ServiceItem[]
}
