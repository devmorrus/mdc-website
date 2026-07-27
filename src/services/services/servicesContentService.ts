import axios from 'axios'

import { HOME_STATIC_CONTENT } from '../../data/home.static'
import { SERVICES_STATIC_CONTENT } from '../../data/services.static'
import type { ServiceItem } from '../../types/home'
import type { PublicServiceItem } from '../../types/publicService'
import type { ServicesContent } from '../../types/services'

export interface ServicesContentService {
  getServicesContent: () => Promise<ServicesContent>
}

interface PublicServicesResponse {
  success: boolean
  message: string
  data: PublicServiceItem[]
}

export async function fetchPublicServices(): Promise<PublicServiceItem[]> {
  const response = await axios.get<PublicServicesResponse>('/api/public/services')
  return response.data?.data ?? []
}

export function mapPublicServicesToHomeItems(services: PublicServiceItem[]): ServiceItem[] {
  return services.map((service) => {
    const homeCard = service.content?.homeCard

    return {
      id: service.slug,
      tier: homeCard?.tier ?? 'Service',
      tag: homeCard?.tag ?? service.category?.name ?? 'Layanan',
      title: service.name,
      price: service.shortDescription ?? '',
      originalPrice: homeCard?.originalPrice ?? '',
      priceSuffix: homeCard?.priceSuffix ?? '',
      description: service.description ?? service.shortDescription ?? '',
      isFeatured: service.featured,
      features: (homeCard?.features ?? []).map((feature) => ({
        label: feature,
        included: true,
      })),
      ctaLabel: homeCard?.ctaLabel ?? 'Konsultasi Sekarang',
      whatsappMessage:
        homeCard?.whatsappMessage ??
        `Halo Morrus Digital Connecting, saya tertarik dengan layanan ${service.name}. Saya ingin konsultasi lebih lanjut.`,
      href: homeCard?.ctaHref ?? HOME_STATIC_CONTENT.headerCtaHref,
    }
  })
}

export function mapPublicServicesToServicesContent(services: PublicServiceItem[]): ServicesContent {
  return {
    ...SERVICES_STATIC_CONTENT,
    services: services.map((service, index) => {
      const detailPage = service.content?.detailPage

      return {
        id: service.slug,
        icon: detailPage?.icon ?? String(index + 1).padStart(2, '0'),
        title: service.name,
        description: service.description ?? service.shortDescription ?? '',
        benefits: detailPage?.benefits ?? [],
        ctaLabel: detailPage?.ctaLabel ?? 'Konsultasi Sekarang',
        ctaHref: detailPage?.ctaHref ?? '/contact',
      }
    }),
  }
}

export class StaticServicesContentService implements ServicesContentService {
  async getServicesContent(): Promise<ServicesContent> {
    return Promise.resolve(SERVICES_STATIC_CONTENT)
  }
}

export class ApiServicesContentService implements ServicesContentService {
  async getServicesContent(): Promise<ServicesContent> {
    const services = await fetchPublicServices()
    return mapPublicServicesToServicesContent(services)
  }
}

export function createServicesContentService(): ServicesContentService {
  const mode = import.meta.env.VITE_SERVICES_CONTENT_MODE

  if (mode === 'static') {
    return new StaticServicesContentService()
  }

  return new ApiServicesContentService()
}
