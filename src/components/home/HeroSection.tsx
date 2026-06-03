import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useHomeHeroAnimation } from '../../animations/useHomeHeroAnimation'
import type { HeroContent } from '../../types/home'

interface HeroSectionProps {
  content: HeroContent
}

function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="absolute inset-x-10 -top-10 h-28 rounded-full bg-[#f6c445]/25 blur-3xl" />
      <div className="absolute -right-10 top-14 h-52 w-52 rounded-full bg-[#2e64d3]/30 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-6 shadow-[0_30px_90px_-40px_rgba(2,12,54,0.5)] backdrop-blur-sm md:p-8">
        <div className="absolute left-6 top-8 h-24 w-24 animate-[heroFloat_7s_ease-in-out_infinite] rounded-full bg-[#f6c445]/18 blur-2xl" />
        <div className="absolute right-8 top-16 h-28 w-28 animate-[heroFloat_9s_ease-in-out_infinite] rounded-full bg-[#7aa7ff]/18 blur-2xl [animation-delay:-2s]" />
        <div className="absolute bottom-10 left-1/2 h-36 w-36 -translate-x-1/2 animate-[heroPulse_6s_ease-in-out_infinite] rounded-full bg-white/8 blur-3xl" />

        <div className="relative flex aspect-[1/1.02] items-center justify-center overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#112d76_0%,#1845a1_52%,#3d74e0_100%)]">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          <div className="absolute h-[72%] w-[72%] animate-[heroSpin_28s_linear_infinite] rounded-full border border-white/12" />
          <div className="absolute h-[52%] w-[52%] animate-[heroSpinReverse_18s_linear_infinite] rounded-full border border-white/10" />

          <div className="absolute left-[12%] top-[18%] h-16 w-16 animate-[heroFloat_8s_ease-in-out_infinite] rounded-[1.5rem] border border-white/14 bg-white/10 backdrop-blur-sm [animation-delay:-1s]" />
          <div className="absolute right-[14%] top-[24%] h-20 w-20 animate-[heroFloat_10s_ease-in-out_infinite] rounded-full border border-white/14 bg-[#f6c445]/18 backdrop-blur-sm [animation-delay:-3s]" />
          <div className="absolute bottom-[18%] left-[18%] h-14 w-14 animate-[heroFloat_9s_ease-in-out_infinite] rounded-full border border-white/14 bg-white/10 backdrop-blur-sm [animation-delay:-4s]" />
          <div className="absolute bottom-[20%] right-[16%] h-18 w-18 animate-[heroFloat_7s_ease-in-out_infinite] rounded-[1.25rem] border border-white/14 bg-[#9ebcff]/14 backdrop-blur-sm [animation-delay:-2s]" />

          <div className="relative z-10 w-full max-w-[25rem] px-6">
            <div className="animate-[heroFloat_7s_ease-in-out_infinite] rounded-[2rem] border border-white/16 bg-[linear-gradient(160deg,rgba(255,255,255,0.18),rgba(255,255,255,0.08))] p-5 shadow-[0_24px_60px_-36px_rgba(3,11,39,0.7)] backdrop-blur-md [animation-delay:-1.5s]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-blue-100/70">Digital Presence</p>
                  <p className="mt-2 text-xl font-semibold text-white">Brand yang tampil lebih siap</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-blue-50">Modern</span>
              </div>

              <div className="mt-5 space-y-3 rounded-[1.5rem] bg-[#0b1f57]/40 p-4">
                <div className="h-3 w-28 animate-[heroPulse_5s_ease-in-out_infinite] rounded-full bg-[#f6c445]" />
                <div className="h-4 w-full rounded-full bg-white/88" />
                <div className="h-4 w-4/5 rounded-full bg-white/62" />
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="rounded-2xl bg-white/10 p-3">
                    <div className="h-8 w-8 animate-[heroPulse_6s_ease-in-out_infinite] rounded-xl bg-[#f6c445]" />
                    <div className="mt-3 h-2 w-10 rounded-full bg-white/70" />
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <div className="h-8 w-8 animate-[heroPulse_5.4s_ease-in-out_infinite] rounded-xl bg-[#8cb2ff]" />
                    <div className="mt-3 h-2 w-8 rounded-full bg-white/70" />
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <div className="h-8 w-8 animate-[heroPulse_5.8s_ease-in-out_infinite] rounded-xl bg-white/80" />
                    <div className="mt-3 h-2 w-9 rounded-full bg-white/70" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 top-10 animate-[heroFloat_8.5s_ease-in-out_infinite] rounded-2xl border border-white/14 bg-white px-4 py-3 text-[#0b1f57] shadow-[0_18px_30px_-24px_rgba(2,12,54,0.8)] [animation-delay:-2.5s]">
              <p className="text-[0.62rem] uppercase tracking-[0.26em] text-blue-400">Visual Impact</p>
              <p className="mt-1 text-lg font-semibold">Lebih profesional</p>
            </div>

            <div className="absolute -right-2 bottom-2 animate-[heroFloat_7.8s_ease-in-out_infinite] rounded-2xl border border-white/12 bg-[#0b1f57]/78 px-4 py-3 text-white shadow-[0_18px_30px_-24px_rgba(2,12,54,0.8)] backdrop-blur-sm [animation-delay:-1s]">
              <p className="text-[0.62rem] uppercase tracking-[0.26em] text-blue-200/70">Message</p>
              <p className="mt-1 text-lg font-semibold">Lebih jelas</p>
            </div>
          </div>
        </div>
      </div>
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
