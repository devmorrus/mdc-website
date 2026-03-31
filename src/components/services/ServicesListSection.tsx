import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import type { ServiceDetailItem } from '../../types/services'

interface ServicesListSectionProps {
  services: ServiceDetailItem[]
}

const SERVICE_META = [
  {
    accent: { border: 'hover:border-sky-400/40', icon: 'border-sky-400/30 bg-sky-400/10 text-sky-300', dot: 'bg-sky-400', glow: 'from-sky-400/6', num: 'text-sky-400/15' },
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 01.284-2.253" /></svg>,
    process: ['Riset & Discovery', 'Desain UI/UX', 'Development', 'Launch'],
  },
  {
    accent: { border: 'hover:border-amber-300/40', icon: 'border-amber-300/30 bg-amber-300/10 text-amber-300', dot: 'bg-amber-300', glow: 'from-amber-300/6', num: 'text-amber-300/15' },
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
    process: ['Analisis', 'Arsitektur', 'Pengembangan', 'Deploy'],
  },
  {
    accent: { border: 'hover:border-violet-400/40', icon: 'border-violet-400/30 bg-violet-400/10 text-violet-300', dot: 'bg-violet-400', glow: 'from-violet-400/6', num: 'text-violet-400/15' },
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
    process: ['Identifikasi KPI', 'Desain Dashboard', 'Integrasi', 'Handover'],
  },
  {
    accent: { border: 'hover:border-emerald-400/40', icon: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300', dot: 'bg-emerald-400', glow: 'from-emerald-400/6', num: 'text-emerald-400/15' },
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>,
    process: ['Audit Sistem', 'Monitoring', 'Update Rutin', 'Laporan'],
  },
]

export function ServicesListSection({ services }: ServicesListSectionProps) {
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
            { y: 60, opacity: 0, scale: 0.94 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.1)', stagger: 0.12 },
          )
          observer.disconnect()
        })
      },
      { threshold: 0.06 },
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    gsap.to(card, {
      rotateX: ((e.clientY - rect.top - rect.height / 2) / rect.height) * -5,
      rotateY: ((e.clientX - rect.left - rect.width / 2) / rect.width) * 5,
      duration: 0.3, ease: 'power2.out', transformPerspective: 900,
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' })
  }

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 h-40 w-175 bg-blue-500/4 blur-3xl rounded-full" />

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service, i) => {
          const meta = SERVICE_META[i % SERVICE_META.length]
          return (
            <article
              key={service.id}
              ref={(el) => { if (el) cardsRef.current[i] = el }}
              className={`group relative overflow-hidden rounded-3xl border border-blue-200/15 bg-linear-to-br from-blue-900/30 via-blue-950/55 to-blue-950/75 p-7 transition-all duration-400 ${meta.accent.border} hover:shadow-[0_24px_70px_-20px_rgba(30,64,175,0.45)] cursor-default`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Hover glow */}
              <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${meta.accent.glow} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

              {/* Giant background number */}
              <div className={`pointer-events-none absolute right-3 top-0 text-9xl font-black select-none leading-none ${meta.accent.num} transition-all duration-500 group-hover:opacity-50`} style={{ fontFamily: "'Sora', sans-serif" }}>
                {service.icon}
              </div>

              {/* Icon */}
              <div className="mb-5">
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${meta.accent.icon} transition-all duration-300 group-hover:scale-105`}>
                  {meta.icon}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-blue-50 mb-3 transition-colors duration-300 group-hover:text-amber-50" style={{ fontFamily: "'Sora', sans-serif" }}>
                {service.title}
              </h2>

              <p className="text-sm leading-relaxed text-blue-200/65 mb-6">{service.description}</p>

              {/* Benefits */}
              <ul className="space-y-2 mb-6">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-blue-100/75">
                    <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${meta.accent.dot}`} />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mb-5 h-px bg-linear-to-r from-blue-200/15 to-transparent" />

              {/* Process steps */}
              <div className="mb-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400/50">Proses Kerja</p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  {meta.process.map((step, si) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-blue-300/55">{si + 1}. {step}</span>
                      {si < meta.process.length - 1 && (
                        <svg className="h-3 w-3 text-blue-700/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                to={service.ctaHref}
                className={`group/btn inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${meta.accent.icon} hover:scale-[1.02]`}
              >
                {service.ctaLabel}
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-amber-300/60 to-transparent transition-all duration-500 group-hover:w-2/3" />
            </article>
          )
        })}
      </div>
    </section>
  )
}