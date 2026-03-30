import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { PortfolioProjectItem, PortfolioThumbnailTone } from '../../types/portfolio'

interface PortfolioGridSectionProps {
  items: PortfolioProjectItem[]
}

const TONE_STYLES: Record<PortfolioThumbnailTone, { thumb: string; badge: string }> = {
  sky: {
    thumb: 'from-sky-500/30 via-sky-700/15 to-blue-950',
    badge: 'text-sky-300 bg-sky-400/10 border-sky-400/25',
  },
  amber: {
    thumb: 'from-amber-400/30 via-amber-700/15 to-blue-950',
    badge: 'text-amber-300 bg-amber-300/10 border-amber-300/25',
  },
  blue: {
    thumb: 'from-blue-400/30 via-blue-600/15 to-blue-950',
    badge: 'text-blue-300 bg-blue-400/10 border-blue-400/25',
  },
}

const SERVICE_TYPE_COLORS: Record<string, string> = {
  'Website Company Profile': 'text-amber-300 bg-amber-300/10 border-amber-300/25',
  'Web App Custom': 'text-sky-300 bg-sky-400/10 border-sky-400/25',
  'Internal System': 'text-violet-300 bg-violet-400/10 border-violet-400/25',
  'Brand Website': 'text-emerald-300 bg-emerald-400/10 border-emerald-400/25',
  'Website / Platform Custom': 'text-orange-300 bg-orange-400/10 border-orange-400/25',
}

export function PortfolioGridSection({ items }: PortfolioGridSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          gsap.fromTo(
            cardsRef.current,
            { y: 55, opacity: 0, scale: 0.94 },
            { y: 0, opacity: 1, scale: 1, duration: 0.68, ease: 'back.out(1.15)', stagger: 0.09 },
          )
          observer.disconnect()
        })
      },
      { threshold: 0.05 },
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { y: -6, duration: 0.35, ease: 'power2.out' })
  }
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { y: 0, duration: 0.45, ease: 'power3.out' })
  }

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* Ambient */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-40 w-150 bg-amber-300/4 blur-3xl rounded-full" />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, i) => {
          const toneStyle = TONE_STYLES[item.thumbnailTone]
          const serviceStyle = SERVICE_TYPE_COLORS[item.serviceType] ?? 'text-blue-300 bg-blue-400/10 border-blue-400/25'

          return (
            <article
              key={item.id}
              ref={(el) => { if (el) cardsRef.current[i] = el }}
              className="group relative overflow-hidden rounded-2xl border border-blue-200/15 bg-linear-to-br from-blue-900/25 via-blue-950/45 to-blue-950/70 transition-all duration-400 hover:border-amber-300/25 hover:shadow-[0_20px_60px_-16px_rgba(251,191,36,0.18)] cursor-default"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Thumbnail */}
              <div className={`relative h-40 overflow-hidden bg-linear-to-br ${toneStyle.thumb}`}>
                {/* Noise / pattern overlay */}
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 40%, rgba(255,255,255,0.08) 0%, transparent 55%), radial-gradient(circle at 75% 65%, rgba(255,255,255,0.05) 0%, transparent 45%)' }} />

                {/* Initials watermark */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-black text-white/10 select-none" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {item.thumbnailLabel}
                  </span>
                </div>

                {/* Service type badge */}
                <div className={`absolute top-3 left-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${serviceStyle}`}>
                  {item.serviceType}
                </div>

                {/* Hover shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Industry tag */}
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400/55">
                  {item.industry}
                </p>

                {/* Name */}
                <h2 className="text-lg font-bold text-blue-50 transition-colors duration-300 group-hover:text-amber-100" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {item.name}
                </h2>

                {/* Summary */}
                <p className="mt-2.5 text-sm leading-relaxed text-blue-200/60">{item.summary}</p>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-amber-300/70 to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          )
        })}
      </div>
    </section>
  )
}