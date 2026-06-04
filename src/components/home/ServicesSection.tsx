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
      <div className="mx-auto relative z-10 w-full max-w-[1480px] px-6">
        <SectionHeading
          eyebrow="Layanan Utama"
          title="Layanan digital yang disusun untuk memperkuat profil, operasional, dan pertumbuhan bisnis."
          description="Solusi menyeluruh dari perancangan identitas digital hingga sistem kustom untuk mendukung alur kerja unik perusahaan Anda."
          centered
          tone="dark"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {items.map((item, index) => (
            <article
              key={item.id}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element
                }
              }}
              className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-6 shadow-[0_18px_50px_-34px_rgba(0,0,0,0.35)] backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_-32px_rgba(0,0,0,0.5)] ${
                item.isFeatured
                  ? 'border-[#7d88ff]/35 bg-[linear-gradient(180deg,rgba(79,87,176,0.98)_0%,rgba(49,52,93,0.98)_100%)] ring-1 ring-[#96a0ff]/20'
                  : 'border-white/10 bg-[linear-gradient(180deg,rgba(34,39,54,0.96)_0%,rgba(22,26,36,0.96)_100%)] hover:border-white/18'
              }`}
            >
              <div
                className={`pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 ${
                  item.isFeatured
                    ? 'bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_48%)]'
                    : 'bg-[radial-gradient(circle_at_top,rgba(123,124,255,0.18),transparent_42%)]'
                }`}
              />
              {item.isFeatured ? (
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#8d95ff] to-transparent" />
              ) : null}

              <div className="flex items-start justify-between gap-4">
                <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-105 ${item.isFeatured ? 'bg-white text-[#4f57b0]' : 'bg-white/8 text-white ring-1 ring-white/10 group-hover:bg-white/12'}`}>
                  {SERVICE_ICONS[index % SERVICE_ICONS.length]}
                </div>
                <span className={`relative z-10 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${item.isFeatured ? 'bg-[#7b7cff] text-white' : 'bg-white/8 text-white/72 ring-1 ring-white/10'}`}>
                  {item.tag}
                </span>
              </div>

              <p className={`relative z-10 mt-7 text-[2rem] font-bold leading-none ${item.isFeatured ? 'text-white' : 'text-white/96'}`}>
                {item.tier}
              </p>

              <h3
                className={`relative z-10 mt-3 text-xl font-semibold leading-tight xl:text-2xl ${item.isFeatured ? 'text-[#c7cdff]' : 'text-white'}`}
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {item.title}
              </h3>

              <div className={`relative z-10 mt-6 inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${item.isFeatured ? 'bg-white/10 text-white/72' : 'bg-white/6 text-white/50 ring-1 ring-white/10'}`}>
                <span className="line-through decoration-[1.5px]">{item.originalPrice}</span>
                <span className="ml-2">harga normal</span>
              </div>

              <div className="relative z-10 mt-4 flex items-end gap-2 whitespace-nowrap">
                <p
                  className="text-[2rem] font-bold leading-none text-white xl:text-[2.15rem]"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {item.price}
                </p>
                <p className={`pb-1 text-sm leading-none ${item.isFeatured ? 'text-white/70' : 'text-white/58'}`}>
                  {item.priceSuffix}
                </p>
              </div>

              <p className={`relative z-10 mt-5 text-sm leading-7 xl:text-base ${item.isFeatured ? 'text-white/82' : 'text-white/68'}`}>
                {item.description}
              </p>

              <Link
                to={item.href}
                className={`relative z-10 mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  item.isFeatured
                    ? 'bg-[#6c63ff] text-white hover:bg-[#7b73ff]'
                    : 'bg-white text-[#10131c] hover:bg-[#eef1f8]'
                }`}
              >
                {item.ctaLabel}
              </Link>

              <div className={`relative z-10 mt-7 border-t ${item.isFeatured ? 'border-white/14' : 'border-white/10'}`} />

              <ul className="relative z-10 mt-6 space-y-3">
                {item.features.map((feature) => (
                  <li
                    key={feature.label}
                    className={`flex items-start gap-3 text-sm leading-6 ${item.isFeatured ? 'text-white/90' : feature.included ? 'text-white/72' : 'text-white/42'}`}
                  >
                    <span
                      className={`mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        feature.included
                          ? item.isFeatured
                            ? 'bg-white/12 text-white'
                            : 'bg-emerald-400/12 text-emerald-200 ring-1 ring-emerald-300/20'
                          : 'bg-rose-400/12 text-rose-200 ring-1 ring-rose-300/20'
                      }`}
                    >
                      {feature.included ? (
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                        </svg>
                      )}
                    </span>
                    <span className={feature.included ? '' : 'line-through decoration-white/20 decoration-1'}>
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
