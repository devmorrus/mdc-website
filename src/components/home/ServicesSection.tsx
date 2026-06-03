import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { ServiceItem } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface ServicesSectionProps {
  items: ServiceItem[]
}

const SERVICE_ICONS = [
  (
    <svg key="website" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M7.5 3.75h9m-8.25 15h7.5M5.25 6.75v10.5A1.5 1.5 0 006.75 18.75h10.5a1.5 1.5 0 001.5-1.5V6.75" />
    </svg>
  ),
  (
    <svg key="code" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25L3.75 12l3.75 3.75m9-7.5L20.25 12l-3.75 3.75m-3.75-9l-1.5 10.5" />
    </svg>
  ),
  (
    <svg key="chart" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 19.5h18M7.5 16.5v-6m4.5 6v-12m4.5 12V9" />
    </svg>
  ),
  (
    <svg key="support" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-2.846.813a.75.75 0 00-.27 1.27l.602.601a.75.75 0 001.27-.27L8.57 18.75l2.846-.813a.75.75 0 00.27-1.27l-.601-.602a.75.75 0 00-1.272.27zm6.374-10.155a2.25 2.25 0 113.182 3.182L9.88 18.42a4.5 4.5 0 01-1.897 1.13l-2.685.768.768-2.685a4.5 4.5 0 011.13-1.897l9.49-9.49z" />
    </svg>
  ),
]

export function ServicesSection({ items }: ServicesSectionProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    to: { stagger: 0.08 },
  })

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_18%,rgba(246,196,69,0.12),transparent_16%),radial-gradient(circle_at_82%_24%,rgba(66,122,255,0.18),transparent_22%),linear-gradient(180deg,#0b1f57_0%,#123789_52%,#0d2b73_100%)] py-18 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#eaf1ff] to-transparent" />
      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Layanan Utama"
          title="Layanan digital yang disusun untuk memperkuat profil, operasional, dan pertumbuhan bisnis."
          description="Bagian ini dirancang sebagai ringkasan layanan utama di homepage, sehingga pengunjung cepat memahami area expertise perusahaan tanpa harus membaca terlalu jauh."
          tone="dark"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={item.id}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element
                }
              }}
              className="group rounded-[2rem] border border-white/12 bg-white/8 p-6 shadow-[0_18px_50px_-34px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_22px_60px_-34px_rgba(0,0,0,0.45)] backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0b1f57]">
                  {SERVICE_ICONS[index % SERVICE_ICONS.length]}
                </div>
                <span className="rounded-full bg-[#f6c445] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0b1f57]">
                  {item.tag}
                </span>
              </div>

              <h3
                className="mt-6 text-2xl font-bold leading-tight text-white"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {item.title}
              </h3>

              <p className="mt-4 text-base leading-7 text-blue-100/80">
                {item.description}
              </p>

              <ul className="mt-6 space-y-3">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-blue-50/88">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#f6c445]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={item.href}
                className="mt-8 inline-flex items-center text-sm font-semibold text-[#f6c445] transition hover:text-[#ffe07d]"
              >
                Lihat detail layanan
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
