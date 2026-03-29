import { PORTFOLIO_STATIC_CONTENT } from '../../data/portfolio.static'
import type { PortfolioContent } from '../../types/portfolio'

export interface PortfolioContentService {
  getPortfolioContent: () => Promise<PortfolioContent>
}

export class StaticPortfolioContentService implements PortfolioContentService {
  async getPortfolioContent(): Promise<PortfolioContent> {
    return Promise.resolve(PORTFOLIO_STATIC_CONTENT)
  }
}

export class ApiPortfolioContentService implements PortfolioContentService {
  async getPortfolioContent(): Promise<PortfolioContent> {
    // Placeholder for upcoming API integration.
    throw new Error('API portfolio content service is not implemented yet.')
  }
}

export function createPortfolioContentService(): PortfolioContentService {
  const mode = import.meta.env.VITE_PORTFOLIO_CONTENT_MODE

  if (mode === 'api') {
    return new ApiPortfolioContentService()
  }

  return new StaticPortfolioContentService()
}
