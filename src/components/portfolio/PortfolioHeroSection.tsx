import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { PortfolioHeroContent } from '../../types/portfolio'
import { PortfolioHeroCanvasOpt } from '../../three/OptimizedCanvases'

interface PortfolioHeroSectionProps {
  content: PortfolioHeroContent
}

export function PortfolioHeroSection({ content }: PortfolioHeroSectionProps) {
  const badgeRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(badgeRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 })
      .fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, '-=0.3')
      .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, '-=0.35')
  }, [])

  return (
    <section className="relative isolate overflow-hidden border-b border-blue-900/30 min-h-[80vh] flex items-center">
      <div className="pointer-events-none absolute -left-40 -top-20 h-105 w-105 rounded-full bg-sky-500/14 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-90 w-90 rounded-full bg-amber-300/14 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Three.js fills right portion */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[55%] opacity-70">
        <PortfolioHeroCanvasOpt />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[30%] bg-linear-to-l from-[#021331] via-[#021331]/50 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28 md:py-36">
        <div className="max-w-2xl space-y-7">
          <p ref={badgeRef} className="inline-flex items-center gap-2 rounded-full border border-amber-300/45 bg-amber-200/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
            {content.eyebrow}
          </p>

          <h1 ref={titleRef} className="text-4xl font-extrabold leading-[1.08] tracking-tight text-blue-50 md:text-5xl xl:text-6xl" style={{ fontFamily: "'Sora', sans-serif" }}>
            {content.title.split(' ').map((word, i) => {
              const accent = ['Pilihan', 'Mewakili', 'Standar', 'Kualitas', 'Morrus'].includes(word)
              return (
                <span key={i}>
                  <span className={accent ? 'bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent' : ''}>{word}</span>{' '}
                </span>
              )
            })}
          </h1>

          <p ref={descRef} className="max-w-lg text-base leading-relaxed text-blue-200/70 md:text-lg">{content.description}</p>

          {/* Industry filters visual */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['Company Profile', 'Web App', 'Internal System', 'Brand Website', 'Platform'].map((label) => (
              <span key={label} className="rounded-full border border-blue-200/18 bg-blue-900/28 px-3.5 py-1.5 text-xs font-medium text-blue-300/65 backdrop-blur-sm transition-all duration-300 hover:border-amber-300/40 hover:text-amber-200 cursor-default">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-linear-to-t from-[#021331] to-transparent" />
    </section>
  )
}