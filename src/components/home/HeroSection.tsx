import { useEffect, useRef, useState, type ReactNode, type SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { useHomeHeroAnimation } from '../../animations/useHomeHeroAnimation'
import type { HeroContent, ServiceItem } from '../../types/home'

interface HeroSectionProps {
  content: HeroContent
  services: ServiceItem[]
}

interface HeroActionLinkProps {
  href: string
  className: string
  children: ReactNode
}

const HERO_TYPEWRITER_WORDS = ['Terintegrasi.', 'Skalabel.', 'Profesional.', 'Lebih Inovatif.']

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')
}

function HeroActionLink({ href, className, children }: HeroActionLinkProps) {
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

function TerminalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="m8 9 3 3-3 3" />
      <path d="M13 15h3" />
    </svg>
  )
}

function MessageCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7.9 20A8.7 8.7 0 1 1 20 12.1" />
      <path d="M11.9 20H6l1.1-4.8" />
    </svg>
  )
}

function BuildingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V7.6A1.6 1.6 0 0 1 6.6 6H14v15" />
      <path d="M14 21V4.6A1.6 1.6 0 0 1 15.6 3H19v18" />
      <path d="M8 10h2" />
      <path d="M8 14h2" />
      <path d="M17 10h.01" />
      <path d="M17 14h.01" />
    </svg>
  )
}

function ShoppingCartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="8" cy="20" r="1.6" />
      <circle cx="18" cy="20" r="1.6" />
      <path d="M3 4h2l2.4 10.1a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.7L21 7H7.2" />
    </svg>
  )
}

function MonitorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
      <path d="M7 8h4" />
      <path d="M15 10h2" />
    </svg>
  )
}

function HeartHandshakeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21 4.6 13.7a4.7 4.7 0 0 1 6.6-6.7L12 7.8l.8-.8a4.7 4.7 0 0 1 6.6 6.6Z" />
      <path d="m8.5 12.5 2 2 5-5" />
    </svg>
  )
}

const heroCardThemes = [
  {
    iconBackground: 'bg-[#eaf3ff]',
    iconHoverBackground: 'group-hover:bg-[#2563eb]',
    iconText: 'text-[#2563eb]',
    titleHoverClass: 'group-hover:text-[#2563eb]',
    barClass: 'from-[#3b82f6] to-[#1d4ed8]',
    Icon: BuildingIcon,
  },
  {
    iconBackground: 'bg-[#eafcf6]',
    iconHoverBackground: 'group-hover:bg-[#10b981]',
    iconText: 'text-[#059669]',
    titleHoverClass: 'group-hover:text-[#059669]',
    barClass: 'from-[#34d399] to-[#0f766e]',
    Icon: ShoppingCartIcon,
  },
  {
    iconBackground: 'bg-[#fff4dc]',
    iconHoverBackground: 'group-hover:bg-[#f59e0b]',
    iconText: 'text-[#d97706]',
    titleHoverClass: 'group-hover:text-[#d97706]',
    barClass: 'from-[#fbbf24] to-[#f97316]',
    Icon: MonitorIcon,
  },
  {
    iconBackground: 'bg-[#ffe8ef]',
    iconHoverBackground: 'group-hover:bg-[#f43f5e]',
    iconText: 'text-[#e11d48]',
    titleHoverClass: 'group-hover:text-[#e11d48]',
    barClass: 'from-[#fb7185] to-[#ec4899]',
    Icon: HeartHandshakeIcon,
  },
] as const

function HeroServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  const theme = heroCardThemes[index % heroCardThemes.length]
  const Icon = theme.Icon

  return (
    <Link
      to="/#services"
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white p-6 text-center shadow-[0_12px_36px_-18px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_-18px_rgba(15,23,42,0.22)]"
    >
      <div className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition duration-500 group-hover:scale-x-100 ${theme.barClass}`} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(rgba(15,23,42,0.4) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

      <div className="absolute left-4 top-3 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors group-hover:bg-[#f87171]" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors group-hover:bg-[#fbbf24]" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors group-hover:bg-[#34d399]" />
      </div>

      <div className={`relative mt-4 inline-flex h-16 w-16 items-center justify-center self-center rounded-2xl transition-colors duration-300 ${theme.iconBackground} ${theme.iconHoverBackground}`}>
        <Icon className={`h-8 w-8 transition-colors duration-300 ${theme.iconText} group-hover:text-white`} />
      </div>

      <div className="relative mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">{item.tag}</p>
        <h3 className={`mt-3 text-lg font-bold leading-snug text-slate-800 transition-colors ${theme.titleHoverClass}`}>{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">{item.description}</p>
      </div>
    </Link>
  )
}

export function HeroSection({ content, services }: HeroSectionProps) {
  const scopeRef = useRef<HTMLDivElement>(null)
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  const [typedWord, setTypedWord] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const highlightedServices = services.slice(0, 4)
  const cardsGridClass =
    highlightedServices.length >= 4
      ? 'lg:grid-cols-4'
      : highlightedServices.length === 3
        ? 'md:grid-cols-2 lg:grid-cols-3'
      : highlightedServices.length === 2
          ? 'md:grid-cols-2'
          : 'mx-auto max-w-md grid-cols-1'
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const displayedWord = prefersReducedMotion ? HERO_TYPEWRITER_WORDS[activeWordIndex] : typedWord

  useHomeHeroAnimation({
    scope: scopeRef,
  })

  useEffect(() => {
    const currentWord = HERO_TYPEWRITER_WORDS[activeWordIndex]

    if (prefersReducedMotion) {
      return
    }

    let timeoutId: number

    if (!isDeleting && typedWord === currentWord) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(true)
      }, 1800)
    } else if (isDeleting && typedWord === '') {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false)
        setActiveWordIndex((currentIndex) => (currentIndex + 1) % HERO_TYPEWRITER_WORDS.length)
      }, 350)
    } else {
      timeoutId = window.setTimeout(() => {
        setTypedWord((currentValue) =>
          isDeleting ? currentValue.slice(0, -1) : currentWord.slice(0, currentValue.length + 1),
        )
      }, isDeleting ? 42 : 78)
    }

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [activeWordIndex, isDeleting, prefersReducedMotion, typedWord])

  return (
    <div ref={scopeRef} className="relative">
      <section
        id="home"
        className="hero-section relative -mt-px overflow-hidden bg-[#243b93] px-0 pb-44 pt-32 text-white md:pb-52 md:pt-40 lg:pb-56 lg:pt-48"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-[12%] -top-[10%] h-[30rem] w-[30rem] rounded-full bg-[#2563eb]/30 blur-[110px] animate-[heroBlobDrift_16s_ease-in-out_infinite]" />
          <div className="absolute right-[-12%] top-[18%] h-[24rem] w-[24rem] rounded-full bg-[#312e81]/30 blur-[110px] animate-[heroBlobDrift_18s_ease-in-out_infinite_reverse]" />
          <div className="absolute left-1/2 top-[52%] h-[18rem] w-[18rem] -translate-x-1/2 rounded-full bg-white/8 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
          <p
            data-hero-animate
            className="text-base font-semibold tracking-[0.02em] text-[#facc15] md:text-lg"
          >
            {content.eyebrow || 'Kami Memiliki Pengalaman & Profesionalitas'}
          </p>

          <h1
            data-hero-animate
            className="mt-4 max-w-5xl text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.85rem]"
          >
            {content.title}
            <span className="mt-3 block text-[#facc15]">
              yang Lebih{' '}
              <span className="whitespace-nowrap">
                {displayedWord}
                <span className="ml-1 inline-block h-[0.9em] w-1 align-[-0.08em] animate-pulse rounded-full bg-[#facc15]" />
              </span>
            </span>
          </h1>

          <p
            data-hero-animate
            className="mt-6 max-w-2xl text-base leading-8 text-blue-100/92 sm:text-lg"
          >
            {content.description}
          </p>

          <div
            data-hero-animate
            className="mt-10 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row"
          >
            <HeroActionLink
              href={content.secondaryCtaHref}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#facc15] px-8 py-3.5 text-sm font-bold text-[#243b93] shadow-[0_0_24px_rgba(250,204,21,0.32)] transition-all hover:-translate-y-1 hover:bg-[#fde047] hover:shadow-[0_0_34px_rgba(250,204,21,0.45)]"
            >
              <TerminalIcon className="h-5 w-5" />
              {content.secondaryCtaLabel}
            </HeroActionLink>
            <HeroActionLink
              href={content.primaryCtaHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/8 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/14"
            >
              <MessageCircleIcon className="h-5 w-5" />
              {content.primaryCtaLabel}
            </HeroActionLink>
          </div>

          {content.trustPoints.length > 0 ? (
            <ul className="mt-7 flex flex-wrap justify-center gap-3">
              {content.trustPoints.map((point) => (
                <li
                  key={point}
                  className="rounded-full border border-white/16 bg-white/8 px-4 py-2 text-sm text-blue-50 shadow-sm backdrop-blur-sm"
                >
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {highlightedServices.length > 0 ? (
        <div className="relative z-20 -mt-24 px-6 pb-10 md:-mt-28 md:pb-14 lg:-mt-32 lg:pb-16">
          <div data-hero-animate className="mx-auto w-full max-w-7xl">
            <div className={`grid gap-6 ${cardsGridClass}`}>
              {highlightedServices.map((item, index) => (
                <HeroServiceCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
