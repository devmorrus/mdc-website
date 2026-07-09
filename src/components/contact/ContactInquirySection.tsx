import { useRef, type ReactNode } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { createWhatsAppLink } from '../../utils/createWhatsAppLink'
import type { ContactInfoContent } from '../../types/contact'
import { ContactInquiryFormCard } from './ContactInquiryFormCard'

interface ContactInquirySectionProps {
  content: ContactInfoContent
}

function getContactIcon(label: string): ReactNode {
  const baseClass = 'h-5 w-5'

  switch (label.toLowerCase()) {
    case 'email':
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.75A2.25 2.25 0 016.25 4.5h11.5A2.25 2.25 0 0120 6.75v10.5A2.25 2.25 0 0117.75 19.5H6.25A2.25 2.25 0 014 17.25V6.75z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 7.5L12 12.75l6.5-5.25" />
        </svg>
      )
    case 'telepon':
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.25A2.25 2.25 0 015.25 3h2.114c.81 0 1.53.52 1.787 1.288l.764 2.293a2.25 2.25 0 01-.513 2.34l-1.274 1.274a15.067 15.067 0 006.094 6.094l1.274-1.274a2.25 2.25 0 012.34-.513l2.293.764A2.25 2.25 0 0121 18.636v2.114A2.25 2.25 0 0118.75 23a15.75 15.75 0 01-15.75-15.75V5.25z" />
        </svg>
      )
    case 'jam operasional':
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="8.25" />
        </svg>
      )
    case 'lokasi':
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s6-5.686 6-11.25A6 6 0 106 9.75C6 15.314 12 21 12 21z" />
          <circle cx="12" cy="9.75" r="2.25" />
        </svg>
      )
    default:
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      )
  }
}

