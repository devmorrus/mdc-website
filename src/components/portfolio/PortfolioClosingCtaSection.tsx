import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import type { PortfolioClosingCtaContent } from '../../types/portfolio'

interface PortfolioClosingCtaSectionProps {
  content: PortfolioClosingCtaContent
}

const CTA_BUBBLES = [
  { size: 14, left: '10%', duration: 10, delay: 0 },
  { size: 9, left: '30%', duration: 8, delay: 1.5 },
  { size: 18, left: '75%', duration: 13, delay: 0.8 },
]

export function PortfolioClosingCtaSection({ content }: PortfolioClosingCtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(sectionRef.current, { autoAlpha: 1, y: 0, scale: 1 })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          gsap.fromTo(
            entry.target,
            { y: 30, autoAlpha: 0, scale: 0.97 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
          )

          observer.disconnect()
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>
        {`
          @keyframes portfolioCtaFloatBubble {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            10% { opacity: 0.35; }
            90% { opacity: 0.25; }
            100% { transform: translateY(-220px) scale(1.3); opacity: 0; }
          }
        `}
      </style>

      <section ref={sectionRef} className="mx-auto w-full max-w-[78rem] px-6 pb-24 pt-2 md:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(246,196,69,0.18)] bg-[linear-gradient(160deg,#0b1c4a_0%,#10295e_45%,#081a45_100%)] px-9 py-14 shadow-[0_50px_100px_-40px_rgba(8,26,69,0.6)] md:px-10">
          {CTA_BUBBLES.map((bubble) => (
            <div
              key={`${bubble.left}-${bubble.size}`}
              className="pointer-events-none absolute bottom-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),rgba(246,196,69,0.25))]"
              style={{
                width: bubble.size,
                height: bubble.size,
                left: bubble.left,
                opacity: 0.35,
                animation: `portfolioCtaFloatBubble ${bubble.duration}s linear infinite`,
                animationDelay: `${bubble.delay}s`,
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[34rem]">
              <span className="inline-flex items-center gap-2 text-[0.74rem] font-bold uppercase tracking-[0.28em] text-[#f6c445]">
                <span className="h-[7px] w-[7px] rounded-full bg-[#f6c445] shadow-[0_0_0_4px_rgba(246,196,69,0.18)]" />
                Project Selanjutnya
              </span>

              <h2
                className="mt-4 text-[clamp(1.9rem,3.4vw+0.5rem,2.8rem)] font-bold leading-[1.1] text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Ingin Project Anda Jadi <span className="text-[#f6c445]">Portfolio Berikutnya?</span>
              </h2>

              <p className="mt-4 text-base leading-8 text-[#c7d4f5]">
                {content.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to={content.buttonHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#f6c445] px-7 py-4 text-[0.92rem] font-bold text-[#081a45] shadow-[0_16px_30px_-16px_rgba(246,196,69,0.7)] transition hover:-translate-y-0.5 hover:bg-[#ffd866] hover:shadow-[0_22px_38px_-16px_rgba(246,196,69,0.85)]"
              >
                {content.buttonLabel}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                to="/portfolio"
                className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] px-7 py-4 text-[0.92rem] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.12)]"
              >
                Lihat Portfolio Lain
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
