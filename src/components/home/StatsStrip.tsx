import { useEffect, useRef, useState } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { StatItem } from '../../types/home'

interface StatsStripProps {
  stats: StatItem[]
}

function parseStatValue(value: string) {
  const matchedNumber = value.match(/\d+/)
  const end = matchedNumber ? Number.parseInt(matchedNumber[0], 10) : 0
  const numberText = matchedNumber?.[0] ?? ''
  const numberIndex = numberText ? value.indexOf(numberText) : -1

  if (numberIndex === -1) {
    return { end: 0, prefix: '', suffix: value }
  }

  return {
    end,
    prefix: value.slice(0, numberIndex),
    suffix: value.slice(numberIndex + numberText.length),
  }
}

const STAT_ICONS = [
  // Proyek Selesai – briefcase / layers
  <svg key="projects" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="7" width="18" height="13" rx="2.5" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" />
    <path d="M12 12v.01M8 12h.01M16 12h.01" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Klien Aktif – users
  <svg key="clients" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="9" cy="8" r="3" />
    <circle cx="16.5" cy="9.5" r="2.5" />
    <path d="M3.5 19c.9-2.6 3-4.5 5.5-4.5S13.6 16.4 14.5 19" strokeLinecap="round" />
    <path d="M15 16.5c.6-1.8 2-3 3.8-3 1.4 0 2.6.6 3.2 1.7" strokeLinecap="round" />
  </svg>,
  // Klien Kembali – refresh / repeat
  <svg key="retention" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74" strokeLinecap="round" />
    <polyline points="3 3 3 9 9 9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 8v4l2.5 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Kickoff – rocket / lightning
  <svg key="kickoff" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
]

function CountUpValue({ value }: { value: string }) {
  const [{ end, prefix, suffix }] = useState(() => parseStatValue(value))
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!countRef.current || started) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          setStarted(true)
          observer.disconnect()
        })
      },
      { threshold: 0.45 },
    )

    observer.observe(countRef.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    let frameId = 0
    let startTime = 0
    const duration = 1600

    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(Math.round(end * eased))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate)
      }
    }

    frameId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frameId)
  }, [end, started])

  return (
    <span ref={countRef} aria-label={value}>
      {prefix}{count}{suffix}
    </span>
  )
}

export function StatsStrip({ stats }: StatsStripProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    from: { y: 28, opacity: 0 },
    to: { stagger: 0.1, duration: 0.75 },
  })

  return (
    <section ref={sectionRef} id="rekam-jejak" className="relative overflow-hidden py-20 md:py-28">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#0b1c4a_0%,#0d2460_42%,#071540_100%)]" />

      {/* Radial glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(99,143,255,0.18),transparent_40%),radial-gradient(ellipse_at_80%_30%,rgba(246,196,69,0.12),transparent_38%),radial-gradient(ellipse_at_55%_80%,rgba(56,189,248,0.10),transparent_36%)]" />

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      {/* Top border glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#638fff]/40 to-transparent" />
      {/* Bottom border glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#f6c445]">PENCAPAIAN KAMI</p>
          <h2
            className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Pengalaman kami dalam pengembangan website dan solusi digital.
          </h2>
          <p className="mt-4 text-base leading-7 text-blue-200/70">
            Kami telah membantu berbagai bisnis dalam pengembangan website company profile, landing page, dashboard, dan sistem digital untuk mendukung kredibilitas serta operasional perusahaan.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mt-14 grid gap-px sm:grid-cols-2 xl:grid-cols-4 rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.6)]">
          {stats.map((item, index) => (
            <article
              key={item.label}
              ref={(el) => { if (el) cardsRef.current[index] = el }}
              className="group relative flex flex-col items-center justify-center px-8 py-10 text-center bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.09]"
            >
              {/* Divider lines between cells */}
              {index > 0 && (
                <div className="pointer-events-none absolute left-0 inset-y-6 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent hidden xl:block" />
              )}
              {index > 0 && index < 2 && (
                <div className="pointer-events-none absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent xl:hidden" />
              )}

              {/* Icon circle */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-[#93b8ff] transition-all duration-300 group-hover:scale-105 group-hover:border-[#638fff]/40 group-hover:text-white group-hover:bg-[#638fff]/20">
                {STAT_ICONS[index % STAT_ICONS.length]}
              </div>

              {/* Number */}
              <p
                className="mt-5 text-[2.6rem] font-bold leading-none text-white"
                style={{ fontFamily: "'Sora', sans-serif" }}
                aria-label={item.value}
              >
                <CountUpValue value={item.value} />
              </p>

              {/* Accent line under number */}
              <div className="mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-[#638fff] to-[#f6c445] opacity-70" />

              {/* Label */}
              <p className="mt-3 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-[#93b8ff]">
                {item.label}
              </p>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-blue-200/55 max-w-[200px]">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* Bottom trust line */}
      </div>
    </section>
  )
}
