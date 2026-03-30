import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { ContactCtaContent } from '../../types/home'
import { ContactLeadForm } from './ContactLeadForm'
import { Link } from 'react-router-dom'

interface ContactCtaSectionProps {
  content: ContactCtaContent
  whatsappLink: string
  whatsappNumber: string
}

export function ContactCtaSection({ content, whatsappLink, whatsappNumber }: ContactCtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              innerRef.current,
              { y: 30, opacity: 0, scale: 0.97 },
              { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
            )
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const targetHref = content.buttonHref === '#whatsapp' ? whatsappLink : content.buttonHref
  const isExternal = targetHref.startsWith('http')

  return (
    <section ref={sectionRef} id="contact" className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-8 md:pb-28">
      <div
        ref={innerRef}
        className="relative overflow-hidden rounded-3xl border border-amber-300/20 bg-linear-to-br from-blue-900/70 via-blue-950/80 to-[#021331] p-8 shadow-[0_40px_100px_-30px_rgba(251,191,36,0.2)] md:p-12"
      >
        {/* Background glow orbs */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-60 w-60 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-blue-500/15 blur-3xl" />

        {/* Top border highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-300/50 to-transparent" />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 h-40 w-40 bg-linear-to-bl from-amber-300/10 to-transparent rounded-bl-[100px]" />

        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative grid gap-8 md:grid-cols-2 md:items-start">
          {/* Left: CTA Text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-300/60" />
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-300">{content.eyebrow}</p>
            </div>

            <h2
              className="text-3xl font-extrabold leading-tight text-blue-50 md:text-4xl"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {content.title.split(' ').map((word, i) => {
                const isAccent = ['Website', 'Company', 'Profile', 'Digital', 'Bisnis'].includes(word)
                return (
                  <span key={i}>
                    <span className={isAccent ? 'bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent' : ''}>
                      {word}
                    </span>
                    {' '}
                  </span>
                )
              })}
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-blue-200/70 md:text-base">
              {content.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {isExternal ? (
                <a
                  href={targetHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-amber-300 px-6 py-3 text-sm font-bold text-blue-950 transition-all duration-300 hover:bg-amber-200 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]"
                >
                  <span className="relative z-10">{content.buttonLabel}</span>
                  <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </a>
              ) : (
                <Link
                  to={targetHref}
                  className="group relative overflow-hidden rounded-xl bg-amber-300 px-6 py-3 text-sm font-bold text-blue-950 transition-all duration-300 hover:bg-amber-200 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]"
                >
                  <span className="relative z-10">{content.buttonLabel}</span>
                  <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </Link>
              )}
            </div>

            {/* Trust signal badges */}
            <div className="mt-8 flex flex-wrap gap-2">
              {['Respon Cepat', 'Konsultasi Gratis', 'Estimasi Transparan'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/20 bg-blue-900/30 px-3 py-1 text-xs text-blue-300/70"
                >
                  <svg className="h-3 w-3 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Lead Form */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-linear-to-br from-amber-300/10 to-blue-500/10 blur-lg" />
            <div className="relative">
              <ContactLeadForm whatsappNumber={whatsappNumber} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}