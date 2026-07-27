import axios from 'axios'

import { PORTFOLIO_STATIC_CONTENT } from '../../data/portfolio.static'
import type { PortfolioContent, PortfolioProjectItem } from '../../types/portfolio'

export interface PortfolioContentService {
  getPortfolioContent: () => Promise<PortfolioContent>
}

interface PublicPortfolioResponse {
  success: boolean
  message: string
  data: PortfolioProjectItem[]
}

export class StaticPortfolioContentService implements PortfolioContentService {
  async getPortfolioContent(): Promise<PortfolioContent> {
    return Promise.resolve(PORTFOLIO_STATIC_CONTENT)
  }
}

export class ApiPortfolioContentService implements PortfolioContentService {
  async getPortfolioContent(): Promise<PortfolioContent> {
    const response = await axios.get<PublicPortfolioResponse>('/api/public/portfolio')

    return {
      ...PORTFOLIO_STATIC_CONTENT,
      projects: response.data?.data ?? [],
    }
  }
}

export function createPortfolioContentService(): PortfolioContentService {
  const mode = import.meta.env.VITE_PORTFOLIO_CONTENT_MODE

  if (mode === 'static') {
    return new StaticPortfolioContentService()
  }

  return new ApiPortfolioContentService()
}
