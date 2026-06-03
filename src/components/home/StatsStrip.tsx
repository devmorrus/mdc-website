import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { StatItem } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface StatsStripProps {
  stats: StatItem[]
}

export function StatsStrip({ stats }: StatsStripProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    to: { stagger: 0.08 },
  })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_28%,#f7fbff_100%)] py-18 md:py-22">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(246,196,69,0.12),transparent_18%),radial-gradient(circle_at_88%_82%,rgba(24,74,168,0.08),transparent_20%)]" />
      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Company Highlights"
          title="Angka yang menggambarkan pengalaman, kecepatan, dan kontinuitas kerja kami."
          description="Statistik ini masih menggunakan data dummy, namun struktur section-nya sudah disiapkan untuk kebutuhan company profile yang lebih formal dan meyakinkan."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <article
              key={item.label}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element
                }
              }}
              className="rounded-[1.75rem] border border-blue-100 bg-gradient-to-br from-white to-[#f4f8ff] p-6 shadow-[0_18px_50px_-32px_rgba(11,31,87,0.22)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-3xl font-bold text-[#0b1f57] md:text-[2rem]"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                    {item.label}
                  </p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff2bf] text-sm font-bold text-[#0f2f78]">
                  0{index + 1}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
