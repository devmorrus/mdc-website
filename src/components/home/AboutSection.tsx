import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { AboutSnippetContent } from '../../types/home'

interface AboutSectionProps {
  content: AboutSnippetContent
}

export function AboutSection({ content }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline()
            tl.fromTo(
              leftRef.current,
              { x: -40, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
            ).fromTo(
              rightRef.current,
              { x: 40, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
              '-=0.5',
            )
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      {/* Decorative background shape */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-amber-300/5 blur-3xl" />

      <div className="relative grid gap-10 rounded-3xl border border-blue-200/15 bg-linear-to-br from-blue-900/30 via-blue-950/50 to-blue-950/70 p-8 md:grid-cols-2 md:gap-16 md:p-12 overflow-hidden">
        {/* Corner accent */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-linear-to-bl from-amber-300/8 to-transparent rounded-bl-[100px]" />
        <div className="absolute bottom-0 left-0 h-24 w-24 bg-linear-to-tr from-blue-400/8 to-transparent rounded-tr-[80px]" />

        {/* Left: Text content */}
        <div ref={leftRef} className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-amber-300/60" />
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-300">About</p>
          </div>

          <h2
            className="text-3xl font-extrabold leading-tight text-blue-50 md:text-4xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {content.title}
          </h2>

          <p className="text-sm leading-relaxed text-blue-200/70 md:text-base">{content.summary}</p>

          <a
            href={content.buttonHref}
            className="group inline-flex items-center gap-2.5 rounded-xl border border-amber-300/40 bg-amber-300/8 px-5 py-2.5 text-sm font-semibold text-amber-200 transition-all duration-300 hover:border-amber-300/70 hover:bg-amber-300/15 hover:text-amber-100"
          >
            {content.buttonLabel}
            <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Right: Value points */}
        <div ref={rightRef} className="flex flex-col justify-center gap-3">
          {content.valuePoints.map((point, i) => (
            <div
              key={point}
              className="group flex items-start gap-4 rounded-2xl border border-blue-200/15 bg-blue-900/25 px-5 py-4 transition-all duration-300 hover:border-amber-300/25 hover:bg-blue-900/40"
            >
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-300/30 bg-amber-300/10 text-xs font-bold text-amber-300">
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="text-sm leading-relaxed text-blue-100/80">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}