import { useRef } from 'react'
import { useHomeHeroAnimation } from '../../animations/useHomeHeroAnimation'
import { HeroOrbCanvas } from '../../three/HeroOrbCanvas'
import type { HeroContent } from '../../types/home'

interface HeroSectionProps {
  content: HeroContent
}

export function HeroSection({ content }: HeroSectionProps) {
  const scopeRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useHomeHeroAnimation({
    scope: scopeRef,
    targets: [eyebrowRef, titleRef, descriptionRef, actionsRef],
  })

  return (
    <section
      id="home"
      ref={scopeRef}
      className="relative isolate overflow-hidden border-b border-blue-900/30 min-h-[92vh] flex items-center"
    >
      {/* Layered ambient glows */}
      <div className="pointer-events-none absolute -left-40 -top-20 h-125 w-125 rounded-full bg-sky-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-10 h-100 w-100 rounded-full bg-amber-300/20 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/3 bottom-0 h-75 w-75 rounded-full bg-blue-600/15 blur-[90px]" />

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Diagonal accent line */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-linear-to-b from-transparent via-amber-300/20 to-transparent" />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:py-28 relative z-10">
        {/* Left: Content */}
        <div className="space-y-7">
          {/* Eyebrow badge */}
          <span
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-200/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
            {content.eyebrow}
          </span>

          {/* Headline */}
          <h1
            ref={titleRef}
            className="text-5xl font-extrabold leading-[1.08] tracking-tight text-blue-50 md:text-6xl xl:text-7xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {content.title.split(' ').map((word, i) => {
              const isAccent = ['Partner', 'Business', 'Growth', 'Digital'].includes(word)
              return (
                <span key={i}>
                  <span
                    className={
                      isAccent
                        ? 'bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent'
                        : ''
                    }
                  >
                    {word}
                  </span>
                  {i < content.title.split(' ').length - 1 ? ' ' : ''}
                </span>
              )
            })}
          </h1>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="max-w-lg text-base leading-relaxed text-blue-200/75 md:text-lg"
          >
            {content.description}
          </p>

          {/* CTAs */}
          <div ref={actionsRef} className="flex flex-wrap items-center gap-4">
            <a
              href={content.primaryCtaHref}
              className="group relative overflow-hidden rounded-xl bg-amber-300 px-7 py-3.5 text-sm font-bold text-blue-950 transition-all duration-300 hover:bg-amber-200 hover:shadow-[0_0_40px_rgba(251,191,36,0.5)]"
            >
              <span className="relative z-10">{content.primaryCtaLabel}</span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </a>
            <a
              href={content.secondaryCtaHref}
              className="group flex items-center gap-2 rounded-xl border border-blue-200/30 px-7 py-3.5 text-sm font-semibold text-blue-100 backdrop-blur-sm transition-all duration-300 hover:border-amber-300/60 hover:text-amber-100"
            >
              {content.secondaryCtaLabel}
              <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-5 pt-2">
            {['120+ Projects', '94% Retention', '95+ Score'].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <div className="h-1 w-1 rounded-full bg-amber-300/70" />
                <span className="text-xs text-blue-300/60">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Canvas */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-amber-300/10 via-blue-500/5 to-transparent blur-xl" />

          {/* Canvas container */}
          <div className="relative h-80 rounded-3xl border border-blue-200/15 bg-linear-to-br from-blue-900/40 via-blue-950/60 to-blue-950/80 p-1 shadow-[0_30px_80px_-20px_rgba(251,191,36,0.25)] md:h-120 backdrop-blur-sm">
            {/* Inner border highlight */}
            <div className="absolute inset-px rounded-[22px] border border-white/5" />

            <HeroOrbCanvas />

            {/* Corner accent decorations */}
            <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-amber-300/40 rounded-tl-lg" />
            <div className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-amber-300/40 rounded-br-lg" />
            <div className="absolute right-4 top-4 h-4 w-4 border-r border-t border-blue-400/30 rounded-tr-md" />
            <div className="absolute left-4 bottom-4 h-4 w-4 border-l border-b border-blue-400/30 rounded-bl-md" />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 rounded-xl border border-blue-200/20 bg-blue-950/80 px-4 py-2.5 backdrop-blur-md shadow-xl">
            <p className="text-xs text-blue-300/60 uppercase tracking-widest">Avg. Performance</p>
            <p className="text-xl font-bold text-amber-300">95+</p>
          </div>

          {/* Floating badge 2 */}
          <div className="absolute -top-4 -right-4 rounded-xl border border-amber-300/20 bg-blue-950/80 px-4 py-2.5 backdrop-blur-md shadow-xl">
            <p className="text-xs text-blue-300/60 uppercase tracking-widest">Projects Done</p>
            <p className="text-xl font-bold text-amber-300">120+</p>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-linear-to-t from-[#021331] to-transparent" />
    </section>
  )
}