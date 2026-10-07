import type { HomeContent } from '../../types/home'
import { createWhatsAppLink } from '../../utils/createWhatsAppLink'

export interface HomeLayoutModel {
  navItems: HomeContent['navItems']
  headerCta: {
    label: string
    href: string
  }
  footer: HomeContent['footer']
}

export interface HomeViewModel {
  layout: HomeLayoutModel
  hero: HomeContent['hero']
  stats: HomeContent['stats']
  about: HomeContent['about']
  ecosystem: HomeContent['ecosystem']
  services: HomeContent['services']
  advantages: HomeContent['advantages']
  portfolio: HomeContent['portfolio']
  testimonials: HomeContent['testimonials']
  partners: HomeContent['partners']
  articles: HomeContent['articles']
  contactCta: HomeContent['contactCta']
  whatsappNumber: string
  whatsappLink: string
}

export function mapHomeContentToViewModel(content: HomeContent): HomeViewModel {
  return {
    layout: {
      navItems: content.navItems,
      headerCta: {
        label: content.headerCtaLabel,
        href: content.headerCtaHref,
      },
      footer: content.footer,
    },
    hero: content.hero,
    stats: content.stats,
    about: content.about,
    ecosystem: content.ecosystem.map((item) => ({
      ...item,
      href: createWhatsAppLink(content.whatsappNumber, item.whatsappMessage),
    })),
    services: content.services.map((service) => ({
      ...service,
      href: createWhatsAppLink(content.whatsappNumber, service.whatsappMessage),
    })),
    advantages: content.advantages,
    portfolio: content.portfolio,
    testimonials: content.testimonials,
    partners: content.partners,
    articles: content.articles,
    contactCta: content.contactCta,
    whatsappNumber: content.whatsappNumber,
    whatsappLink: createWhatsAppLink(content.whatsappNumber, content.whatsappMessage),
  }
}
