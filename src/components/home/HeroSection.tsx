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
    <section id="home" ref={scopeRef} className="relative isolate overflow-hidden border-b border-blue-900/30">
      <div className="pointer-events-none absolute -left-28 -top-24 h-72 w-72 rounded-full bg-sky-500/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-8 h-72 w-72 rounded-full bg-amber-300/35 blur-3xl" />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div className="space-y-6">
          <span ref={eyebrowRef} className="inline-flex rounded-full border border-amber-300/60 bg-amber-200/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
            {content.eyebrow}
          </span>

          <h1 ref={titleRef} className="text-4xl font-semibold leading-tight text-blue-50 md:text-5xl">
            {content.title}
          </h1>

          <p ref={descriptionRef} className="max-w-xl text-base leading-relaxed text-blue-100/80 md:text-lg">
            {content.description}
          </p>

          <div ref={actionsRef} className="flex flex-wrap gap-3">
            <a href={content.primaryCtaHref} className="rounded-lg bg-amber-300 px-5 py-3 text-sm font-semibold text-blue-950 transition hover:bg-amber-200">
              {content.primaryCtaLabel}
            </a>
            <a href={content.secondaryCtaHref} className="rounded-lg border border-blue-200/40 px-5 py-3 text-sm font-semibold text-blue-100 transition hover:border-amber-300/80 hover:text-amber-100">
              {content.secondaryCtaLabel}
            </a>
          </div>
        </div>

        <div className="h-72 rounded-2xl border border-blue-200/25 bg-linear-to-b from-blue-200/10 to-transparent p-4 shadow-[0_20px_70px_-32px_rgba(251,191,36,0.65)] md:h-96">
          <HeroOrbCanvas />
        </div>
      </div>
    </section>
  )
}
