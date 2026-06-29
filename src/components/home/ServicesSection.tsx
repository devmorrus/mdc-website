import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { ServiceItem } from '../../types/home'

interface ServicesSectionProps {
  items: ServiceItem[]
}

type CardTone = {
  wrapper: string
  badge: string
  divider: string
  icon: 'amber' | 'cyan' | 'purple'
  cta: string
  article: string
  eyebrow: string | null
}

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')
}

function ServicesActionLink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: ReactNode
}) {
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

function getDisplayPriority(item: ServiceItem, index: number) {
  if (item.isFeatured) {
    return 1
  }

  if (item.tag === 'Custom Development') {
    return 0
  }

  if (item.tag === 'Business Tools') {
    return 2
  }

  return index + 3
}

function getCardTone(item: ServiceItem): CardTone {
  if (item.isFeatured) {
    return {
      wrapper: 'bg-gradient-to-b from-amber-400 to-orange-500 shadow-[0_0_30px_-10px_rgba(245,158,11,0.4)] hover:shadow-[0_0_50px_-10px_rgba(245,158,11,0.6)]',
      badge: 'border-amber-200 bg-amber-50 text-amber-600',
      divider: 'from-amber-200 to-transparent',
      icon: 'amber',
      cta: 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-[0_4px_15px_rgba(245,158,11,0.4)] hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(245,158,11,0.5)]',
      article: 'bg-white shadow-2xl shadow-amber-900/20',
      eyebrow: 'Paling Diminati',
    }
  }

  if (item.tag === 'Custom Development') {
    return {
      wrapper: 'bg-gradient-to-b from-white/20 to-white/5 hover:from-cyan-400 hover:to-cyan-400/20 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)]',
      badge: 'border-cyan-100 bg-cyan-50 text-cyan-600',
      divider: 'from-cyan-200 to-transparent',
      icon: 'cyan',
      cta: 'bg-slate-900 text-white hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]',
      article: 'bg-white shadow-xl shadow-black/10',
      eyebrow: null,
    }
  }

  return {
    wrapper: 'bg-gradient-to-b from-white/20 to-white/5 hover:from-purple-400 hover:to-purple-400/20 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]',
    badge: 'border-purple-100 bg-purple-50 text-purple-600',
    divider: 'from-purple-200 to-transparent',
    icon: 'purple',
    cta: 'bg-slate-900 text-white hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]',
    article: 'bg-white shadow-xl shadow-black/10',
    eyebrow: null,
  }
}

function getCardBadgeLabel(item: ServiceItem) {
  if (item.id === 'company-profile') {
    return 'Website Profil'
  }

  return item.tag
}

function CheckIcon({ tone }: { tone: 'amber' | 'cyan' | 'purple' }) {
  if (tone === 'amber') {
    return (
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )
  }

  const colorClass = tone === 'cyan' ? 'text-cyan-500' : 'text-purple-500'

  return (
    <svg className={`mt-0.5 h-5 w-5 shrink-0 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ServiceCard({
  item,
  index,
  registerRef,
}: {
  item: ServiceItem
  index: number
  registerRef: (index: number, element: HTMLDivElement | null) => void
}) {
  const tone = getCardTone(item)

  return (
    <div
      className={`group relative rounded-3xl p-px transition-all duration-500 hover:-translate-y-2 ${tone.wrapper}`}
      ref={(element) => {
        registerRef(index, element)
      }}
    >
      {tone.eyebrow ? (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-slate-900 shadow-[0_4px_15px_rgba(245,158,11,0.5)]">
          {tone.eyebrow}
        </div>
      ) : null}

      <article className={`relative flex h-full flex-col rounded-[calc(1.5rem-1px)] p-8 ${tone.article}`}>
        <div className="mb-6 pt-2">
          <span className={`inline-block rounded-lg border px-3 py-1 text-xs font-semibold ${tone.badge}`}>
            {getCardBadgeLabel(item)}
          </span>
          <h3 className="mt-4 text-3xl font-bold text-slate-900">{item.tier}</h3>
          <p className="mt-2 text-sm font-medium text-slate-500">{item.title}</p>
        </div>

        <div className={`mb-8 h-px w-full bg-gradient-to-r ${tone.divider}`} />

        <ul className="mb-8 flex flex-1 flex-col gap-4">
          {item.features.map((feature) => (
            <li key={feature.label} className="flex items-start gap-3">
              <CheckIcon tone={tone.icon} />
              <span className={`text-sm ${item.isFeatured ? 'font-medium text-slate-700' : 'text-slate-600'}`}>{feature.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <ServicesActionLink
            href={item.href}
            className={`group/btn relative flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all ${tone.cta}`}
          >
            {item.ctaLabel}
            <svg
              className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={item.isFeatured ? 2.5 : 2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </ServicesActionLink>
          <p className="mt-4 text-center text-xs text-slate-500">{item.description}</p>
        </div>
      </article>
    </div>
  )
}

export function ServicesSection({ items }: ServicesSectionProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardRefs.current,
    from: { y: 36, opacity: 0 },
    to: { stagger: 0.12, duration: 0.8 },
  })

  const cards = [...items]
    .map((item, index) => ({ item, index }))
    .sort((a, b) => getDisplayPriority(a.item, a.index) - getDisplayPriority(b.item, b.index))
    .map(({ item }, index) => ({ item, index }))

  const registerCardRef = (index: number, element: HTMLDivElement | null) => {
    cardRefs.current[index] = element
  }

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden py-24 md:py-32 bg-[linear-gradient(180deg,#0b1f57_0%,#15377b_38%,#0e2a62_76%,#08183f_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] left-[10%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-amber-600/10 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[40%] h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">Layanan Kami</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Solusi digital yang dirancang untuk <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">pertumbuhan bisnis</span> Anda.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-400">
            Pilih jalur pengerjaan yang paling sesuai. Mulai dari kehadiran online dasar hingga sistem operasional khusus yang kompleks.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 items-stretch">
          {cards.map(({ item, index }) => (
            <ServiceCard key={item.id} item={item} index={index} registerRef={registerCardRef} />
          ))}
        </div>
      </div>
    </section>
  )
}
