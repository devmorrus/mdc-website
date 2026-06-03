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
      <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white shadow-[0_30px_90px_-40px_rgba(2,12,54,0.5)]">
        <div className="flex items-center gap-2 border-b border-blue-100 bg-[#edf4ff] px-5 py-4">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <div className="ml-4 h-8 w-full rounded-full bg-white px-4 py-2 text-xs text-blue-400 shadow-[inset_0_0_0_1px_rgba(24,74,168,0.12)]">
            morrusdigital.com/company-profile
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-[1.15fr_0.85fr] md:p-7">
          <div className="space-y-4 rounded-[1.5rem] bg-[#0b1f57] px-5 py-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Homepage</p>
                <p className="mt-2 text-2xl font-semibold">Company Profile</p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                Responsive
              </div>
            </div>

            <div className="space-y-3 rounded-[1.25rem] bg-white/6 p-4">
              <div className="h-3 w-28 rounded-full bg-[#f3c98b]" />
              <div className="h-4 w-full rounded-full bg-white/90" />
              <div className="h-4 w-5/6 rounded-full bg-white/75" />
              <div className="h-4 w-3/4 rounded-full bg-white/50" />
              <div className="flex gap-3 pt-2">
                <div className="h-10 w-32 rounded-full bg-[#f3c98b]" />
                <div className="h-10 w-28 rounded-full border border-white/20" />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['SEO', 'Heading rapi'],
                ['UI', 'Formal modern'],
                ['Lead', 'CTA lebih jelas'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
                  <p className="mt-2 text-sm text-slate-100">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.5rem] border border-slate-200 bg-[#f8f5ef] p-4">
              <div className="flex items-start justify-between">
                <div>
                <p className="text-xs uppercase tracking-[0.2em] text-blue-400">Highlights</p>
                  <p className="mt-2 text-lg font-semibold text-[#0b1f57]">Brand credibility</p>
                </div>
                <div className="rounded-2xl bg-white px-3 py-2 text-right shadow-sm">
                  <p className="text-xs text-blue-500">Potential leads</p>
                  <p className="text-xl font-semibold text-[#0b1f57]">+38%</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[82, 56, 92, 68].map((width, index) => (
                  <div key={width} className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-blue-500">
                      <span>Section {index + 1}</span>
                      <span>{width}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white">
                      <div className="h-2 rounded-full bg-[#184aa8]" style={{ width: `${width}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-400">Visual system</p>
                <div className="mt-4 flex gap-2">
                  {['#0b1f57', '#184aa8', '#f6c445', '#dbe7ff'].map((color) => (
                    <span key={color} className="h-10 flex-1 rounded-2xl" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-400">Delivery focus</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>Responsive layout</li>
                  <li>Clean hierarchy</li>
                  <li>Ready for real content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-4 top-10 rounded-2xl border border-white/15 bg-white px-4 py-3 shadow-lg">
        <p className="text-xs uppercase tracking-[0.22em] text-blue-400">Avg. delivery</p>
        <p className="mt-1 text-xl font-semibold text-[#0b1f57]">7 hari kickoff</p>
      </div>
      <div className="absolute -bottom-5 right-5 rounded-2xl bg-[#0f2f78] px-4 py-3 text-white shadow-xl">
        <p className="text-xs uppercase tracking-[0.22em] text-blue-200/70">SEO structure</p>
        <p className="mt-1 text-xl font-semibold">H1-H3 tertata</p>
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
          <p
            ref={eyebrowRef}
            className="inline-flex items-center rounded-full border border-[#f6c445]/30 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#f6c445]"
          >
            {content.eyebrow}
          </p>

          <h1
            ref={titleRef}
            className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl xl:text-6xl"
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
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
