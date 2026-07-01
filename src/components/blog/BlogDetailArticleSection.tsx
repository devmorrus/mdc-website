import { Link } from 'react-router-dom'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { ArticleItem } from '../../types/home'

interface BlogDetailArticleSectionProps {
  article: ArticleItem
}

export function BlogDetailArticleSection({ article }: BlogDetailArticleSectionProps) {
  const sectionRef = useGsapReveal<HTMLElement>({
    from: { y: 28, opacity: 0 },
    to: { duration: 0.75 },
    threshold: 0.08,
  })

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

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] border border-[#d7e3f7] bg-white shadow-[0_26px_60px_-38px_rgba(11,31,87,0.22)]">
          <div className="aspect-[16/8] overflow-hidden bg-[#dfe9ff]">
            <img
              src={article.imageUrl}
              alt={article.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

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

        <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#0f172a_0%,#111c35_100%)] p-8 text-white shadow-[0_26px_60px_-40px_rgba(11,31,87,0.4)]">
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
