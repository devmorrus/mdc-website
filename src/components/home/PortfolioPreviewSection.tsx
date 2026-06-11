import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { PortfolioItem } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface PortfolioPreviewSectionProps {
  items: PortfolioItem[]
}

export function PortfolioPreviewSection({ items }: PortfolioPreviewSectionProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    to: { stagger: 0.08 },
  })

  return (
    <section ref={sectionRef} id="portfolio" className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_100%)] py-18 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_24%,rgba(24,74,168,0.08),transparent_20%),radial-gradient(circle_at_12%_76%,rgba(246,196,69,0.08),transparent_18%)]" />
      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Portofolio dan Proyek"
          title="Bukti nyata bagaimana kami menerjemahkan kebutuhan bisnis menjadi solusi digital."
          description="Jelajahi hasil karya kami. Dari tahap analisis hingga eksekusi akhir, lihat bagaimana kami merancang platform digital yang memperkuat kredibilitas brand dan mendukung pertumbuhan operasional klien."
          centered
        />

        <div className="mt-8 flex justify-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center rounded-full bg-[#0f2f78] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#184aa8]"
          >
            Lihat semua portofolio
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={item.id}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element
                }
              }}
              className="group overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-[0_18px_50px_-34px_rgba(11,31,87,0.22)]"
            >
              <div className="relative h-72 overflow-hidden bg-[#dfe9ff]">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f57]/64 via-[#0b1f57]/14 to-[#0b1f57]/8" />
                <div className="absolute inset-x-0 top-0 p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#f6c445] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0b1f57]">
                      {item.category}
                    </span>
                    <span className="text-sm font-semibold text-white/90">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center p-6 text-center">
                <h3
                  className="text-2xl font-bold text-[#0b1f57]"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {item.name}
                </h3>
                <p className="mt-4 max-w-[30rem] text-base leading-7 text-slate-600">
                  {item.summary}
                </p>
                <div className="mt-6 flex justify-center">
                  <Link
                    to={item.href}
                    className="inline-flex items-center justify-center rounded-full bg-[#0f2f78] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#184aa8]"
                  >
                    Lihat Produk
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
