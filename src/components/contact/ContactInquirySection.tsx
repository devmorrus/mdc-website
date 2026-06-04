import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { ContactInfoContent } from '../../types/contact'
import { createWhatsAppLink } from '../../utils/createWhatsAppLink'
import { ContactInquiryFormCard } from './ContactInquiryFormCard'

interface ContactInquirySectionProps {
  content: ContactInfoContent
}

const INFO_ICONS: Record<string, React.ReactNode> = {
  Email: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  Telepon: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  'Jam Operasional': (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Lokasi: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
}

export function ContactInquirySection({ content }: ContactInquirySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          gsap.fromTo(infoRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
          gsap.fromTo(formRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 })
          observer.disconnect()
        })
      },
      { threshold: 0.08 },
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const whatsappLink = createWhatsAppLink(content.whatsappNumber, content.whatsappMessage)

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-14 md:pb-28 md:pt-16">
      <div className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 h-32 w-125 bg-amber-300/4 blur-3xl rounded-full" />

      <div className="grid gap-6 md:grid-cols-2">

        {/* ── Info panel ─────────────────────────────────────────────────────── */}
        <aside ref={infoRef} className="flex flex-col gap-5">
          {/* Header card */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-300/18 bg-linear-to-br from-blue-900/40 via-blue-950/60 to-blue-950/80 p-7">
            <div className="absolute top-0 right-0 h-24 w-24 bg-linear-to-bl from-amber-300/10 to-transparent rounded-bl-[70px] pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-300/35 to-transparent" />

            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-300/60" />
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-300">Kontak Kami</p>
            </div>

            <h2 className="text-2xl font-extrabold text-blue-50 mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
              {content.title}
            </h2>
            <p className="text-sm leading-relaxed text-blue-200/65">{content.description}</p>
          </div>

          {/* Contact info items */}
          <div className="rounded-2xl border border-blue-200/12 bg-linear-to-br from-blue-900/25 to-blue-950/50 overflow-hidden">
            {content.items.map((item, i) => (
              <div key={item.label} className={`group flex items-start gap-4 px-6 py-4 transition-all duration-300 hover:bg-blue-900/25 ${i > 0 ? 'border-t border-blue-200/8' : ''}`}>
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-300/25 bg-amber-300/8 text-amber-300 transition-all duration-300 group-hover:border-amber-300/45 group-hover:bg-amber-300/15">
                  {INFO_ICONS[item.label] ?? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400/50 mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-medium text-blue-100/85 transition-colors duration-200 hover:text-amber-200">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-blue-100/80">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-amber-300/25 bg-linear-to-r from-amber-300/12 to-amber-300/6 px-6 py-4 transition-all duration-300 hover:border-amber-300/50 hover:from-amber-300/20 hover:to-amber-300/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-amber-200 mb-0.5">{content.whatsappButtonLabel}</p>
                <p className="text-xs text-blue-300/55">Respon cepat via WhatsApp</p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-300 text-blue-950 text-xs font-black shadow-[0_0_20px_rgba(251,191,36,0.35)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] group-hover:scale-105">
                WA
              </div>
            </div>
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-amber-300/8 to-transparent transition-transform duration-700 group-hover:translate-x-full pointer-events-none" />
          </a>
        </aside>

        {/* ── Form ─────────────────────────────────────────────────────────── */}
        <div ref={formRef}>
          <ContactInquiryFormCard />
        </div>
      </div>
    </section>
  )
}
