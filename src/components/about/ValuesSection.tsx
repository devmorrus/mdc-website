import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { CompanyValueItem } from '../../types/about'

interface ValuesSectionProps {
  values: CompanyValueItem[]
}

const VALUE_ICONS = [
  // Integrity – shield check
  <svg key="integrity" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
  // Innovation – lightbulb
  <svg key="innovation" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  </svg>,
  // Collaboration – users
  <svg key="collaboration" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>,
  // Impact – chart
  <svg key="impact" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>,
]

const VALUE_ACCENTS = [
  { border: 'hover:border-amber-300/40', icon: 'border-amber-300/35 bg-amber-300/10 text-amber-300', num: 'text-amber-300/20', glow: 'from-amber-300/6' },
  { border: 'hover:border-sky-400/40', icon: 'border-sky-400/35 bg-sky-400/10 text-sky-300', num: 'text-sky-400/20', glow: 'from-sky-400/6' },
  { border: 'hover:border-violet-400/40', icon: 'border-violet-400/35 bg-violet-400/10 text-violet-300', num: 'text-violet-400/20', glow: 'from-violet-400/6' },
  { border: 'hover:border-emerald-400/40', icon: 'border-emerald-400/35 bg-emerald-400/10 text-emerald-300', num: 'text-emerald-400/20', glow: 'from-emerald-400/6' },
]

export function ValuesSection({ values }: ValuesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          gsap.fromTo(headerRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
          gsap.fromTo(
            cardsRef.current,
            { y: 50, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.2)', stagger: 0.1, delay: 0.2 },
          )
          observer.disconnect()
        })
      },
      { threshold: 0.08 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    gsap.to(card, {
      rotateX: ((y - cy) / cy) * -6,
      rotateY: ((x - cx) / cx) * 6,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 900,
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' })
  }

  return (
    <section ref={sectionRef} id="company-values" className="relative mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      {/* Ambient */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-amber-300/4 blur-3xl" />

      {/* Header */}
      <div ref={headerRef} className="mb-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-amber-300/60" />
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-300">Nilai Perusahaan</p>
          </div>
          <h2
            className="max-w-xl text-3xl font-extrabold leading-tight text-blue-50 md:text-4xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Prinsip Kerja yang Menjadi{' '}
            <span className="bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
              Fondasi Tim
            </span>
          </h2>
        </div>
        <p className="max-w-xs text-sm text-blue-300/55">
          Empat nilai inti yang memandu setiap keputusan dan deliverable kami
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {values.map((item, i) => {
          const accent = VALUE_ACCENTS[i % VALUE_ACCENTS.length]
          return (
            <article
              key={item.id}
              ref={(el) => { if (el) cardsRef.current[i] = el }}
              className={`group relative overflow-hidden rounded-2xl border border-blue-200/15 bg-linear-to-br from-blue-900/30 via-blue-950/50 to-blue-950/70 p-7 transition-all duration-400 ${accent.border} hover:shadow-[0_20px_60px_-20px_rgba(30,64,175,0.4)] cursor-default`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Hover glow */}
              <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent.glow} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

              {/* Large background number */}
              <div
                className={`pointer-events-none absolute right-4 top-2 text-8xl font-black select-none leading-none ${accent.num} transition-all duration-500 group-hover:opacity-40 group-hover:scale-110`}
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${accent.icon} transition-all duration-300 group-hover:scale-105`}>
                {VALUE_ICONS[i % VALUE_ICONS.length]}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold text-blue-50 mb-3 transition-colors duration-300 group-hover:text-amber-50"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-blue-200/65">{item.description}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-amber-300/60 to-transparent transition-all duration-500 group-hover:w-1/2" />
            </article>
          )
        })}
      </div>
    </section>
  )
}