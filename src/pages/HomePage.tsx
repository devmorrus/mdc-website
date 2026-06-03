import { PageStateSection } from '../components/common/PageStateSection'
import { HomePageContent } from '../components/home/HomePageContent'
import { useHomePageViewModel } from '../hooks/useHomePageViewModel'
import { SiteLayout } from '../layouts/SiteLayout'
import { usePageMetadata } from '../hooks/usePageMetadata'

export function HomePage() {
  const { data, isLoading, error } = useHomePageViewModel()

  usePageMetadata({
    title: 'Morrus Digital Connecting | Website Company Profile dan Solusi Digital Bisnis',
    description:
      'Morrus Digital Connecting membantu perusahaan membangun website company profile modern, responsif, dan siap memperkuat kredibilitas bisnis.',
  })

  if (isLoading) {
    return (
      <SiteLayout headerVariant="hero">
        <PageStateSection tone="info" text="Loading home content..." />
      </SiteLayout>
    )
  }

  if (error || !data) {
    return (
      <SiteLayout headerVariant="hero">
        <PageStateSection tone="error" text={`Failed to load home content: ${error ?? 'Unknown error'}`} />
      </SiteLayout>
    )
  }

  return (
    <SiteLayout
      navItems={data.layout.navItems}
      headerCta={data.layout.headerCta}
      footer={data.layout.footer}
      headerVariant="hero"
    >
      <HomePageContent model={data} />
    </SiteLayout>
  )
}
