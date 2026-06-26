import { useRef, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { ServiceDetailItem } from '../../types/services'
import { SectionHeading } from '../home/SectionHeading'

interface ServicesListSectionProps {
  services: ServiceDetailItem[]
}

const SERVICE_META = [
  {
    accent: 'from-[#f6c445]/12 via-[#f6c445]/6 to-transparent',
    tag: 'Website',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12a8.959 8.959 0 01.284-2.253" />
      </svg>
    ),
    steps: ['Discovery', 'UI Design', 'Development', 'Launch'],
  },
  {
    accent: 'from-[#184aa8]/14 via-[#184aa8]/6 to-transparent',
    tag: 'Custom App',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    steps: ['Analisis', 'Arsitektur', 'Build', 'Deploy'],
  },
  {
    accent: 'from-violet-500/12 via-violet-500/6 to-transparent',
    tag: 'Dashboard',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    steps: ['KPI', 'Layout', 'Integrasi', 'Handover'],
  },
  {
    accent: 'from-emerald-500/12 via-emerald-500/6 to-transparent',
    tag: 'Support',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    steps: ['Audit', 'Monitoring', 'Update', 'Report'],
  },
]

export function ServicesListSection({ services }: ServicesListSectionProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    from: { y: 36, opacity: 0, scale: 0.97 },
    to: { stagger: 0.1, duration: 0.75 },
    threshold: 0.08,
  })

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2

    card.style.transform = `perspective(900px) rotateX(${((y - cy) / cy) * -4}deg) rotateY(${((x - cx) / cx) * 4}deg) translateY(-2px)`
  }

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-18 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fffdfa_0%,#f8fbff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(246,196,69,0.1),transparent_18%),radial-gradient(circle_at_86%_18%,rgba(24,74,168,0.08),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.9),transparent_28%)]" />

      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Layanan Utama"
          title="Layanan digital yang disusun untuk memperkuat profil, operasional, dan pertumbuhan bisnis."
          description="Solusi menyeluruh dari company profile sampai sistem kustom yang rapi, mudah di-maintain, dan siap berkembang."
          centered
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const meta = SERVICE_META[index % SERVICE_META.length]

            return (
              <article
                key={service.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
                className="group relative overflow-hidden rounded-[1.85rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] shadow-[0_22px_48px_-38px_rgba(11,31,87,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-[#184aa8]/18 hover:shadow-[0_28px_58px_-36px_rgba(11,31,87,0.28)]"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="pointer-events-none absolute inset-x-8 top-0 h-32 rounded-full bg-white/40 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute right-4 top-3 text-8xl font-black leading-none select-none text-[#184aa8]/10 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {service.icon}
                </div>

                <div className="relative z-10 p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex rounded-full border border-[#d7e3f7] bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#184aa8]">
                        {meta.tag}
                      </span>
                      <h3 className="mt-4 max-w-md text-2xl font-bold leading-tight text-[#0b1f57]" style={{ fontFamily: "'Sora', sans-serif" }}>
                        {service.title}
                      </h3>
                    </div>

                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#d7e3f7] bg-white/82 text-[#184aa8] shadow-[0_16px_32px_-28px_rgba(24,74,168,0.28)] transition-all duration-300 group-hover:scale-105">
                      {meta.icon}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-600 md:text-[0.98rem]">
                    {service.description}
                  </p>

                  <div className="mt-6 rounded-[1.5rem] border border-[#d7e3f7] bg-white/78 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c49019]">
                      Benefits
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
                          <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8f1ff] text-[#184aa8]">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.6}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c49019]">
                      Proses Kerja
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {meta.steps.map((step) => (
                        <span
                          key={step}
                          className="rounded-full border border-[#d7e3f7] bg-white/82 px-3 py-1.5 text-xs font-medium text-slate-600"
                        >
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link
                      to={service.ctaHref}
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-[#f6c445] px-5 py-3.5 text-sm font-semibold text-[#0b1f57] shadow-[0_18px_32px_-20px_rgba(246,196,69,0.78)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffd15c]"
                    >
                      {service.ctaLabel}
                    </Link>
                    <div className="inline-flex items-center justify-center rounded-full border border-[#d7e3f7] bg-white/82 px-5 py-3.5 text-sm font-medium text-slate-600">
                      {service.icon}
                      <span className="ml-2">Layanan {index + 1}</span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
