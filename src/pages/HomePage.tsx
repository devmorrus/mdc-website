import { HeroSection } from '../components/home/HeroSection'
import { ServicesSection } from '../components/home/ServicesSection'
import { StatsStrip } from '../components/home/StatsStrip'
import { SiteLayout } from '../layouts/SiteLayout'
import { useHomeContent } from '../hooks/useHomeContent'

export function HomePage() {
  const { data, isLoading, error } = useHomeContent()

  if (isLoading) {
    return (
      <SiteLayout>
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-slate-300">Loading home content...</p>
        </section>
      </SiteLayout>
    )
  }

  if (error || !data) {
    return (
      <SiteLayout>
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-red-300">Failed to load home content: {error ?? 'Unknown error'}</p>
        </section>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout>
      <HeroSection content={data.hero} />
      <StatsStrip stats={data.stats} />
      <ServicesSection items={data.services} />
    </SiteLayout>
  )
}
