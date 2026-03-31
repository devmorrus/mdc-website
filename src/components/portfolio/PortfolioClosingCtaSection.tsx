import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import type { PortfolioClosingCtaContent } from '../../types/portfolio'
import { CtaCanvasOpt } from '../../three/OptimizedCanvases'

interface PortfolioClosingCtaSectionProps {
  content: PortfolioClosingCtaContent
}

export function PortfolioClosingCtaSection({ content }: PortfolioClosingCtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          gsap.fromTo(innerRef.current, { y: 30, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' })
          observer.disconnect()
        })
      },
      { threshold: 0.1 },
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-4 md:pb-32">
      <div ref={innerRef} className="relative overflow-hidden rounded-3xl border border-amber-300/20 bg-linear-to-br from-blue-900/60 via-blue-950/75 to-[#021331] shadow-[0_40px_100px_-30px_rgba(251,191,36,0.18)]">
        <div className="absolute inset-0 opacity-40"><CtaCanvasOpt /></div>
        <div className="absolute inset-0 bg-linear-to-br from-blue-950/40 via-transparent to-blue-950/55" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-300/50 to-transparent" />
        <div className="absolute top-0 right-0 h-36 w-36 bg-linear-to-bl from-amber-300/10 to-transparent rounded-bl-[100px] pointer-events-none" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.022]" style={{ backgroundImage: 'linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 grid gap-8 px-8 py-14 md:grid-cols-[1fr_auto] md:items-center md:px-12 md:py-16">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/35 bg-amber-300/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
              Next Project
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-blue-50 md:text-4xl" style={{ fontFamily: "'Sora', sans-serif" }}>
              <span className="bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                {content.title.split(' ').slice(0, 4).join(' ')}
              </span>
              <br />
              {content.title.split(' ').slice(4).join(' ')}
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-blue-200/65 md:text-base">{content.description}</p>

            {/* Horizontal trust pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Konsultasi Gratis', 'Dari Konsep ke Produksi', 'Scalable Architecture'].map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/18 bg-blue-900/28 px-3 py-1 text-xs text-blue-300/60">
                  <svg className="h-3 w-3 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* CTA button */}
          <div className="shrink-0">
            <Link
              to={content.buttonHref}
              className="group relative block overflow-hidden rounded-2xl bg-amber-300 px-8 py-4 text-base font-bold text-blue-950 shadow-[0_0_40px_rgba(251,191,36,0.35)] transition-all duration-300 hover:bg-amber-200 hover:shadow-[0_0_60px_rgba(251,191,36,0.5)] hover:scale-[1.03] text-center whitespace-nowrap"
            >
              <span className="relative z-10">{content.buttonLabel}</span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}