import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { CompanyValueItem } from '../../types/about'

interface ValuesSectionProps {
  values: CompanyValueItem[]
}

const VALUE_ICONS = [
  <svg key="integrity" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
  <svg key="innovation" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  </svg>,
  <svg key="collaboration" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>,
  <svg key="impact" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>,
]

const VALUE_BADGES = [
  { iconBg: 'bg-amber-50', iconText: 'text-amber-500', border: 'border-amber-200/60', num: 'text-slate-50 group-hover:text-amber-50' },
  { iconBg: 'bg-amber-50', iconText: 'text-amber-500', border: 'border-amber-200/60', num: 'text-slate-50 group-hover:text-amber-50' },
  { iconBg: 'bg-emerald-50', iconText: 'text-emerald-500', border: 'border-emerald-200/60', num: 'text-slate-50 group-hover:text-emerald-50' },
  { iconBg: 'bg-purple-50', iconText: 'text-purple-500', border: 'border-purple-200/60', num: 'text-slate-50 group-hover:text-purple-50' },
]

export function ValuesSection({ values }: ValuesSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])

  const sectionRef = useGsapReveal<HTMLElement>({
    from: { y: 28, opacity: 0 },
    to: { duration: 0.75, stagger: 0.08 },
    targets: () => [headerRef.current, ...cardsRef.current],
    threshold: 0.1,
  })

  return (
    <section ref={sectionRef} id="company-values" className="relative overflow-hidden bg-slate-50 py-20 lg:py-32">
      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div ref={headerRef} className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-[2px] w-12 bg-[#f6c445]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#c49019]">Core Values</span>
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl">
              Prinsip Kerja yang Menjadi Fondasi Tim
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500">
              Empat nilai inti yang menjadi pedoman setiap keputusan, proses kerja, dan kolaborasi kami dengan klien.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, index) => {
            const accent = VALUE_BADGES[index % VALUE_BADGES.length]

            return (
              <article
                key={item.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className={`absolute -right-4 -bottom-4 select-none font-black text-9xl text-slate-50 transition-colors duration-300 ${accent.num} pointer-events-none font-heading`}>
                  {index + 1}
                </div>
                <div className="relative z-10">
                  <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl border ${accent.border} ${accent.iconBg} ${accent.iconText} transition-transform group-hover:scale-110`}>
                    {VALUE_ICONS[index % VALUE_ICONS.length]}
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-bold text-[#0f172a]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
