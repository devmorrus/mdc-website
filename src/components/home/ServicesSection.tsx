import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LazyCanvas } from '../common/LazyCanvas'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { ServiceItem } from '../../types/home'
import { SectionHeading } from './SectionHeading'
import { ServicesShowcaseCanvas } from './ServicesShowcaseCanvas'

interface ServicesSectionProps {
  items: ServiceItem[]
}

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')
}

function ServicesActionLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  )
}

function getCardShellClass(item: ServiceItem, index: number) {
  if (item.isFeatured) {
    return 'lg:order-2 lg:-translate-y-8'
  }

  if (index === 1) {
    return 'lg:order-1 lg:translate-y-10 lg:-rotate-[1.2deg]'
  }

  return 'lg:order-3 lg:translate-y-12 lg:rotate-[1.2deg]'
}

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[2.35rem] border backdrop-blur-md transition duration-500 hover:-translate-y-3 hover:shadow-[0_40px_100px_-42px_rgba(8,18,44,0.9)] ${
        item.isFeatured
          ? 'border-[#f6c445]/42 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,248,255,0.98))] shadow-[0_38px_100px_-48px_rgba(8,18,44,0.9)]'
          : 'border-white/18 bg-[linear-gradient(180deg,rgba(248,251,255,0.96),rgba(240,246,255,0.94))] shadow-[0_34px_90px_-50px_rgba(8,18,44,0.78)]'
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_70%)] opacity-0 transition duration-500 group-hover:opacity-100" />
      <div
        className={`pointer-events-none absolute inset-x-10 -top-10 h-24 rounded-full blur-3xl ${
          item.isFeatured ? 'bg-[#f6c445]/22' : 'bg-[#7aa8ff]/18'
        }`}
      />
      <div className="pointer-events-none absolute inset-x-6 bottom-6 h-16 rounded-full bg-[radial-gradient(circle,rgba(15,30,66,0.08),transparent_72%)] blur-2xl" />

      <div
        className={`relative z-10 flex min-h-[225px] flex-col items-center justify-center px-7 py-9 text-center text-white ${
          item.isFeatured
            ? 'bg-[linear-gradient(145deg,#6b7bd4_0%,#4d62ba_48%,#344c96_100%)]'
            : 'bg-[linear-gradient(145deg,#45639e_0%,#31497f_55%,#20386f_100%)]'
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        <div
          className={`pointer-events-none absolute inset-x-8 bottom-0 h-1.5 bg-gradient-to-r from-transparent ${
            item.isFeatured ? 'via-[#f6c445]' : 'via-white/28'
          } to-transparent opacity-90`}
        />
        <span
          className={`rounded-full px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] ${
            item.isFeatured ? 'bg-white/18 text-white' : 'bg-white/10 text-white/90'
          }`}
        >
          {item.tag}
        </span>
        <p className="mt-6 text-[2.2rem] font-bold leading-none text-white">{item.tier}</p>
        <h3 className={`mt-4 max-w-[14rem] text-[1.65rem] font-bold leading-tight ${item.isFeatured ? 'text-white' : 'text-[#eef3ff]'}`}>
          {item.title}
        </h3>
        <div className="mt-6 h-px w-16 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-6 pb-7 pt-7 text-left text-[#243147]">
        <ul className="flex flex-1 flex-col gap-2.5">
          {item.features.map((feature) => (
            <li
              key={feature.label}
              className={`flex items-start gap-3 rounded-[1.15rem] border px-3 py-3.5 text-sm leading-6 transition duration-300 ${
                feature.included
                  ? 'border-[#e3eefc] bg-white/82 text-slate-600'
                  : 'border-[#edf2fb] bg-white/62 text-slate-400'
              }`}
              >
                <span
                  className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    feature.included ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'
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
                <span className="flex-1">{feature.label}</span>
              </li>
          ))}
        </ul>

        <ServicesActionLink
          href={item.href}
          className={`mt-9 inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_32px_-18px_rgba(247,164,12,0.78)] transition-all duration-300 hover:-translate-y-0.5 ${
            item.isFeatured ? 'bg-[#f7a40c] hover:bg-[#ffb220]' : 'bg-[#f3a01a] hover:bg-[#ffae2f]'
          }`}
        >
          {item.ctaLabel}
        </ServicesActionLink>

        <p className="mt-5 px-1 text-sm leading-7 text-slate-500">{item.description}</p>
      </div>
    </article>
  )
}

export function ServicesSection({ items }: ServicesSectionProps) {
  const cardsRef = useRef<HTMLDivElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    from: { y: 36, opacity: 0 },
    to: { stagger: 0.1, duration: 0.8 },
  })

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b1f57_0%,#15377b_38%,#0e2a62_76%,#08183f_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(246,196,69,0.18),transparent_16%),radial-gradient(circle_at_82%_18%,rgba(56,189,248,0.16),transparent_18%),radial-gradient(circle_at_50%_55%,rgba(83,138,255,0.1),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(9,23,57,0.68),transparent_28%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#eef4ff] to-transparent" />

      <LazyCanvas
        className="absolute inset-0"
        rootMargin="260px"
        placeholder={<div className="h-full w-full bg-transparent" />}
      >
        {(mountRef) => <ServicesShowcaseCanvas mountRef={mountRef} />}
      </LazyCanvas>

      <div className="mx-auto relative z-10 w-full max-w-[1480px] px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-7 flex flex-wrap items-center justify-center gap-3">
            {items.map((item) => (
              <span
                key={item.id}
                className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-blue-50/88 backdrop-blur-sm"
              >
                {item.tag}
              </span>
            ))}
          </div>
          <SectionHeading
            eyebrow="Layanan Utama"
            title="Layanan digital yang disusun untuk memperkuat profil, operasional, dan pertumbuhan bisnis."
            description="Solusi menyeluruh dari perancangan identitas digital hingga sistem kustom untuk mendukung alur kerja unik perusahaan Anda."
            centered
            tone="dark"
          />
        </div>

        <div className="relative mx-auto mt-16 max-w-[1240px] lg:mt-20">
          <div className="pointer-events-none absolute inset-x-6 top-10 bottom-8 hidden rounded-[3rem] border border-white/10 bg-white/[0.045] shadow-[0_40px_120px_-70px_rgba(7,16,45,0.95)] backdrop-blur-[6px] lg:block" />
          <div className="pointer-events-none absolute left-1/2 top-[9rem] hidden h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[#f6c445]/12 blur-3xl lg:block" />
          <div className="pointer-events-none absolute left-1/2 top-[13rem] hidden h-[22rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#3dbff8]/10 blur-3xl lg:block" />

          <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`relative transition duration-500 ${getCardShellClass(item, index)}`}
                ref={(element) => {
                  if (element) {
                    cardsRef.current[index] = element
                  }
                }}
              >
                <ServiceCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
