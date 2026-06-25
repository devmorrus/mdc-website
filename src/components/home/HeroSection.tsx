import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { useHomeHeroAnimation } from '../../animations/useHomeHeroAnimation'
import { useHeroThreeCanvas } from '../../hooks/useHeroThreeCanvas'
import { usePlexusGlobe } from '../../hooks/usePlexusGlobe'
import type { HeroContent } from '../../types/home'

interface HeroSectionProps {
  content: HeroContent
}

interface HeroActionLinkProps {
  href: string
  className: string
  children: ReactNode
}

const HERO_TYPEWRITER_WORDS = ['Terintegrasi.', 'Skalabel.', 'Profesional.', 'Inovatif.']

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

function ArrowDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  )
}

export function HeroSection({ content }: HeroSectionProps) {
  const scopeRef = useRef<HTMLDivElement>(null)
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  const [typedWord, setTypedWord] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const canvasRef = useHeroThreeCanvas()
  const assetCanvasRef = usePlexusGlobe()

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const displayedWord = prefersReducedMotion ? HERO_TYPEWRITER_WORDS[activeWordIndex] : typedWord

  useHomeHeroAnimation({ scope: scopeRef })

  // Typewriter effect
  useEffect(() => {
    const currentWord = HERO_TYPEWRITER_WORDS[activeWordIndex]

    if (prefersReducedMotion) return

    let timeoutId: number

    if (!isDeleting && typedWord === currentWord) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(true)
      }, 1800)
    } else if (isDeleting && typedWord === '') {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false)
        setActiveWordIndex((idx) => (idx + 1) % HERO_TYPEWRITER_WORDS.length)
      }, 350)
    } else {
      timeoutId = window.setTimeout(() => {
        setTypedWord((val) =>
          isDeleting ? val.slice(0, -1) : currentWord.slice(0, val.length + 1),
        )
      }, isDeleting ? 42 : 78)
    }

    return () => window.clearTimeout(timeoutId)
  }, [activeWordIndex, isDeleting, prefersReducedMotion, typedWord])

  // Kick off typewriter after initial animation
  useLayoutEffect(() => {
    if (!prefersReducedMotion && typedWord === '') {
      const t = window.setTimeout(() => {
        setTypedWord(HERO_TYPEWRITER_WORDS[0][0])
      }, 900)
      return () => window.clearTimeout(t)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={scopeRef} className="relative">
      <section
        id="home"
        className="hero-section relative -mt-px overflow-hidden"
      >
        {/* ── Deep navy background ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, #030b1a 0%, #050f26 35%, #071640 60%, #0a1f54 100%)',
          }}
        />

        {/* ── Three.js canvas ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ opacity: 0.9 }}
          aria-hidden="true"
        />

        {/* ── Radial vignette overlay — darkens edges, brightens center focus ── */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(3,11,26,0.38) 65%, rgba(3,11,26,0.82) 100%)',
          }}
          aria-hidden="true"
        />

        {/* ── Subtle gold glow at bottom-right ── */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/4 translate-y-1/4"
          style={{
            background: 'radial-gradient(circle, rgba(250,204,21,0.10) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          aria-hidden="true"
        />

        {/* ── Subtle blue glow at top-left ── */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-[380px] w-[380px] -translate-x-1/4 -translate-y-1/4"
          style={{
            background: 'radial-gradient(circle, rgba(56,189,248,0.09) 0%, transparent 70%)',
            filter: 'blur(48px)',
          }}
          aria-hidden="true"
        />

        {/* ── Content ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 pt-28 text-white md:pb-28 md:pt-32 flex min-h-screen items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start order-1 lg:order-1 w-full">
              {/* Eyebrow badge */}
              <p
                data-hero-animate
                className="hero-eyebrow-badge inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.07] px-5 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-blue-100/80 backdrop-blur-sm"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_2px_rgba(56,189,248,0.7)]" />
                {content.eyebrow || 'Kami Memiliki Pengalaman & Profesionalitas'}
              </p>

              {/* Heading */}
              <h1
                data-hero-animate
                className="mt-8 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.2rem] lg:leading-[1.15]"
              >
                <span className="block">{content.title}</span>
                <span className="mt-2 block">
                  <span className="text-white/90">Lebih </span>
                  <span className="whitespace-nowrap text-[#facc15]">
                    {displayedWord}
                    <span className="ml-1 inline-block h-[0.88em] w-[3px] align-[-0.06em] animate-pulse rounded-full bg-[#facc15]" />
                  </span>
                </span>
              </h1>

              {/* Description */}
              <p
                data-hero-animate
                className="mt-7 max-w-xl text-base leading-7 text-blue-100/72 sm:text-lg"
              >
                {content.description}
              </p>

              {/* CTA Buttons */}
              <div
                data-hero-animate
                className="mt-10 flex flex-col items-center justify-center lg:justify-start gap-4 sm:flex-row w-full sm:w-auto"
              >
                {/* Primary CTA — Gold */}
                <HeroActionLink
                  href={content.secondaryCtaHref}
                  className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#facc15] px-8 py-3.5 text-sm font-bold text-[#0b1f57] shadow-[0_0_32px_rgba(250,204,21,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#fde047] hover:shadow-[0_0_48px_rgba(250,204,21,0.42)] w-full sm:w-auto"
                >
                  {/* Sheen sweep on hover */}
                  <span className="absolute inset-0 -translate-x-full skew-x-[-18deg] bg-white/20 transition-transform duration-500 group-hover:translate-x-[120%]" />
                  <TerminalIcon className="relative h-4.5 w-4.5" />
                  <span className="relative">{content.secondaryCtaLabel}</span>
                </HeroActionLink>

                {/* Secondary CTA — Glass */}
                <HeroActionLink
                  href={content.primaryCtaHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/18 bg-white/[0.07] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.13] w-full sm:w-auto"
                >
                  <MessageCircleIcon className="h-4.5 w-4.5" />
                  {content.primaryCtaLabel}
                </HeroActionLink>
              </div>

              {/* Trust points */}
              {content.trustPoints.length > 0 ? (
                <ul data-hero-animate className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
                  {content.trustPoints.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-blue-50/80 backdrop-blur-sm"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* Right Column: 3D Plexus Globe */}
            <div className="lg:col-span-5 flex justify-center items-center h-[320px] sm:h-[400px] lg:h-[480px] w-full order-2 lg:order-2 relative select-none">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/5 to-purple-500/0 blur-3xl rounded-full pointer-events-none" />
              <canvas ref={assetCanvasRef} className="w-full h-full relative z-10 max-w-[450px] lg:max-w-none" />
            </div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          data-hero-animate
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="hero-scroll-indicator flex flex-col items-center gap-2 text-white/40">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <div className="hero-scroll-bounce">
              <ArrowDownIcon className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* ── Bottom fade to page background ── */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, transparent, #f7fbff)',
          }}
          aria-hidden="true"
        />
      </section>
    </div>
  )
}
