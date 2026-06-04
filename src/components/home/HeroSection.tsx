import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useHomeHeroAnimation } from '../../animations/useHomeHeroAnimation'
import heroLogo from '../../assets/logo-hero-removebg-preview.png'
import type { HeroContent } from '../../types/home'

interface HeroSectionProps {
  content: HeroContent
}

function HeroVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-2xl items-center justify-center">
      <div className="absolute left-[10%] top-[8%] h-32 w-32 rounded-full bg-[#f6c445]/22 blur-3xl" />
      <div className="absolute right-[8%] top-[18%] h-56 w-56 rounded-full bg-[#2e64d3]/28 blur-3xl" />
      <div className="absolute bottom-[10%] left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <img
        src={heroLogo}
        alt="Logo hero Morrus Digital Connecting"
        className="relative z-10 w-full max-w-[48rem] object-contain scale-115 md:max-w-[54rem] md:scale-125"
      />
    </div>
  )
}

export function HeroSection({ content }: HeroSectionProps) {
  const scopeRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useHomeHeroAnimation({
    scope: scopeRef,
    targets: [eyebrowRef, titleRef, descriptionRef, actionsRef],
  })

  return (
    <section
      id="home"
      ref={scopeRef}
      className="relative -mt-px overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(246,196,69,0.14),transparent_18%),radial-gradient(circle_at_85%_18%,rgba(46,100,211,0.32),transparent_24%),linear-gradient(135deg,#081a4a_0%,#0d2c76_48%,#1949a6_100%)] pb-18 pt-28 text-white md:pb-24 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.06),transparent_22%)]" />
      <div className="pointer-events-none absolute -left-10 top-0 h-72 w-72 rounded-full bg-[#f6c445]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-[#2e64d3]/26 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-40 w-120 rounded-full bg-[#071230]/22 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(to_bottom,rgba(245,249,255,0)_0%,rgba(245,249,255,0.16)_25%,rgba(245,249,255,0.92)_78%,#f5f9ff_100%)]" />

      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 md:grid-cols-[1fr_0.95fr] md:items-center">
        <div className="relative z-10">
          {content.eyebrow ? (
            <p
              ref={eyebrowRef}
              className="inline-flex items-center rounded-full border border-[#f6c445]/30 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#f6c445]"
            >
              {content.eyebrow}
            </p>
          ) : null}

          <h1
            ref={titleRef}
            className={`${content.eyebrow ? 'mt-6' : 'mt-0'} max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl xl:text-6xl`}
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {content.title}
          </h1>

          <p
            ref={descriptionRef}
            className="mt-6 max-w-2xl text-lg leading-8 text-blue-100/82"
          >
            {content.description}
          </p>

          <div ref={actionsRef} className="mt-8 flex flex-wrap gap-4">
            <Link
              to={content.primaryCtaHref}
              className="inline-flex items-center justify-center rounded-full bg-[#f6c445] px-6 py-3.5 text-sm font-semibold text-[#0b1f57] transition hover:-translate-y-0.5 hover:bg-[#ffd15c]"
            >
              {content.primaryCtaLabel}
            </Link>
            <Link
              to={content.secondaryCtaHref}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#f6c445]/55 hover:text-[#f6c445]"
            >
              {content.secondaryCtaLabel}
            </Link>
          </div>

          {content.trustPoints.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {content.trustPoints.map((point) => (
                <li
                  key={point}
                  className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-blue-50 shadow-sm backdrop-blur-sm"
                >
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
