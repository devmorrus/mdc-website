import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { VisionMissionContent } from '../../types/about'
import { VisionCanvasOpt } from '../../three/OptimizedCanvases'

interface VisionMissionSectionProps {
  content: VisionMissionContent
}

export function VisionMissionSection({ content }: VisionMissionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          gsap.fromTo(visionRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' })
          gsap.fromTo(missionRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: 0.18 })
          observer.disconnect()
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="vision-mission" className="relative mx-auto w-full max-w-6xl px-6 py-20 md:py-28 overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none absolute right-1/4 top-0 h-60 w-60 rounded-full bg-amber-300/5 blur-3xl" />

      {/* Section header */}
      <div className="mb-14 flex items-center gap-3">
        <div className="h-px w-8 bg-amber-300/60" />
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-300">Visi & Misi</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Vision card */}
        <div ref={visionRef} className="relative overflow-hidden rounded-3xl border border-amber-300/20 bg-linear-to-br from-blue-900/40 via-blue-950/60 to-blue-950/80 group">
          {/* Three.js ambient canvas */}
          <div className="absolute inset-0 opacity-60">
            <VisionCanvasOpt />
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-950/60 via-blue-950/40 to-transparent" />

          {/* Top border glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-300/50 to-transparent" />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/40 bg-amber-300/15">
                <svg className="h-5 w-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200">Visi</p>
            </div>

            <p
              className="text-xl font-bold leading-snug text-blue-50 md:text-2xl"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {content.vision}
            </p>

            {/* Decorative quote mark */}
            <div className="absolute bottom-6 right-8 text-8xl font-black text-amber-300/8 select-none leading-none" style={{ fontFamily: 'Georgia, serif' }}>
              V
            </div>
          </div>
        </div>

        {/* Mission card */}
        <div ref={missionRef} className="relative overflow-hidden rounded-3xl border border-blue-200/20 bg-linear-to-br from-blue-900/30 via-blue-950/50 to-blue-950/75 group">
          {/* Top border glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-400/40 to-transparent" />

          {/* Corner accent */}
          <div className="absolute top-0 right-0 h-28 w-28 bg-linear-to-bl from-amber-300/8 to-transparent rounded-bl-[80px]" />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/35 bg-blue-400/10">
                <svg className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-300">Misi</p>
            </div>

            <ul className="space-y-4">
              {content.missions.map((mission, i) => (
                <li key={i} className="group/item flex items-start gap-4">
                  <div className="shrink-0 mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg border border-amber-300/30 bg-amber-300/10 text-xs font-bold text-amber-300 transition-all duration-300 group-hover/item:border-amber-300/60 group-hover/item:bg-amber-300/20">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-sm leading-relaxed text-blue-100/80 pt-1">{mission}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}