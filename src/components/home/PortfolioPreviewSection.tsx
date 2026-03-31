import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { PortfolioItem } from '../../types/home'

interface PortfolioPreviewSectionProps {
  items: PortfolioItem[]
}

const CATEGORY_COLORS: Record<string, string> = {
  'Company Platform': 'text-sky-300 bg-sky-400/10 border-sky-400/25',
  'Internal System': 'text-violet-300 bg-violet-400/10 border-violet-400/25',
  'Corporate Profile': 'text-amber-300 bg-amber-300/10 border-amber-300/25',
  'Business Website': 'text-emerald-300 bg-emerald-400/10 border-emerald-400/25',
}

const THUMBNAIL_GRADIENTS = [
  'from-sky-500/20 via-blue-600/10 to-blue-950',
  'from-violet-500/20 via-blue-700/10 to-blue-950',
  'from-amber-400/20 via-blue-800/10 to-blue-950',
  'from-emerald-500/20 via-blue-700/10 to-blue-950',
]

const THUMBNAIL_INITIALS = ['JC', 'JA', 'FT', 'DI']

export function PortfolioPreviewSection({ items }: PortfolioPreviewSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              headerRef.current,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            )
            gsap.fromTo(
              cardsRef.current,
              { y: 50, opacity: 0, scale: 0.96 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: 'back.out(1.1)',
                stagger: 0.12,
                delay: 0.15,
              },
            )
            observer.disconnect()
          }
        })
      },
      { threshold: 0.08 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="portfolio" className="relative mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      {/* Background ambient */}
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-amber-300/4 blur-3xl" />

      {/* Header */}
      <div ref={headerRef} className="mb-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-amber-300/60" />
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-300">Portfolio Preview</p>
          </div>
          <h2
            className="max-w-xl text-3xl font-extrabold leading-tight text-blue-50 md:text-4xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Project Pilihan yang Telah{' '}
            <span className="bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
              Kami Kerjakan
            </span>
          </h2>
        </div>
        <p className="max-w-xs text-sm text-blue-300/60">
          Lintas industri, dengan pendekatan desain yang modern dan arsitektur scalable
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, i) => {
          const categoryStyle = CATEGORY_COLORS[item.category] ?? 'text-blue-300 bg-blue-400/10 border-blue-400/25'
          return (
            <article
              key={item.id}
              ref={(el) => { if (el) cardsRef.current[i] = el }}
              className="group relative overflow-hidden rounded-2xl border border-blue-200/15 bg-linear-to-br from-blue-900/25 via-blue-950/40 to-blue-950/60 transition-all duration-400 hover:-translate-y-1 hover:border-amber-200/30 hover:shadow-[0_24px_60px_-16px_rgba(251,191,36,0.15)] cursor-pointer"
            >
              {/* Thumbnail strip */}
              <div className={`relative h-32 bg-linear-to-br ${THUMBNAIL_GRADIENTS[i % THUMBNAIL_GRADIENTS.length]} overflow-hidden`}>
                {/* Abstract pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  }}
                />
                {/* Initials */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-4xl font-black text-white/15 select-none"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {THUMBNAIL_INITIALS[i] ?? item.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                {/* Category badge */}
                <div className={`absolute top-4 left-4 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${categoryStyle}`}>
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="text-lg font-bold text-blue-50 transition-colors duration-300 group-hover:text-amber-100"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-200/65">{item.summary}</p>
              </div>

              {/* Hover overlay shimmer */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-300/0 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:from-amber-300/4 group-hover:opacity-100" />
            </article>
          )
        })}
      </div>

      {/* View all CTA */}
      <div className="mt-10 flex items-center justify-between">
        <div className="h-px flex-1 bg-linear-to-r from-blue-200/10 to-transparent" />
        <a
          href="/portfolio"
          className="group mx-6 inline-flex items-center gap-2.5 rounded-xl border border-blue-200/25 px-6 py-3 text-sm font-semibold text-blue-200 backdrop-blur-sm transition-all duration-300 hover:border-amber-300/50 hover:text-amber-200"
        >
          Lihat Semua Portfolio
          <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <div className="h-px flex-1 bg-linear-to-l from-blue-200/10 to-transparent" />
      </div>
    </section>
  )
}