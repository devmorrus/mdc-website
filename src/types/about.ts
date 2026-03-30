import type { FooterContent, NavigationItem } from './home'

export interface AboutHeroContent {
  eyebrow: string
  title: string
  description: string
}

export interface CompanyProfileContent {
  title: string
  paragraphs: string[]
}

export interface VisionMissionContent {
  vision: string
  missions: string[]
}

export interface CompanyValueItem {
  id: string
  title: string
  description: string
}

export interface LegalDocumentItem {
  type: 'Akta Pendirian' | 'NIB' | 'NPWP'
  summary: string
}

export interface AboutContent {
  navItems: NavigationItem[]
  headerCtaLabel: string
  headerCtaHref: string
  footer: FooterContent
  hero: AboutHeroContent
  companyProfile: CompanyProfileContent
  visionMission: VisionMissionContent
  values: CompanyValueItem[]
  legalities: LegalDocumentItem[]
}
