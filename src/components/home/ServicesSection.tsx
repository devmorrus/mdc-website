import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { ServiceItem } from '../../types/home'

interface ServicesSectionProps {
  items: ServiceItem[]
}

// Service-specific accent colors for visual differentiation
const SERVICE_ACCENTS = [
  { border: 'hover:border-sky-400/40', glow: 'group-hover:from-sky-400/8', dot: 'bg-sky-400', icon: 'border-sky-400/30 bg-sky-400/10 text-sky-300' },
  { border: 'hover:border-amber-300/40', glow: 'group-hover:from-amber-300/8', dot: 'bg-amber-300', icon: 'border-amber-300/30 bg-amber-300/10 text-amber-200' },
  { border: 'hover:border-violet-400/40', glow: 'group-hover:from-violet-400/8', dot: 'bg-violet-400', icon: 'border-violet-400/30 bg-violet-400/10 text-violet-300' },
  { border: 'hover:border-emerald-400/40', glow: 'group-hover:from-emerald-400/8', dot: 'bg-emerald-400', icon: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' },
]

// Service icons
const SERVICE_ICONS = [
  // Globe / website
  <svg key="0" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 01.284-2.253" />
  </svg>,
  // Code bracket
  <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>,
  // Chart
  <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>,
  // Wrench
  <svg key="3" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
  </svg>,
]

export function ServicesSection({ items }: ServicesSectionProps) {
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
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.65,
                ease: 'power3.out',
                stagger: 0.1,
                delay: 0.2,
              },
            )
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // 3D tilt on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800,
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out',
    })
  }

  return (
    <section ref={sectionRef} id="services" className="relative mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      {/* Ambient decoration */}
      <div className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 h-40 w-150 bg-blue-500/5 blur-3xl rounded-full" />

      {/* Section header */}
      <div ref={headerRef} className="mb-14 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-amber-300/60" />
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-300">Services</p>
          </div>
          <h2
            className="max-w-xl text-3xl font-extrabold leading-tight text-blue-50 md:text-4xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Layanan Utama Untuk Mendukung{' '}
            <span className="bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
              Pertumbuhan Bisnis
            </span>
          </h2>
        </div>
        <p className="max-w-xs text-sm text-blue-300/60">
          Solusi digital terstruktur dari strategi hingga implementasi teknis
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, i) => {
          const accent = SERVICE_ACCENTS[i % SERVICE_ACCENTS.length]
          return (
            <article
              key={item.id}
              ref={(el) => {
                if (el) cardsRef.current[i] = el
              }}
              className={`group relative overflow-hidden rounded-2xl border border-blue-200/15 bg-linear-to-br from-blue-900/30 via-blue-950/50 to-blue-950/70 p-6 transition-all duration-400 ${accent.border} hover:shadow-[0_20px_60px_-20px_rgba(30,64,175,0.4)] cursor-default`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Hover glow */}
              <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent.glow} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

              {/* Number + Icon */}
              <div className="mb-5 flex items-center justify-between">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${accent.icon}`}>
                  {SERVICE_ICONS[i % SERVICE_ICONS.length]}
                </div>
                <span className="text-5xl font-black text-blue-950/60 select-none" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {item.icon}
                </span>
              </div>

              {/* Title & Description */}
              <h3
                className="text-xl font-bold text-blue-50"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-blue-200/65">{item.description}</p>

              {/* Highlights */}
              <ul className="mt-5 space-y-2">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2.5 text-sm text-blue-100/75">
                    <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${accent.dot}`} />
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* Bottom slide-in CTA */}
              <div className="mt-5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200"
                >
                  Pelajari lebih lanjut
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-${accent.dot.replace('bg-', '')} to-transparent transition-all duration-500 group-hover:w-2/3`} />
            </article>
          )
        })}
      </div>
    </section>
  )
}