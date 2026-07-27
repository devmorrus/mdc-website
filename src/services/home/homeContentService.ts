import axios from 'axios'

import { HOME_STATIC_CONTENT } from '../../data/home.static'
import type { HomeContent, ArticleItem } from '../../types/home'
import type { PublicBlogPost } from '../../types/publicBlog'

export interface HomeContentService {
  getHomeContent: () => Promise<HomeContent>
}

interface PublicBlogPostsResponse {
  success: boolean
  message: string
  data: PublicBlogPost[]
}

const BLOG_FALLBACK_IMAGE =
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400'

function formatPublishedDate(value?: string | null) {
  if (!value) {
    return 'Tanggal belum tersedia'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Tanggal belum tersedia'
  }

  const parts = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).formatToParts(date)

  const day = parts.find((part) => part.type === 'day')?.value ?? ''
  const month = parts.find((part) => part.type === 'month')?.value ?? ''
  const year = parts.find((part) => part.type === 'year')?.value ?? ''

  return `${day} ${month} ${year}`.trim()
}

function mapPublicBlogPostsToArticles(posts: PublicBlogPost[]): ArticleItem[] {
  return posts.map((post) => {
    const content = post.content ?? {}
    const sections = Array.isArray(content.sections)
      ? content.sections.map((section) => ({
          heading: section.heading ?? '',
          paragraphs: Array.isArray(section.paragraphs) ? section.paragraphs : [],
          ...(Array.isArray(section.bullets) ? { bullets: section.bullets } : {}),
        }))
      : []

    return {
      id: post.id,
      slug: post.slug,
      category: post.category?.name ?? 'Blog',
      title: post.title,
      summary: post.excerpt ?? '',
      publishedAt: formatPublishedDate(post.publishedAt),
      author: content.author ?? 'Admin Editorial',
      href: `/blog/${post.slug}`,
      imageUrl: content.coverImageUrl ?? post.seo?.ogImageUrl ?? BLOG_FALLBACK_IMAGE,
      imageAlt: content.coverImageAlt ?? post.title,
      content: {
        introduction: content.introduction ?? post.excerpt ?? '',
        sections,
        closing: content.closing ?? '',
      },
    }
  })
}

export class StaticHomeContentService implements HomeContentService {
  async getHomeContent(): Promise<HomeContent> {
    return Promise.resolve(HOME_STATIC_CONTENT)
  }
}

export class ApiHomeContentService implements HomeContentService {
  async getHomeContent(): Promise<HomeContent> {
    const response = await axios.get<PublicBlogPostsResponse>('/api/public/blog-posts')

    return {
      ...HOME_STATIC_CONTENT,
      articles: mapPublicBlogPostsToArticles(response.data?.data ?? []),
    }
  }
}

export function createHomeContentService(): HomeContentService {
  const mode = import.meta.env.VITE_HOME_CONTENT_MODE

  if (mode === 'static') {
    return new StaticHomeContentService()
  }

  return new ApiHomeContentService()
}
