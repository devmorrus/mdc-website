import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { ContactHeroContent } from '../../types/contact'
import { ContactHeroCanvasOpt } from '../../three/OptimizedCanvases'

interface ContactHeroSectionProps {
  content: ContactHeroContent
}

export function ContactHeroSection({ content }: ContactHeroSectionProps) {
  const badgeRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(badgeRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 })
      .fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, '-=0.3')
      .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, '-=0.35')
  }, [])

  return (
    <section className="relative isolate overflow-hidden border-b border-blue-900/30 min-h-[70vh] flex items-center">
      <div className="pointer-events-none absolute -left-40 -top-20 h-100 w-100 rounded-full bg-sky-500/14 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-85 w-85 rounded-full bg-amber-300/14 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="pointer-events-none absolute right-0 top-0 h-full w-[55%] opacity-75">
        <ContactHeroCanvasOpt />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[28%] bg-linear-to-l from-[#021331] via-[#021331]/50 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl space-y-7">
          <p ref={badgeRef} className="inline-flex items-center gap-2 rounded-full border border-amber-300/45 bg-amber-200/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
            {content.eyebrow}
          </p>

          <h1 ref={titleRef} className="text-4xl font-extrabold leading-[1.08] tracking-tight text-blue-50 md:text-5xl xl:text-6xl" style={{ fontFamily: "'Sora', sans-serif" }}>
            {content.title.split(' ').map((word, i) => {
              const accent = ['Diskusikan', 'Digital', 'Bisnis'].includes(word)
              return (
                <span key={i}>
                  <span className={accent ? 'bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent' : ''}>{word}</span>{' '}
                </span>
              )
            })}
          </h1>

          <p ref={descRef} className="max-w-lg text-base leading-relaxed text-blue-200/70 md:text-lg">{content.description}</p>

          {/* Contact method quick links */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="mailto:hello@morrusdigital.com" className="group inline-flex items-center gap-2 rounded-xl border border-blue-200/20 bg-blue-900/25 px-4 py-2 text-sm text-blue-300/70 backdrop-blur-sm transition-all duration-300 hover:border-amber-300/40 hover:text-amber-200">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              Email
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-xl border border-blue-200/20 bg-blue-900/25 px-4 py-2 text-sm text-blue-300/70 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/40 hover:text-emerald-300">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-linear-to-t from-[#021331] to-transparent" />
    </section>
  )
}