export function ContactInquirySection({ content }: ContactInquirySectionProps) {
  const infoCardRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const trustRefs = useRef<(HTMLDivElement | null)[]>([])
  const formWrapRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  const sectionRef = useGsapReveal<HTMLElement>({
    from: { y: 34, opacity: 0 },
    to: { stagger: 0.08, duration: 0.72 },
    targets: () => [infoCardRef.current, ...trustRefs.current, dividerRef.current, ...itemRefs.current, formWrapRef.current],
    threshold: 0.12,
  })

  const whatsappUrl = createWhatsAppLink(content.whatsappNumber, content.whatsappMessage)
  const trustPoints = ['Respon < 1 jam kerja', 'Konsultasi awal gratis', 'Data Anda aman']

  return (
    <section
      ref={sectionRef}
      id="contact-inquiry"
      className="relative overflow-hidden py-18 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fffdfa_0%,#f7fbff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(246,196,69,0.13),transparent_18%),radial-gradient(circle_at_84%_18%,rgba(24,74,168,0.09),transparent_20%),radial-gradient(circle_at_52%_100%,rgba(255,255,255,0.92),transparent_28%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(24,74,168,1) 1px, transparent 1px), linear-gradient(90deg, rgba(24,74,168,1) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#c49019]">Kontak &amp; Inquiry</p>
          <h2
            className="mt-4 text-3xl font-bold leading-tight text-[#0b1f57] md:text-4xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Ceritakan kebutuhan Anda, kami siapkan langkahnya.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Pilih jalur yang paling nyaman untuk Anda. Konsultasikan Kebutuhan Anda cocok untuk penjelasan yang lebih detail, sementara WhatsApp ideal untuk percakapan awal yang lebih cepat.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {trustPoints.map((point, index) => (
            <div
              key={point}
              ref={(element) => {
                trustRefs.current[index] = element
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#d7e3f7] bg-white/82 px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-[#4f628d] uppercase shadow-[0_12px_30px_-28px_rgba(15,23,42,0.16)] backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-[#f6c445] shadow-[0_0_10px_rgba(246,196,69,0.5)]" />
              {point}
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.94fr)_auto_minmax(0,1.06fr)] lg:items-stretch lg:gap-6">
          <div ref={infoCardRef} className="relative overflow-hidden rounded-[2rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] p-7 shadow-[0_26px_60px_-42px_rgba(11,31,87,0.24)] sm:p-8">
            <div className="pointer-events-none absolute -right-10 top-0 h-32 w-32 rounded-full bg-[#f6c445]/14 blur-3xl" />
            <div className="pointer-events-none absolute left-0 bottom-0 h-40 w-40 rounded-full bg-[#184aa8]/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f6c445]/55 to-transparent" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.42)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                Online • Senin-Jumat, 09.00-18.00 WIB
              </div>

              <h3
                className="mt-6 text-[1.55rem] font-extrabold leading-tight text-[#0b1f57] md:text-[2rem]"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {content.title}
              </h3>

              <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 md:text-[1.05rem]">
                {content.description} Pilih email, telepon, atau WhatsApp sesuai ritme komunikasi yang paling nyaman untuk Anda.
              </p>

              <div className="mt-8 space-y-3">
                {content.items.map((item, index) => {
                  const card = (
                    <div className="group flex h-full items-start gap-4 rounded-[1.45rem] border border-[#d7e3f7] bg-white/82 px-4 py-4 shadow-[0_18px_40px_-34px_rgba(11,31,87,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-[#184aa8]/18 hover:shadow-[0_28px_58px_-36px_rgba(11,31,87,0.28)]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.15rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#edf4ff_100%)] text-[#184aa8] transition-all duration-300 group-hover:border-[#f6c445]/30 group-hover:text-[#c49019]">
                        {getContactIcon(item.label)}
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-500/55">
                          {item.label}
                        </p>
                        <p className="mt-1.5 text-sm font-semibold leading-6 text-[#0b1f57] md:text-[0.97rem]">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )

                  if (item.href) {
                    return (
                      <a
                        key={item.label}
                        ref={(element) => {
                          if (element) itemRefs.current[index] = element
                        }}
                        href={item.href}
                        className="block"
                      >
                        {card}
                      </a>
                    )
                  }

                  return (
                    <div
                      key={item.label}
                      ref={(element) => {
                        if (element) itemRefs.current[index] = element
                      }}
                    >
                      {card}
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-[#25d366]/20 bg-[linear-gradient(180deg,#0f172a_0%,#111c35_100%)] px-5 py-5 text-white shadow-[0_20px_55px_-18px_rgba(37,211,102,0.7)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-400">
                      Jalur tercepat
                    </p>
                    <p className="mt-2 text-base font-semibold leading-7 text-white/94">
                      WhatsApp untuk respon awal yang lebih cepat dan praktis.
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      Cocok untuk pertanyaan singkat, follow-up cepat, atau konsultasi awal.
                    </p>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_-18px_rgba(37,211,102,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20bd5a]"
                  >
                    {content.whatsappButtonLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={dividerRef}
            className="relative hidden items-center justify-center lg:flex"
            aria-hidden="true"
          >
            <div className="h-[calc(100%-1.5rem)] w-px bg-[linear-gradient(180deg,rgba(246,196,69,0.2),rgba(24,74,168,0.16),rgba(246,196,69,0.2))]" />
            <span className="absolute top-[20%] h-3.5 w-3.5 rounded-full border-4 border-white bg-[#f6c445] shadow-[0_0_12px_rgba(246,196,69,0.5)]" />
            <span className="absolute bottom-[20%] h-3.5 w-3.5 rounded-full border-4 border-white bg-[#184aa8] shadow-[0_0_25px_rgba(24,74,168,0.18)]" />
          </div>

          <div ref={formWrapRef} className="relative">
            <ContactInquiryFormCard
              title="Konsultasikan Kebutuhan Anda Dengan Cepat"
              description="Semakin lengkap detail yang Anda isi, semakin mudah kami menyiapkan arahan yang relevan untuk bisnis Anda."
            />
          </div>
        </div>
      </div>
    </section>
  )
}
