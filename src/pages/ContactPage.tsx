import { ContactHeroSection } from '../components/contact/ContactHeroSection'
import { ContactInquirySection } from '../components/contact/ContactInquirySection'
import { useContactContent } from '../hooks/useContactContent'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { SiteLayout } from '../layouts/SiteLayout'

export function ContactPage() {
  const { data, isLoading, error } = useContactContent()

  usePageMetadata({
    title: 'Morrus Digital Connecting | Contact',
    description:
      'Hubungi Morrus Digital Connecting melalui form inquiry atau WhatsApp untuk konsultasi kebutuhan website dan layanan digital bisnis Anda.',
  })

  if (isLoading) {
    return (
      <SiteLayout headerVariant="hero">
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-[#0b1f57]">Loading contact content...</p>
        </section>
      </SiteLayout>
    )
  }

  if (error || !data) {
    return (
      <SiteLayout headerVariant="hero">
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-red-600">Failed to load contact content: {error ?? 'Unknown error'}</p>
        </section>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout
      navItems={data.navItems}
      headerCta={{ label: data.headerCtaLabel, href: data.headerCtaHref }}
      footer={data.footer}
      headerVariant="hero"
    >
      <ContactHeroSection content={data.hero} />
      <ContactInquirySection content={data.info} />
    </SiteLayout>
  )
}
