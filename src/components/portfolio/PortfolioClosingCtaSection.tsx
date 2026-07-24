import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import type { PortfolioClosingCtaContent } from '../../types/portfolio'

interface PortfolioClosingCtaSectionProps {
  content: PortfolioClosingCtaContent
}

export function PortfolioClosingCtaSection({ content }: PortfolioClosingCtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(sectionRef.current, { autoAlpha: 1, y: 0 })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          gsap.fromTo(
            entry.target,
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' },
          )

          observer.disconnect()
        })
      },
      { threshold: 0.12 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-4 md:pb-32">
      <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(246,196,69,0.18)] bg-[linear-gradient(160deg,#0b1c4a_0%,#10295e_45%,#081a45_100%)] px-8 py-10 text-white shadow-[0_30px_90px_-40px_rgba(11,31,87,0.65)] md:px-10 md:py-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(246,196,69,0.28),transparent_70%)] blur-2xl" />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_72%)] blur-2xl" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[0.74rem] font-bold uppercase tracking-[0.28em] text-[#f6c445]">
              <span className="h-[7px] w-[7px] rounded-full bg-[#f6c445] shadow-[0_0_0_4px_rgba(246,196,69,0.18)]" />
              Next Project
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[34rem]">
              <h2
                className="text-[clamp(1.9rem,3.4vw+0.5rem,2.8rem)] font-bold leading-[1.08] text-white"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Ingin Project Anda Menjadi <span className="text-[#f6c445]">Portfolio Berikutnya?</span>
              </h2>
              <p className="mt-4 text-base leading-8 text-[#c7d4f5]">
                {content.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {['Strategi yang terukur', 'Tampilan lebih meyakinkan', 'Implementasi rapi dan scalable'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-medium text-blue-50/84"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to={content.buttonHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f6c445] px-7 py-4 text-[0.92rem] font-bold text-[#081a45] shadow-[0_16px_30px_-16px_rgba(246,196,69,0.7)] transition hover:-translate-y-0.5 hover:bg-[#ffd866]"
              >
                {content.buttonLabel}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/[0.06] px-7 py-4 text-[0.92rem] font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
              >
                Lihat Portfolio Lain
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
