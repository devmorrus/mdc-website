import { PageStateSection } from '../components/common/PageStateSection'
import { HomePageContent } from '../components/home/HomePageContent'
import { useHomePageViewModel } from '../hooks/useHomePageViewModel'
import { SiteLayout } from '../layouts/SiteLayout'
import { usePageMetadata } from '../hooks/usePageMetadata'

export function HomePage() {
  const { data, isLoading, error } = useHomePageViewModel()

  usePageMetadata({
    title: 'Morrus Digital Connecting | Home',
    description:
      'Website company profile Morrus Digital Connecting dengan layanan website modern, portfolio unggulan, dan jalur konsultasi cepat.',
  })

  if (isLoading) {
    return (
      <SiteLayout>
        <PageStateSection tone="info" text="Loading home content..." />
      </SiteLayout>
    )
  }

  if (error || !data) {
    return (
      <SiteLayout>
        <PageStateSection tone="error" text={`Failed to load home content: ${error ?? 'Unknown error'}`} />
      </SiteLayout>
    )
  }

  return (
    <SiteLayout
      navItems={data.layout.navItems}
      headerCta={data.layout.headerCta}
      footer={data.layout.footer}
    >
      <HomePageContent model={data} />
    </SiteLayout>
  )
}
