import { PortfolioClosingCtaSection } from '../components/portfolio/PortfolioClosingCtaSection'
import { PortfolioHeroSection } from '../components/portfolio/PortfolioHeroSection'
import { PortfolioPreviewSection } from '../components/home/PortfolioPreviewSection'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { usePortfolioContent } from '../hooks/usePortfolioContent'
import { SiteLayout } from '../layouts/SiteLayout'
import type { PortfolioItem } from '../types/home'

export function PortfolioPage() {
  const { data, isLoading, error } = usePortfolioContent()

  usePageMetadata({
    title: 'Morrus Digital Connecting | Portfolio',
    description:
      'Portfolio project Morrus Digital Connecting di berbagai industri untuk website company profile, web app custom, dan sistem internal.',
  })

  if (isLoading) {
    return (
      <SiteLayout headerVariant="hero">
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-[#0b1f57]">Loading portfolio content...</p>
        </section>
      </SiteLayout>
    )
  }

  if (error || !data) {
    return (
      <SiteLayout headerVariant="hero">
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-red-600">Failed to load portfolio content: {error ?? 'Unknown error'}</p>
        </section>
      </SiteLayout>
    )
  }

  const portfolioPreviewItems: PortfolioItem[] = data.projects.map((project) => ({
    id: project.id,
    name: project.name,
    category: project.category,
    summary: project.summary,
    outcome: project.outcome,
    href: `/portfolio/${project.slug}`,
    imageUrl: project.gallery[0]?.src ?? '',
    imageAlt: project.gallery[0]?.alt ?? project.name,
  }))

  return (
    <SiteLayout
      navItems={data.navItems}
      headerCta={{ label: data.headerCtaLabel, href: data.headerCtaHref }}
      footer={data.footer}
      headerVariant="hero"
    >
      <PortfolioHeroSection content={data.hero} />
      <PortfolioPreviewSection items={portfolioPreviewItems} />
      <PortfolioClosingCtaSection content={data.closingCta} />
    </SiteLayout>
  )
}
