import { Link } from 'react-router-dom'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { ContactCtaContent } from '../../types/home'
import { ContactInquiryFormCard } from '../contact/ContactInquiryFormCard'
import konsepImplementasiPdf from '../../assets/Konsep_Implementasi_Fitur_Lanjutan_Klinik.pdf'

interface ContactCtaSectionProps {
  content: ContactCtaContent
  primaryCtaHref?: string
}

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')
}

export function ContactCtaSection({ content, primaryCtaHref }: ContactCtaSectionProps) {
  const sectionRef = useGsapReveal<HTMLElement>()
  const resolvedPrimaryCtaHref = primaryCtaHref ?? content.primaryCtaHref

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#edf3ff_0%,#f5f9ff_100%)] pb-18 pt-8 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(246,196,69,0.08),transparent_18%),radial-gradient(circle_at_84%_76%,rgba(24,74,168,0.07),transparent_18%)]" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-[#0b1f57] via-[#0f2f78] to-[#123a93] px-5 py-8 text-white shadow-[0_30px_90px_-40px_rgba(11,31,87,0.65)] sm:px-7 sm:py-9 md:rounded-[2.25rem] md:px-10 md:py-10">
          <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-[#f6c445]/20 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

          <div className="relative grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12">
            <div className="min-w-0 text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#f6c445]">
                {content.eyebrow}
              </p>
              <h2
                className="mx-auto mt-4 max-w-3xl text-2xl font-bold leading-snug sm:text-3xl lg:mx-0"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {content.title}
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-sm leading-7 text-slate-300 md:text-base lg:mx-0">
                {content.description}
              </p>

              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                {isExternalHref(resolvedPrimaryCtaHref) ? (
                  <a
                    href={resolvedPrimaryCtaHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#f6c445] px-6 py-3.5 text-sm font-semibold text-[#0b1f57] transition hover:bg-[#ffd15c] sm:w-auto"
                  >
                    {content.primaryCtaLabel}
                  </a>
                ) : (
                  <Link
                    to={resolvedPrimaryCtaHref}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#f6c445] px-6 py-3.5 text-sm font-semibold text-[#0b1f57] transition hover:bg-[#ffd15c] sm:w-auto"
                  >
                    {content.primaryCtaLabel}
                  </Link>
                )}
                <a
                  href={konsepImplementasiPdf}
                  download="Konsep_Implementasi_Fitur_Lanjutan_Klinik.pdf"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/18 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/16 sm:w-auto"
                >
                  Download PDF
                </a>
              </div>
            </div>

            <ContactInquiryFormCard
              title="Konsultasikan Kebutuhan Anda"
              description="Isi kebutuhan singkat Anda di sini, lalu tim kami akan menindaklanjuti dengan rekomendasi yang sesuai."
              className="min-w-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
