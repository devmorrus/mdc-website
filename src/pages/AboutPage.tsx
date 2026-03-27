import { AboutHeroSection } from '../components/about/AboutHeroSection'
import { CompanyProfileSection } from '../components/about/CompanyProfileSection'
import { LegalitySection } from '../components/about/LegalitySection'
import { ValuesSection } from '../components/about/ValuesSection'
import { VisionMissionSection } from '../components/about/VisionMissionSection'
import { useAboutContent } from '../hooks/useAboutContent'
import { SiteLayout } from '../layouts/SiteLayout'

export function AboutPage() {
  const { data, isLoading, error } = useAboutContent()

  if (isLoading) {
    return (
      <SiteLayout>
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-blue-100/80">Loading about content...</p>
        </section>
      </SiteLayout>
    )
  }

  if (error || !data) {
    return (
      <SiteLayout>
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-red-200">Failed to load about content: {error ?? 'Unknown error'}</p>
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
      <AboutHeroSection content={data.hero} />
      <CompanyProfileSection content={data.companyProfile} />
      <VisionMissionSection content={data.visionMission} />
      <ValuesSection values={data.values} />
      <LegalitySection items={data.legalities} />
    </SiteLayout>
  )
}
