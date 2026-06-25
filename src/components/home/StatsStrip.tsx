import { useEffect, useRef, useState } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { StatItem } from '../../types/home'
import { SectionHeading } from './SectionHeading'

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

function PlaceholderStatIcon({ index }: { index: number }) {
  const variants = [
    <svg key="projects" viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="5" width="16" height="14" rx="3" />
      <path d="M8 3v4M16 3v4M7 11h10M7 15h6" strokeLinecap="round" />
    </svg>,
    <svg key="partners" viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="9" cy="9" r="3" />
      <circle cx="16.5" cy="10.5" r="2.5" />
      <path d="M4.5 18c.8-2.4 2.8-4 5.5-4s4.7 1.6 5.5 4M14 17.5c.5-1.5 1.8-2.5 3.6-2.5 1.3 0 2.4.5 3 1.5" strokeLinecap="round" />
    </svg>,
    <svg key="retention" viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 12.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9" />
    </svg>,
    <svg key="kickoff" viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  ]

  return variants[index % variants.length]
}

function CountUpValue({ value }: { value: string }) {
  const [{ end, prefix, suffix }] = useState(() => parseStatValue(value))
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const countRef = useRef<HTMLParagraphElement>(null)

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
    const duration = 1400

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
    <p
      ref={countRef}
      className="text-[35px] font-bold leading-none text-[#0b1f57]"
      style={{ fontFamily: "'Sora', sans-serif" }}
      aria-label={value}
    >
      {prefix}
      {count}
      {suffix}
    </p>
  )
}

export function StatsStrip({ stats }: StatsStripProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    from: { y: 32, opacity: 0 },
    to: { stagger: 0.08, duration: 0.7 },
  })

  return (
    <section ref={sectionRef} className="stats-section relative overflow-hidden py-18 md:py-22">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f3f8ff_0%,#edf4ff_44%,#f7faff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(24,74,168,0.12),transparent_20%),radial-gradient(circle_at_18%_84%,rgba(110,168,255,0.12),transparent_24%),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.9),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#184aa8]/22 to-transparent" />

      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="REKAM JEJAK KAMI"
          title="Hasil yang bisa Anda lihat."
          description="Bukan sekadar desain menarik. Kami fokus pada hasil yang rapi, cepat, dan berdampak untuk bisnis."
          centered
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <article
              key={item.label}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element
                }
              }}
              className="group relative overflow-hidden rounded-[1.85rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(242,247,255,0.98))] px-6 py-8 text-center shadow-[0_22px_48px_-40px_rgba(11,31,87,0.26)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#184aa8]/20 hover:shadow-[0_28px_56px_-36px_rgba(11,31,87,0.3)] md:px-7"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(24,74,168,0.08),transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.22),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex flex-col items-center justify-center">
                <span className="flex h-18 w-18 items-center justify-center rounded-[1.35rem] border border-[#d8e4f8] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] text-[#184aa8] shadow-[0_18px_28px_-24px_rgba(24,74,168,0.45)] transition-all duration-300 group-hover:scale-[1.03] group-hover:text-[#0f2f78]">
                  <PlaceholderStatIcon index={index} />
                </span>
                <div className="relative z-10 mt-5">
                  <CountUpValue value={item.value} />
                  <p className="mt-3 text-[0.95rem] font-semibold uppercase tracking-[0.18em] text-blue-500 md:text-[1rem]">
                    {item.label}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
