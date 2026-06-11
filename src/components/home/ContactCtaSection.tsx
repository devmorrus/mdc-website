import { Link } from 'react-router-dom'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { ContactCtaContent } from '../../types/home'
import { ContactInquiryFormCard } from '../contact/ContactInquiryFormCard'

interface ContactCtaSectionProps {
  content: ContactCtaContent
}

export function ContactCtaSection({ content }: ContactCtaSectionProps) {
  const sectionRef = useGsapReveal<HTMLElement>()

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden bg-[linear-gradient(180deg,#edf3ff_0%,#f5f9ff_100%)] pb-18 pt-8 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(246,196,69,0.08),transparent_18%),radial-gradient(circle_at_84%_76%,rgba(24,74,168,0.07),transparent_18%)]" />
      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-linear-to-br from-[#0b1f57] via-[#0f2f78] to-[#123a93] px-25 text-white shadow-[0_30px_90px_-40px_rgba(11,31,87,0.65)] md:px-10 md:py-10">
          <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-[#f6c445]/20 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

          <div className="relative grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#f6c445]">
                {content.eyebrow}
              </p>
              <h2
                className="mt-4 mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-4xl lg:mx-0"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {content.title}
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-base leading-8 text-slate-300 lg:mx-0">
                {content.description}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link
                  to={content.primaryCtaHref}
                  className="inline-flex items-center justify-center rounded-full bg-[#f6c445] px-6 py-3.5 text-sm font-semibold text-[#0b1f57] transition hover:bg-[#ffd15c]"
                >
                  {content.primaryCtaLabel}
                </Link>
              </div>
            </div>

            <ContactInquiryFormCard
              title="Form Inquiry"
              description="Isi kebutuhan singkat Anda di sini, lalu tim kami akan menindaklanjuti dengan rekomendasi yang sesuai."
            />
          </div>
        </div>
      </div>
    </section>
  )
}
