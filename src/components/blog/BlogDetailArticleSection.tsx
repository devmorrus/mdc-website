import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { ArticleItem } from '../../types/home'

interface BlogDetailArticleSectionProps {
  article: ArticleItem
  recommendedArticles: ArticleItem[]
}

export function BlogDetailArticleSection({ article, recommendedArticles }: BlogDetailArticleSectionProps) {
  const sectionRef = useGsapReveal<HTMLElement>({
    from: { y: 28, opacity: 0 },
    to: { duration: 0.75 },
    threshold: 0.08,
  })

  const sliderRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector('a')
      if (card) {
        const cardWidth = card.clientWidth + 24 // card width + gap (24px)
        sliderRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
      } else {
        sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' })
      }
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector('a')
      if (card) {
        const cardWidth = card.clientWidth + 24 // card width + gap (24px)
        sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
      } else {
        sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' })
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdfa_0%,#f8fbff_100%)] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_18%,rgba(24,74,168,0.08),transparent_18%),radial-gradient(circle_at_14%_78%,rgba(246,196,69,0.08),transparent_16%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="mb-10 flex flex-wrap items-center gap-3 text-sm">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-[#0f172a] shadow-sm transition hover:border-[#184aa8]/20 hover:text-[#184aa8]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Blog
          </Link>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 font-semibold text-amber-700">
            {article.category}
          </span>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#c49019]">
            Blog Detail
          </p>
          <h1
            className="mt-4 text-3xl font-bold leading-tight text-[#0f172a] md:text-5xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {article.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            {article.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">{article.publishedAt}</span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">Oleh {article.author}</span>
          </div>
        </div>

        {/* Hero Image - Full Width & Centered */}
        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] border border-[#d7e3f7] bg-white shadow-[0_26px_60px_-38px_rgba(11,31,87,0.22)]">
          <div className="aspect-[16/8] overflow-hidden bg-[#dfe9ff]">
            <img
              src={article.imageUrl}
              alt={article.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Article Body */}
        <article className="mx-auto mt-14 w-full max-w-5xl">
          <div className="rounded-[2rem] border border-[#d7e3f7] bg-white px-6 py-8 shadow-[0_22px_50px_-38px_rgba(11,31,87,0.18)] md:px-10 md:py-10">
            <p className="text-lg leading-9 text-slate-700">
              {article.content.introduction}
            </p>

            <div className="mt-10 space-y-10">
              {article.content.sections.map((section) => (
                <section key={section.heading}>
                  <h2
                    className="text-2xl font-bold leading-tight text-[#0f172a]"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {section.heading}
                  </h2>

                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-slate-600">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.bullets?.length ? (
                    <ul className="mt-5 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-base leading-7 text-slate-600">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#f6c445]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] p-6">
              <p className="text-base leading-8 text-slate-700">
                {article.content.closing}
              </p>
            </div>
          </div>
        </article>

        {/* Baca Juga Artikel Kami - Bottom Recommendations Slider */}
        {recommendedArticles.length > 0 && (
          <div className="mx-auto mt-16 w-full max-w-5xl relative">
            <style>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>

            <div className="flex items-center justify-between mb-8">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-[#0f172a]" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Baca Juga Artikel Kami
                </h3>
                <div className="mt-2 h-1.5 w-16 rounded-full bg-[#f6c445]" />
              </div>

              {/* Navigation arrows (visible if there are more than 1 recommended articles) */}
              {recommendedArticles.length > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={scrollLeft}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition shadow-sm hover:border-[#184aa8] hover:bg-[#184aa8] hover:text-white"
                    aria-label="Artikel sebelumnya"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={scrollRight}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition shadow-sm hover:border-[#184aa8] hover:bg-[#184aa8] hover:text-white"
                    aria-label="Artikel selanjutnya"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Slider track container */}
            <div
              ref={sliderRef}
              className="no-scrollbar flex w-full gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {recommendedArticles.map((recArticle) => (
                <Link
                  key={recArticle.id}
                  to={recArticle.href}
                  className="group flex w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start snap-always flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_12px_30px_-15px_rgba(11,31,87,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-[#184aa8]/20 hover:shadow-[0_22px_44px_-20px_rgba(11,31,87,0.15)]"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-[#dfe9ff]">
                    <img
                      src={recArticle.imageUrl}
                      alt={recArticle.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                      {recArticle.category}
                    </span>
                    <h4
                      className="mt-2 text-base font-bold leading-snug text-slate-800 transition-colors duration-300 group-hover:text-[#184aa8]"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {recArticle.title}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
                      {recArticle.summary}
                    </p>
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100 text-[10px] text-slate-400 font-medium">
                      <span>{recArticle.publishedAt}</span>
                      <span>Oleh {recArticle.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action Box */}
        <div className="mx-auto mt-16 max-w-4xl rounded-[2rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#0f172a_0%,#111c35_100%)] p-8 text-white shadow-[0_26px_60px_-40px_rgba(11,31,87,0.4)]">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">
            Butuh arahan berikutnya?
          </p>
          <h2
            className="mt-4 text-2xl font-bold text-white md:text-3xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Diskusikan bagaimana insight ini bisa diterapkan ke website bisnis Anda.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Kami bisa membantu merancang struktur konten, CTA, dan pengalaman halaman yang lebih siap mendukung kredibilitas serta konversi bisnis Anda.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#facc15] px-5 py-3 text-sm font-bold text-[#0b1f57] transition hover:bg-[#fde047]"
            >
              Konsultasi Sekarang
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Lihat Artikel Lainnya
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
