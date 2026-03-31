import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { CompanyProfileContent } from '../../types/about'

interface CompanyProfileSectionProps {
  content: CompanyProfileContent
}

const HIGHLIGHT_WORDS = ['website', 'aplikasi', 'aset bisnis', 'kepercayaan', 'pertumbuhan', 'solusi', 'digital', 'profesional']

function highlightText(text: string): React.ReactNode {
  // Simple highlight: wrap key phrases
  const parts = text.split(/(\bwebsite\b|\baset bisnis\b|\bkepercayaan\b|\bpertumbuhan\b)/gi)
  return parts.map((part, i) => {
    const isHighlight = HIGHLIGHT_WORDS.some(w => w.toLowerCase() === part.toLowerCase())
    return isHighlight ? (
      <span key={i} className="text-amber-300 font-semibold">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  })
}

export function CompanyProfileSection({ content }: CompanyProfileSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const sideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
          tl.fromTo(labelRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 })
            .fromTo(titleRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, '-=0.3')
            .fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
            .fromTo(sideRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, '-=0.6')
          observer.disconnect()
        })
      },
      { threshold: 0.12 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="company-profile" className="relative mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-blue-500/6 blur-3xl" />

      <div className="relative grid gap-10 md:grid-cols-[1fr_320px] md:gap-16 items-start">
        {/* Left: Main content */}
        <div>
          {/* Section label */}
          <div ref={labelRef} className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-amber-300/60" />
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-300">Profil Perusahaan</p>
          </div>

          <h2
            ref={titleRef}
            className="mb-8 text-3xl font-extrabold leading-tight text-blue-50 md:text-4xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {content.title}
          </h2>

          <div ref={contentRef} className="space-y-5">
            {content.paragraphs.map((paragraph, i) => (
              <div key={i} className="relative pl-5">
                {/* Left accent bar */}
                <div className={`absolute left-0 top-1 h-full w-0.5 rounded-full ${i === 0 ? 'bg-linear-to-b from-amber-300/70 to-amber-300/10' : 'bg-linear-to-b from-blue-400/40 to-transparent'}`} />
                <p className="text-sm leading-relaxed text-blue-200/75 md:text-base">
                  {i === 0 ? highlightText(paragraph) : paragraph}
                </p>
              </div>
            ))}

            {/* Pull quote */}
            <blockquote className="mt-6 rounded-2xl border border-amber-300/20 bg-linear-to-br from-amber-300/8 via-blue-900/30 to-blue-950/50 px-6 py-5">
              <div className="mb-3 text-3xl leading-none text-amber-300/40" style={{ fontFamily: 'Georgia, serif' }}>"</div>
              <p className="text-sm italic leading-relaxed text-blue-100/80 md:text-base">
                Kami percaya bahwa website bukan hanya tampilan, tetapi{' '}
                <span className="not-italic font-semibold text-amber-200">aset bisnis</span> yang membangun kepercayaan dan mendorong pertumbuhan.
              </p>
            </blockquote>
          </div>
        </div>

        {/* Right: Stats sidebar */}
        <div ref={sideRef} className="flex flex-col gap-4 md:sticky md:top-24">
          {/* Company identity card */}
          <div className="rounded-2xl border border-blue-200/15 bg-linear-to-br from-blue-900/35 to-blue-950/60 p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 h-20 w-20 bg-linear-to-bl from-amber-300/12 to-transparent rounded-bl-[60px]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300/80 mb-4">Identitas</p>
            <div className="space-y-3">
              {[
                { label: 'Nama', value: 'Morrus Digital Connecting' },
                { label: 'Bidang', value: 'Digital Agency / Web Dev' },
                { label: 'Domisili', value: 'Gresik, Jawa Timur' },
                { label: 'Fokus', value: 'Website & Aplikasi' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-blue-400/50">{item.label}</span>
                  <span className="text-sm font-medium text-blue-100/90">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: '120+', label: 'Projects' },
              { value: '94%', label: 'Retensi' },
              { value: '3+', label: 'Tahun' },
              { value: '95+', label: 'Skor' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-blue-200/12 bg-blue-900/25 p-4 text-center transition-all duration-300 hover:border-amber-300/25"
              >
                <p className="text-xl font-extrabold text-amber-300" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {stat.value}
                </p>
                <p className="text-[10px] text-blue-400/60 uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}