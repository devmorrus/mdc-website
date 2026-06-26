import { useRef, type MouseEvent } from 'react'
import gsap from 'gsap'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { CompanyValueItem } from '../../types/about'

interface ValuesSectionProps {
  values: CompanyValueItem[]
}

const VALUE_ACCENTS = [
  { border: 'hover:border-amber-300/40', icon: 'border-amber-300/35 bg-amber-300/10 text-amber-300', num: 'text-amber-300/18', glow: 'from-amber-300/8' },
  { border: 'hover:border-sky-400/40', icon: 'border-sky-400/35 bg-sky-400/10 text-sky-300', num: 'text-sky-400/18', glow: 'from-sky-400/8' },
  { border: 'hover:border-violet-400/40', icon: 'border-violet-400/35 bg-violet-400/10 text-violet-300', num: 'text-violet-400/18', glow: 'from-violet-400/8' },
  { border: 'hover:border-emerald-400/40', icon: 'border-emerald-400/35 bg-emerald-400/10 text-emerald-300', num: 'text-emerald-400/18', glow: 'from-emerald-400/8' },
]

function ValueIcon({ index }: { index: number }) {
  const variants = [
    <svg key="integrity" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>,
    <svg key="innovation" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>,
    <svg key="collaboration" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>,
    <svg key="impact" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>,
  ]

  return variants[index % variants.length]
}

export function ValuesSection({ values }: ValuesSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])

  const sectionRef = useGsapReveal<HTMLElement>({
    from: { y: 28, opacity: 0 },
    to: { duration: 0.7 },
    targets: () => [headerRef.current, ...cardsRef.current],
    threshold: 0.1,
  })

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2

    gsap.to(card, {
      rotateX: ((y - cy) / cy) * -5,
      rotateY: ((x - cx) / cx) * 5,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 900,
    })
  }

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.55, ease: 'power3.out' })
  }

  return (
    <section
      ref={sectionRef}
      id="company-values"
      className="relative overflow-hidden py-18 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fffdfa_0%,#f8fbff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(24,74,168,0.08),transparent_20%),radial-gradient(circle_at_18%_84%,rgba(246,196,69,0.08),transparent_24%)]" />

      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <div ref={headerRef} className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#f6c445]/60" />
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c49019]">
                Nilai Perusahaan
              </p>
            </div>
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-[#0b1f57] md:text-4xl" style={{ fontFamily: "'Sora', sans-serif" }}>
              Prinsip Kerja yang Menjadi{' '}
              <span className="bg-gradient-to-r from-[#f6c445] to-[#fde68a] bg-clip-text text-transparent">
                Fondasi Tim
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-slate-600">
            Empat nilai inti yang memandu setiap keputusan dan deliverable kami.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {values.map((item, i) => {
            const accent = VALUE_ACCENTS[i % VALUE_ACCENTS.length]

            return (
              <article
                key={item.id}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el
                }}
                className={`group relative overflow-hidden rounded-[1.8rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] p-7 shadow-[0_18px_46px_-36px_rgba(11,31,87,0.22)] transition-all duration-300 ${accent.border} hover:-translate-y-1 hover:shadow-[0_26px_58px_-34px_rgba(11,31,87,0.26)]`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent.glow} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div
                  className={`pointer-events-none absolute right-4 top-2 text-8xl font-black leading-none select-none ${accent.num} transition-all duration-500 group-hover:scale-110 group-hover:opacity-40`}
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${accent.icon} transition-all duration-300 group-hover:scale-105`}>
                  <ValueIcon index={i} />
                </div>

                <h3 className="mb-3 text-xl font-bold text-[#0b1f57]" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-slate-600 md:text-[0.98rem]">
                  {item.description}
                </p>

                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#f6c445]/70 to-transparent transition-all duration-500 group-hover:w-1/2" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
