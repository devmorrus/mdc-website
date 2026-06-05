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
    to: { stagger: 0.08 },
  })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_28%,#f7fbff_100%)] py-18 md:py-22">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(246,196,69,0.12),transparent_18%),radial-gradient(circle_at_88%_82%,rgba(24,74,168,0.08),transparent_20%)]" />
      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="REKAM JEJAK KAMI"
          title="Bukti nyata di balik setiap solusi digital yang kami bangun."
          description="Lebih dari sekadar tampilan modern, angka-angka ini mewakili dedikasi kami dalam memberikan hasil yang konsisten, cepat, dan dapat diandalkan oleh partner bisnis kami."
          centered
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <article
              key={item.label}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element
                }
              }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-blue-100 bg-gradient-to-br from-white to-[#f4f8ff] p-6 text-center shadow-[0_18px_50px_-32px_rgba(11,31,87,0.22)] transition-all duration-300 hover:-translate-y-2 hover:border-[#184aa8]/30 hover:bg-white hover:opacity-[0.98] hover:shadow-[0_30px_70px_-26px_rgba(11,31,87,0.34)] max-md:active:-translate-y-2 max-md:active:border-[#184aa8]/30 max-md:active:bg-white max-md:active:opacity-[0.98] max-md:active:shadow-[0_30px_70px_-26px_rgba(11,31,87,0.34)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(24,74,168,0.08),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.22),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:group-active:opacity-100" />
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#184aa8]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:group-active:opacity-100" />
              <div className="flex flex-col items-center justify-center">
                <span className="flex items-center justify-center text-[#184aa8] transition-all duration-300 group-hover:scale-110 group-hover:text-[#0f2f78] max-md:group-active:scale-110 max-md:group-active:text-[#0f2f78]">
                  <PlaceholderStatIcon index={index} />
                </span>
                <div className="relative z-10 mt-5">
                  <CountUpValue value={item.value} />
                  <p className="mt-3 text-[0.95rem] font-semibold uppercase tracking-[0.18em] text-blue-500 md:text-[1rem]">
                    {item.label}
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
