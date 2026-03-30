import { AboutSection } from '../components/home/AboutSection'
import { ContactCtaSection } from '../components/home/ContactCtaSection'
import { FloatingWhatsApp } from '../components/home/FloatingWhatsApp'
import { HeroSection } from '../components/home/HeroSection'
import { PortfolioPreviewSection } from '../components/home/PortfolioPreviewSection'
import { ServicesSection } from '../components/home/ServicesSection'
import { StatsStrip } from '../components/home/StatsStrip'
import { SiteLayout } from '../layouts/SiteLayout'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { createWhatsAppLink } from '../utils/createWhatsAppLink'
import { useHomeContent } from '../hooks/useHomeContent'

export function HomePage() {
  const { data, isLoading, error } = useHomeContent()

  usePageMetadata({
    title: 'Morrus Digital Connecting | Home',
    description:
      'Website company profile Morrus Digital Connecting dengan layanan website modern, portfolio unggulan, dan jalur konsultasi cepat.',
  })

  if (isLoading) {
    return (
      <SiteLayout>
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-blue-100/80">Loading home content...</p>
        </section>
      </SiteLayout>
    )
  }

  if (error || !data) {
    return (
      <SiteLayout>
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-red-200">Failed to load home content: {error ?? 'Unknown error'}</p>
        </section>
      </SiteLayout>
    )
  }

  const whatsappLink = createWhatsAppLink(data.whatsappNumber, data.whatsappMessage)

  return (
    <SiteLayout
      navItems={data.navItems}
      headerCta={{ label: data.headerCtaLabel, href: data.headerCtaHref }}
      footer={data.footer}
    >
      <HeroSection content={data.hero} />
      <StatsStrip stats={data.stats} />
      <AboutSection content={data.about} />
      <ServicesSection items={data.services} />
      <PortfolioPreviewSection items={data.portfolio} />
      <ContactCtaSection
        content={data.contactCta}
        whatsappLink={whatsappLink}
        whatsappNumber={data.whatsappNumber}
      />
      <FloatingWhatsApp whatsappLink={whatsappLink} />
    </SiteLayout>
  )
}
