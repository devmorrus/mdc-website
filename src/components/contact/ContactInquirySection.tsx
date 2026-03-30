import { type FormEvent } from 'react'

import { useContactInquiryForm } from '../../hooks/useContactInquiryForm'
import type { ContactInfoContent } from '../../types/contact'
import { createWhatsAppLink } from '../../utils/createWhatsAppLink'

interface ContactInquirySectionProps {
  content: ContactInfoContent
}

export function ContactInquirySection({ content }: ContactInquirySectionProps) {
  const {
    values,
    errors,
    isSubmitting,
    submitResult,
    setFieldValue,
    submitInquiry,
  } = useContactInquiryForm()

  const whatsappLink = createWhatsAppLink(content.whatsappNumber, content.whatsappMessage)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await submitInquiry()
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12 md:pb-20 md:pt-14">
      <div className="grid gap-6 md:grid-cols-2">
        <aside className="rounded-2xl border border-blue-200/20 bg-blue-900/25 p-6 md:p-7">
          <h2 className="text-2xl font-semibold text-blue-50">{content.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-blue-100/80 md:text-base">{content.description}</p>

          <dl className="mt-6 space-y-3 text-sm">
            {content.items.map((item) => (
              <div key={item.label} className="rounded-lg border border-blue-200/15 bg-blue-950/40 px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-200/90">{item.label}</dt>
                <dd className="mt-1 text-blue-50">
                  {item.href ? (
                    <a href={item.href} className="transition hover:text-amber-100">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-lg bg-amber-300 px-4 py-2 text-sm font-semibold text-blue-950 transition hover:bg-amber-200"
          >
            {content.whatsappButtonLabel}
          </a>
        </aside>

        <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-blue-200/20 bg-blue-900/25 p-6 md:p-7">
          <h2 className="text-2xl font-semibold text-blue-50">Form Inquiry</h2>
          <p className="mt-3 text-sm leading-relaxed text-blue-100/80">Lengkapi data berikut agar tim kami bisa menyiapkan rekomendasi terbaik untuk kebutuhan Anda.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-blue-100/90">
                Nama
              </label>
              <input
                id="contact-name"
                type="text"
                value={values.name}
                onChange={(event) => setFieldValue('name', event.target.value)}
                className="w-full rounded-lg border border-blue-200/30 bg-blue-950/45 px-3 py-2 text-sm text-blue-50 outline-none transition focus:border-amber-300/70"
                placeholder="Nama lengkap"
              />
              {errors.name && <p className="mt-1 text-xs text-amber-200">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact-company" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-blue-100/90">
                Nama Perusahaan
              </label>
              <input
                id="contact-company"
                type="text"
                value={values.companyName}
                onChange={(event) => setFieldValue('companyName', event.target.value)}
                className="w-full rounded-lg border border-blue-200/30 bg-blue-950/45 px-3 py-2 text-sm text-blue-50 outline-none transition focus:border-amber-300/70"
                placeholder="Nama perusahaan"
              />
              {errors.companyName && <p className="mt-1 text-xs text-amber-200">{errors.companyName}</p>}
            </div>

            <div>
              <label htmlFor="contact-whatsapp" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-blue-100/90">
                Nomor WhatsApp
              </label>
              <input
                id="contact-whatsapp"
                type="tel"
                value={values.whatsappNumber}
                onChange={(event) => setFieldValue('whatsappNumber', event.target.value)}
                className="w-full rounded-lg border border-blue-200/30 bg-blue-950/45 px-3 py-2 text-sm text-blue-50 outline-none transition focus:border-amber-300/70"
                placeholder="08xxxxxxxxxx"
              />
              {errors.whatsappNumber && <p className="mt-1 text-xs text-amber-200">{errors.whatsappNumber}</p>}
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-blue-100/90">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={values.email}
                onChange={(event) => setFieldValue('email', event.target.value)}
                className="w-full rounded-lg border border-blue-200/30 bg-blue-950/45 px-3 py-2 text-sm text-blue-50 outline-none transition focus:border-amber-300/70"
                placeholder="email@perusahaan.com"
              />
              {errors.email && <p className="mt-1 text-xs text-amber-200">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-blue-100/90">
                Kebutuhan / Pesan
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={values.message}
                onChange={(event) => setFieldValue('message', event.target.value)}
                className="w-full resize-none rounded-lg border border-blue-200/30 bg-blue-950/45 px-3 py-2 text-sm text-blue-50 outline-none transition focus:border-amber-300/70"
                placeholder="Ceritakan kebutuhan website atau sistem Anda"
              />
              {errors.message && <p className="mt-1 text-xs text-amber-200">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex rounded-lg bg-amber-300 px-5 py-3 text-sm font-semibold text-blue-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Inquiry'}
            </button>

            {submitResult && (
              <p className={`text-sm ${submitResult.status === 'success' ? 'text-emerald-200' : 'text-amber-200'}`}>
                {submitResult.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
