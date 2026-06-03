import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { ArticleItem } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface ArticlesSectionProps {
  items: ArticleItem[]
}

export function ArticlesSection({ items }: ArticlesSectionProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    to: { stagger: 0.08 },
  })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[linear-gradient(180deg,#edf3ff_0%,#f7fbff_100%)] py-18 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(246,196,69,0.09),transparent_16%),radial-gradient(circle_at_86%_70%,rgba(24,74,168,0.06),transparent_18%)]" />
      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Blog dan Artikel Terbaru"
          title="Section insight yang dapat dipakai untuk memperkuat SEO dan menunjukkan kompetensi perusahaan."
          description="Karena blog masih bersifat opsional, card artikel ini menggunakan konten dummy terlebih dulu sebagai placeholder struktur."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.id}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element
                }
              }}
              className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-[0_18px_50px_-38px_rgba(11,31,87,0.16)]"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
                <span className="rounded-full bg-[#fff2bf] px-3 py-1 text-[#0f2f78]">{item.category}</span>
                <span>{item.publishedAt}</span>
                <span>{item.readTime}</span>
              </div>

              <h3
                className="mt-5 text-xl font-bold leading-snug text-[#0b1f57]"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {item.summary}
              </p>

              <p className="mt-6 text-sm font-semibold text-[#0f2f78]">
                Insight preview
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
