import { AboutHeroSection } from '../components/about/AboutHeroSection'
import { CompanyProfileSection } from '../components/about/CompanyProfileSection'
import { LegalitySection } from '../components/about/LegalitySection'
import { ValuesSection } from '../components/about/ValuesSection'
import { VisionMissionSection } from '../components/about/VisionMissionSection'
import { useAboutContent } from '../hooks/useAboutContent'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { SiteLayout } from '../layouts/SiteLayout'

export function AboutPage() {
  const { data, isLoading, error } = useAboutContent()

  usePageMetadata({
    title: 'Morrus Digital Connecting | Tentang',
    description:
      'Kenali profil perusahaan Morrus Digital Connecting, visi misi, nilai perusahaan, dan legalitas untuk membangun kepercayaan kerja sama.',
  })

  if (isLoading) {
    return (
      <SiteLayout headerVariant="hero">
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-[#0b1f57]">Loading about content...</p>
        </section>
      </SiteLayout>
    )
  }

  if (error || !data) {
    return (
      <SiteLayout headerVariant="hero">
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-red-600">Failed to load about content: {error ?? 'Unknown error'}</p>
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
      <AboutHeroSection content={data.hero} />
      <CompanyProfileSection content={data.companyProfile} />
      <VisionMissionSection content={data.visionMission} />
      <ValuesSection values={data.values} />
      <LegalitySection items={data.legalities} />
    </SiteLayout>
  )
}
