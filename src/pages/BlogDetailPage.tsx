import { Link, Navigate, useParams } from 'react-router-dom'
import { BlogDetailArticleSection } from '../components/blog/BlogDetailArticleSection'
import { PageStateSection } from '../components/common/PageStateSection'
import { useHomeContent } from '../hooks/useHomeContent'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { SiteLayout } from '../layouts/SiteLayout'

export function BlogDetailPage() {
  const { slug } = useParams()
  const { data, isLoading, error } = useHomeContent()

  const article = data?.articles.find((item) => item.slug === slug) ?? null

  usePageMetadata({
    title: article
      ? `Morrus Digital Connecting | Blog - ${article.title}`
      : 'Morrus Digital Connecting | Blog Detail',
    description: article
      ? article.summary
      : 'Detail artikel blog Morrus Digital Connecting.',
  })

  if (!slug) {
    return <Navigate to="/blog" replace />
  }

  if (isLoading) {
    return (
      <SiteLayout headerVariant="hero" heroHeaderTone="solid">
        <PageStateSection tone="info" text="Loading blog detail..." />
      </SiteLayout>
    )
  }

  if (error || !data) {
    return (
      <SiteLayout headerVariant="hero" heroHeaderTone="solid">
        <PageStateSection tone="error" text={`Failed to load blog content: ${error ?? 'Unknown error'}`} />
      </SiteLayout>
    )
  }

  if (!article) {
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
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#c49019]">Blog Detail</p>
            <h1 className="mt-4 text-3xl font-bold text-[#0f172a]" style={{ fontFamily: "'Sora', sans-serif" }}>
              Artikel tidak ditemukan
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Artikel yang Anda buka tidak tersedia. Silakan kembali ke halaman blog untuk memilih artikel lain.
            </p>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0f2f78] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#184aa8]"
            >
              Kembali ke Blog
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
      <BlogDetailArticleSection article={article} />
    </SiteLayout>
  )
}
