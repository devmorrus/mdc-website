import { Link, Navigate, useParams } from 'react-router-dom'
import { PortfolioClosingCtaSection } from '../components/portfolio/PortfolioClosingCtaSection'
import { PortfolioDetailSection } from '../components/portfolio/PortfolioDetailSection'
import { PageStateSection } from '../components/common/PageStateSection'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { usePortfolioContent } from '../hooks/usePortfolioContent'
import { SiteLayout } from '../layouts/SiteLayout'

export function PortfolioDetailPage() {
  const { slug } = useParams()
  const { data, isLoading, error } = usePortfolioContent()

  const project = data?.projects.find((item) => item.slug === slug) ?? null

  usePageMetadata({
    title: project
      ? `Morrus Digital Connecting | Portfolio - ${project.name}`
      : 'Morrus Digital Connecting | Portfolio Detail',
    description: project
      ? project.summary
      : 'Detail portfolio project Morrus Digital Connecting.',
  })

  if (!slug) {
    return <Navigate to="/portfolio" replace />
  }

  if (isLoading) {
    return (
      <SiteLayout headerVariant="hero" heroHeaderTone="solid">
        <PageStateSection tone="info" text="Loading portfolio detail..." />
      </SiteLayout>
    )
  }

  if (error || !data) {
    return (
      <SiteLayout headerVariant="hero" heroHeaderTone="solid">
        <PageStateSection tone="error" text={`Failed to load portfolio content: ${error ?? 'Unknown error'}`} />
      </SiteLayout>
    )
  }

  if (!project) {
    return (
      <SiteLayout
        navItems={data.navItems}
        headerCta={{ label: data.headerCtaLabel, href: data.headerCtaHref }}
        footer={data.footer}
        headerVariant="hero"
        heroHeaderTone="solid"
      >
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="rounded-[2rem] border border-[#d7e3f7] bg-white p-8 shadow-[0_18px_44px_-36px_rgba(11,31,87,0.22)]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#c49019]">Portfolio Detail</p>
            <h1 className="mt-4 text-3xl font-bold text-[#0f172a]" style={{ fontFamily: "'Sora', sans-serif" }}>
              Project tidak ditemukan
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Project yang Anda buka tidak tersedia. Silakan kembali ke halaman portfolio untuk memilih project lain.
            </p>
            <Link
              to="/portfolio"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0f2f78] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#184aa8]"
            >
              Kembali ke Portfolio
            </Link>
          </div>
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
      heroHeaderTone="solid"
    >
      <PortfolioDetailSection project={project} />
      <PortfolioClosingCtaSection content={data.closingCta} />
    </SiteLayout>
  )
}
