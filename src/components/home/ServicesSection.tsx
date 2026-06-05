import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { ServiceItem } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface ServicesSectionProps {
  items: ServiceItem[]
}

export function ServicesSection({ items }: ServicesSectionProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    to: { stagger: 0.08 },
  })
  const gridLayoutClass =
    items.length >= 4
      ? 'lg:grid-cols-4'
      : items.length === 3
        ? 'lg:grid-cols-3 max-w-[1120px]'
        : items.length === 2
          ? 'md:grid-cols-2 max-w-[760px]'
          : 'max-w-[380px]'

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

        <div className={`mx-auto mt-12 grid gap-5 ${gridLayoutClass}`}>
          {items.map((item, index) => (
            <article
              key={item.id}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element
                }
              }}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/30 bg-white shadow-[0_24px_80px_-42px_rgba(7,15,35,0.7)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_90px_-38px_rgba(7,15,35,0.85)] max-md:active:-translate-y-2 max-md:active:shadow-[0_28px_90px_-38px_rgba(7,15,35,0.85)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 max-md:group-active:opacity-100">
                <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_68%)]" />
              </div>

              <div
                className={`relative z-10 flex min-h-[168px] flex-col items-center justify-center px-6 py-7 text-center ${
                  item.isFeatured ? 'bg-[#626dcc] text-white' : 'bg-[#31497f] text-white'
                }`}
              >
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
                    item.isFeatured ? 'bg-white/18 text-white' : 'bg-white/12 text-white'
                  }`}
                >
                  {item.tag}
                </span>
                <p className="mt-5 text-[2rem] font-bold leading-none text-white">{item.tier}</p>
                <h3 className={`mt-3 text-lg font-medium leading-snug ${item.isFeatured ? 'text-[#eef1ff]' : 'text-[#d6def4]'}`}>
                  {item.title}
                </h3>
              </div>

              <div className="relative z-10 flex flex-1 flex-col px-6 pb-6 pt-7 text-center text-[#243147]">
                <div className="text-sm text-slate-400">
                  <span className="line-through decoration-[1.5px]">{item.originalPrice} harga normal</span>
                </div>

                <div className="mt-3 flex items-end justify-center gap-1 text-[#1f2d3d]">
                  <p className="text-[2.15rem] font-bold leading-none xl:text-[2.35rem]">{item.price}</p>
                  <p className="pb-1 text-sm text-slate-500">{item.priceSuffix.replace(/^per\s+/i, '/ ')}</p>
                </div>

                <ul className="mt-8 flex flex-1 flex-col">
                  {item.features.map((feature, featureIndex) => (
                    <li
                      key={feature.label}
                      className={`flex items-center justify-center gap-3 border-b border-slate-200 px-2 py-3 text-sm leading-6 ${
                        featureIndex === item.features.length - 1 ? 'border-b-0' : ''
                      } ${feature.included ? 'text-slate-600' : 'text-slate-400'}`}
                    >
                      <span
                        className={`inline-flex h-4 w-4 shrink-0 items-center justify-center ${
                          feature.included ? 'text-emerald-500' : 'text-rose-500'
                        }`}
                      >
                        {feature.included ? (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                          </svg>
                        )}
                      </span>
                      <span>{feature.label}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={item.href}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#f7a40c] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_28px_-18px_rgba(247,164,12,0.75)] transition hover:bg-[#ffb220] max-md:active:bg-[#ffb220]"
                >
                  {item.ctaLabel}
                </Link>

                <p className="mt-5 text-xs leading-6 text-slate-500 sm:text-sm">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
