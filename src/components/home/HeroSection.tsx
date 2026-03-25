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
    <section id="home" ref={scopeRef} className="relative isolate overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute -left-28 -top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-8 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-18 md:grid-cols-2 md:items-center md:py-24">
        <div className="space-y-6">
          <span ref={eyebrowRef} className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            {content.eyebrow}
          </span>

          <h1 ref={titleRef} className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            {content.title}
          </h1>

          <p ref={descriptionRef} className="max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            {content.description}
          </p>

          <div ref={actionsRef} className="flex flex-wrap gap-3">
            <button className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
              {content.primaryCtaLabel}
            </button>
            <button className="rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/60">
              {content.secondaryCtaLabel}
            </button>
          </div>
        </div>

        <div className="h-70 rounded-2xl border border-white/10 bg-linear-to-b from-white/5 to-transparent p-4 md:h-95">
          <HeroOrbCanvas />
        </div>
      </div>
    </section>
  )
}
