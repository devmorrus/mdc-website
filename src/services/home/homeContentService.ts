import { HOME_STATIC_CONTENT } from '../../data/home.static'
import type { HomeContent } from '../../types/home'

export interface HomeContentService {
  getHomeContent: () => Promise<HomeContent>
}

export class StaticHomeContentService implements HomeContentService {
  async getHomeContent(): Promise<HomeContent> {
    return Promise.resolve(HOME_STATIC_CONTENT)
  }
}

export class ApiHomeContentService implements HomeContentService {
  async getHomeContent(): Promise<HomeContent> {
    // Placeholder for upcoming API integration.
    throw new Error('API content service is not implemented yet.')
  }
}

export function createHomeContentService(): HomeContentService {
  const mode = import.meta.env.VITE_HOME_CONTENT_MODE

  if (mode === 'api') {
    return new ApiHomeContentService()
  }

  return new StaticHomeContentService()
}
