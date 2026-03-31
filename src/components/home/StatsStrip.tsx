import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { StatItem } from '../../types/home'

interface StatsStripProps {
  stats: StatItem[]
}

const ICONS = [
  // Checkmark circle
  <svg key="0" className="h-5 w-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Users
  <svg key="1" className="h-5 w-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>,
  // Chart bar
  <svg key="2" className="h-5 w-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>,
]

export function StatsStrip({ stats }: StatsStripProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return

    // Observe when section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              cardsRef.current,
              { y: 30, opacity: 0, scale: 0.95 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.12,
              },
            )
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative border-y border-blue-900/40 bg-blue-950/40 backdrop-blur-sm overflow-hidden">
      {/* Subtle top line glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-300/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-blue-400/20 to-transparent" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-3 px-6 py-6 sm:grid-cols-3">
        {stats.map((item, i) => (
          <div
            key={item.label}
            ref={(el) => {
              if (el) cardsRef.current[i] = el
            }}
          >
            <article className="group relative overflow-hidden rounded-2xl border border-blue-200/15 bg-linear-to-br from-blue-800/20 via-blue-900/30 to-blue-950/40 p-5 backdrop-blur-sm transition-all duration-500 hover:border-amber-300/30 hover:shadow-[0_0_30px_rgba(251,191,36,0.08)]">
              {/* Hover glow effect */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-300/0 to-amber-300/0 opacity-0 transition-opacity duration-500 group-hover:from-amber-300/5 group-hover:to-transparent group-hover:opacity-100" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-3xl font-extrabold tracking-tight text-blue-50" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-sm text-blue-300/70">{item.label}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10">
                  {ICONS[i % ICONS.length]}
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-amber-300 to-amber-400/50 transition-all duration-500 group-hover:w-full" />
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}