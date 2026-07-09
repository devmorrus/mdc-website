import { useRef, type ReactNode } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { createWhatsAppLink } from '../../utils/createWhatsAppLink'
import type { ContactInfoContent } from '../../types/contact'
import { SectionHeading } from '../home/SectionHeading'
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
  const formWrapRef = useRef<HTMLDivElement>(null)

  const sectionRef = useGsapReveal<HTMLElement>({
    from: { y: 34, opacity: 0 },
    to: { stagger: 0.08, duration: 0.72 },
    targets: () => [infoCardRef.current, ...itemRefs.current, formWrapRef.current],
    threshold: 0.12,
  })

  const whatsappUrl = createWhatsAppLink(content.whatsappNumber, content.whatsappMessage)

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
        <SectionHeading
          eyebrow="Kontak & Inquiry"
          title="Siapkan brief singkat, lalu kami bantu susun langkah terbaik."
          description="Pilih jalur yang paling nyaman untuk Anda. Konsultasikan Kebutuhan Anda cocok untuk kebutuhan yang ingin dijelaskan lebih detail, sementara WhatsApp cepat untuk percakapan awal."
          centered
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.98fr_1.02fr] lg:items-start lg:gap-8">
          <div ref={infoCardRef} className="relative overflow-hidden rounded-[2rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] p-7 shadow-[0_24px_58px_-42px_rgba(11,31,87,0.24)]">
            <div className="pointer-events-none absolute -right-10 top-0 h-32 w-32 rounded-full bg-[#f6c445]/14 blur-3xl" />
            <div className="pointer-events-none absolute left-0 bottom-0 h-40 w-40 rounded-full bg-[#184aa8]/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f6c445]/55 to-transparent" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e3f7] bg-white/75 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c49019] backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f6c445]" />
                {content.title}
              </div>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 md:text-[1.05rem]">
                {content.description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {content.items.map((item, index) => {
                  const card = (
                    <div className="group flex h-full items-start gap-4 rounded-[1.35rem] border border-[#d7e3f7] bg-white/78 px-4 py-4 shadow-[0_14px_32px_-28px_rgba(11,31,87,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-[#184aa8]/16">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#edf4ff_100%)] text-[#184aa8] transition-all duration-300 group-hover:border-[#f6c445]/30 group-hover:text-[#c49019]">
                        {getContactIcon(item.label)}
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-500/55">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-medium leading-6 text-[#0b1f57]">
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

              <div className="mt-6 rounded-[1.5rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,rgba(11,31,87,0.96),rgba(24,58,131,0.96))] px-5 py-5 text-white shadow-[0_20px_48px_-32px_rgba(11,31,87,0.3)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-100/62">
                      Jalur tercepat
                    </p>
                    <p className="mt-2 text-base leading-7 text-blue-50/84">
                      Kirim pesan via WhatsApp untuk respon awal yang lebih cepat.
                    </p>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#f6c445] px-5 py-3 text-sm font-semibold text-[#0b1f57] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffd15c]"
                  >
                    {content.whatsappButtonLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div ref={formWrapRef} className="relative">
            <ContactInquiryFormCard
              title="Konsultasikan Kebutuhan Anda Dengan Cepat"
              description="Semakin lengkap detail yang Anda isi, semakin mudah kami menyiapkan arahan yang relevan untuk bisnis Anda."
            />

            <div className="mt-4 rounded-[1.35rem] border border-[#d7e3f7] bg-white/72 px-5 py-4 text-sm leading-7 text-slate-600 shadow-[0_14px_34px_-30px_rgba(11,31,87,0.18)] backdrop-blur-sm">
              Biasanya kami merespon pada jam kerja. Jika Anda mengirim di luar jam kerja, tetap akan kami balas pada hari berikutnya.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
