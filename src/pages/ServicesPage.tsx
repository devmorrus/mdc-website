import { ServicesClosingCtaSection } from '../components/services/ServicesClosingCtaSection'
import { ServicesHeroSection } from '../components/services/ServicesHeroSection'
import { ServicesListSection } from '../components/services/ServicesListSection'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { useServicesContent } from '../hooks/useServicesContent'
import { SiteLayout } from '../layouts/SiteLayout'

export function ServicesPage() {
  const { data, isLoading, error } = useServicesContent()

  usePageMetadata({
    title: 'Morrus Digital Connecting | Services',
    description:
      'Layanan Morrus Digital Connecting mencakup Website Company Profile, solusi custom, dashboard reporting, dan maintenance support.',
  })

  if (isLoading) {
    return (
      <SiteLayout>
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-blue-100/80">Loading services content...</p>
        </section>
      </SiteLayout>
    )
  }

  if (error || !data) {
    return (
      <SiteLayout>
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-red-200">Failed to load services content: {error ?? 'Unknown error'}</p>
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
      <ServicesHeroSection content={data.hero} />
      <ServicesListSection services={data.services} />
      <ServicesClosingCtaSection content={data.closingCta} />
    </SiteLayout>
  )
}
