import { PortfolioClosingCtaSection } from '../components/portfolio/PortfolioClosingCtaSection'
import { PortfolioGridSection } from '../components/portfolio/PortfolioGridSection'
import { PortfolioHeroSection } from '../components/portfolio/PortfolioHeroSection'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { usePortfolioContent } from '../hooks/usePortfolioContent'
import { SiteLayout } from '../layouts/SiteLayout'

export function PortfolioPage() {
  const { data, isLoading, error } = usePortfolioContent()

  usePageMetadata({
    title: 'Morrus Digital Connecting | Portfolio',
    description:
      'Portfolio project Morrus Digital Connecting di berbagai industri untuk website company profile, web app custom, dan sistem internal.',
  })

  if (isLoading) {
    return (
      <SiteLayout>
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-blue-100/80">Loading portfolio content...</p>
        </section>
      </SiteLayout>
    )
  }

  if (error || !data) {
    return (
      <SiteLayout>
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-red-200">Failed to load portfolio content: {error ?? 'Unknown error'}</p>
        </section>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout
      navItems={data.navItems}
      headerCta={{ label: data.headerCtaLabel, href: data.headerCtaHref }}
      footer={data.footer}
    >
      <PortfolioHeroSection content={data.hero} />
      <PortfolioGridSection items={data.projects} />
      <PortfolioClosingCtaSection content={data.closingCta} />
    </SiteLayout>
  )
}
