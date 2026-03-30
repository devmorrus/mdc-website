import { ABOUT_STATIC_CONTENT } from '../../data/about.static'
import type { AboutContent } from '../../types/about'

export interface AboutContentService {
  getAboutContent: () => Promise<AboutContent>
}

export class StaticAboutContentService implements AboutContentService {
  async getAboutContent(): Promise<AboutContent> {
    return Promise.resolve(ABOUT_STATIC_CONTENT)
  }
}

export class ApiAboutContentService implements AboutContentService {
  async getAboutContent(): Promise<AboutContent> {
    // Placeholder for upcoming API integration.
    throw new Error('API about content service is not implemented yet.')
  }
}

export function createAboutContentService(): AboutContentService {
  const mode = import.meta.env.VITE_ABOUT_CONTENT_MODE

  if (mode === 'api') {
    return new ApiAboutContentService()
  }

  return new StaticAboutContentService()
}
