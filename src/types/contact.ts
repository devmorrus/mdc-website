import type { FooterContent, NavigationItem } from './home'

export interface ContactHeroContent {
  eyebrow: string
  title: string
  description: string
}

export interface ContactInfoItem {
  label: string
  value: string
  href?: string
}

export interface ContactInfoContent {
  title: string
  description: string
  items: ContactInfoItem[]
  whatsappNumber: string
  whatsappMessage: string
  whatsappButtonLabel: string
}

export interface ContactInquiryFormData {
  name: string
  companyName: string
  whatsappNumber: string
  email: string
  message: string
}

export interface ContactInquiryResult {
  status: 'success' | 'failed'
  message: string
}

export interface ContactContent {
  navItems: NavigationItem[]
  headerCtaLabel: string
  headerCtaHref: string
  footer: FooterContent
  hero: ContactHeroContent
  info: ContactInfoContent
}
