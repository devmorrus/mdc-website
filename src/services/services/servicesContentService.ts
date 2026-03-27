import { SERVICES_STATIC_CONTENT } from '../../data/services.static'
import type { ServicesContent } from '../../types/services'

export interface ServicesContentService {
  getServicesContent: () => Promise<ServicesContent>
}

export class StaticServicesContentService implements ServicesContentService {
  async getServicesContent(): Promise<ServicesContent> {
    return Promise.resolve(SERVICES_STATIC_CONTENT)
  }
}

export class ApiServicesContentService implements ServicesContentService {
  async getServicesContent(): Promise<ServicesContent> {
    // Placeholder for upcoming API integration.
    throw new Error('API services content service is not implemented yet.')
  }
}

export function createServicesContentService(): ServicesContentService {
  const mode = import.meta.env.VITE_SERVICES_CONTENT_MODE

  if (mode === 'api') {
    return new ApiServicesContentService()
  }

  return new StaticServicesContentService()
}
