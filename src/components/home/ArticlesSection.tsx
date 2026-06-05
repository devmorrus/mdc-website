import { useRef, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { ArticleItem } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface ArticlesSectionProps {
  items: ArticleItem[]
}

const ARTICLE_SUMMARY_MAX_LENGTH = 100

function truncateArticleSummary(summary: string) {
  if (summary.length <= ARTICLE_SUMMARY_MAX_LENGTH) {
    return summary
  }

  return `${summary.slice(0, ARTICLE_SUMMARY_MAX_LENGTH).trimEnd()}...`
}

function isArticleSummaryTruncated(summary: string) {
  return summary.length > ARTICLE_SUMMARY_MAX_LENGTH
}

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0
}

export function ArticlesSection({ items }: ArticlesSectionProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    to: { stagger: 0.08 },
  })

  const handleReadMoreClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href !== '/#' || isModifiedClick(event)) {
      return
    }

    event.preventDefault()
    window.history.replaceState(window.history.state, '', '/#')
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#edf3ff_0%,#f7fbff_100%)] py-18 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(246,196,69,0.09),transparent_16%),radial-gradient(circle_at_86%_70%,rgba(24,74,168,0.06),transparent_18%)]" />
      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Blog dan Artikel Terbaru"
          title="Wawasan strategi digital untuk akselerasi bisnis Anda."
          description="Pelajari bagaimana desain, teknologi, dan strategi komunikasi dapat digabungkan untuk memperkuat kredibilitas perusahaan di era digital."
          centered
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {items.map((item, index) => {
            const summaryIsTruncated = isArticleSummaryTruncated(item.summary)

            return (
              <article
                key={item.id}
                ref={(element) => {
                  if (element) {
                    cardsRef.current[index] = element
                  }
                }}
                className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-[0_18px_50px_-38px_rgba(11,31,87,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-36px_rgba(11,31,87,0.22)]"
              >
                <div className="relative h-56 overflow-hidden bg-[#dfe9ff]">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f57]/54 via-[#0b1f57]/10 to-transparent" />
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-[#fff2bf] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f2f78]">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold leading-snug text-[#0b1f57]"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {item.title}
                    </h3>

                    <div className="group/summary relative mt-4 min-h-[5.25rem]">
                      <p
                        className={`text-sm leading-7 text-slate-600 transition-opacity duration-200 ${summaryIsTruncated ? 'cursor-help group-hover/summary:opacity-0' : ''}`}
                      >
                        {truncateArticleSummary(item.summary)}
                      </p>

                      {summaryIsTruncated ? (
                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white opacity-0 transition duration-200 group-hover/summary:opacity-100">
                          <p className="text-sm leading-7 text-slate-600">
                            {item.summary}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <Link
                    to={item.href}
                    onClick={(event) => handleReadMoreClick(event, item.href)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f2f78] transition hover:text-[#184aa8]"
                  >
                    Read more
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">{'->'}</span>
                  </Link>

                  <div className="mt-6 border-t border-blue-100 pt-4">
                    <div className="flex items-center justify-between gap-4 text-xs font-medium text-slate-500">
                      <span>{item.publishedAt}</span>
                      <span>{item.author}</span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
