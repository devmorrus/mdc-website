import { type FormEvent, useId } from 'react'
import { useContactInquiryForm } from '../../hooks/useContactInquiryForm'

interface ContactInquiryFormCardProps {
  title?: string
  description?: string
  className?: string
}

export function ContactInquiryFormCard({
  title = 'Form Inquiry',
  description = 'Lengkapi data berikut agar kami bisa menyiapkan rekomendasi terbaik.',
  className = '',
}: ContactInquiryFormCardProps) {
  const { values, errors, isSubmitting, submitResult, setFieldValue, submitInquiry } = useContactInquiryForm()
  const formId = useId()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await submitInquiry()
  }

  const inputClass = 'w-full rounded-xl border border-blue-200/20 bg-blue-950/50 px-4 py-3 text-sm text-blue-50 outline-none placeholder-blue-400/30 backdrop-blur-sm transition-all duration-300 focus:border-amber-300/60 focus:bg-blue-950/70 focus:shadow-[0_0_0_3px_rgba(251,191,36,0.08)]'
  const labelClass = 'mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300/60'

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-blue-200/15 bg-linear-to-br from-blue-900/30 via-blue-950/55 to-blue-950/80 p-5 backdrop-blur-sm sm:p-7 ${className}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-400/30 to-transparent" />
      <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-[60px] bg-linear-to-bl from-amber-300/8 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <h2 className="mb-1.5 text-xl font-extrabold text-blue-50 sm:text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>
          {title}
        </h2>
        <p className="mb-6 text-sm leading-6 text-blue-200/55 sm:mb-7">{description}</p>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${formId}-name`} className={labelClass}>Nama</label>
              <input
                id={`${formId}-name`}
                type="text"
                value={values.name}
                onChange={(event) => setFieldValue('name', event.target.value)}
                className={inputClass}
                placeholder="Nama lengkap"
              />
              {errors.name && <p className="mt-1.5 text-xs text-amber-300">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor={`${formId}-company`} className={labelClass}>Perusahaan</label>
              <input
                id={`${formId}-company`}
                type="text"
                value={values.companyName}
                onChange={(event) => setFieldValue('companyName', event.target.value)}
                className={inputClass}
                placeholder="Nama perusahaan"
              />
              {errors.companyName && <p className="mt-1.5 text-xs text-amber-300">{errors.companyName}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${formId}-whatsapp`} className={labelClass}>WhatsApp</label>
              <input
                id={`${formId}-whatsapp`}
                type="tel"
                value={values.whatsappNumber}
                onChange={(event) => setFieldValue('whatsappNumber', event.target.value)}
                className={inputClass}
                placeholder="08xxxxxxxxxx"
              />
              {errors.whatsappNumber && <p className="mt-1.5 text-xs text-amber-300">{errors.whatsappNumber}</p>}
            </div>
            <div>
              <label htmlFor={`${formId}-email`} className={labelClass}>Email</label>
              <input
                id={`${formId}-email`}
                type="email"
                value={values.email}
                onChange={(event) => setFieldValue('email', event.target.value)}
                className={inputClass}
                placeholder="email@perusahaan.com"
              />
              {errors.email && <p className="mt-1.5 text-xs text-amber-300">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor={`${formId}-message`} className={labelClass}>Kebutuhan / Pesan</label>
            <textarea
              id={`${formId}-message`}
              rows={5}
              value={values.message}
              onChange={(event) => setFieldValue('message', event.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="Ceritakan kebutuhan website atau sistem Anda..."
            />
            {errors.message && <p className="mt-1.5 text-xs text-amber-300">{errors.message}</p>}
          </div>

          <div className="flex flex-col items-stretch gap-4 pt-1 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full overflow-hidden rounded-xl bg-amber-300 px-7 py-3 text-sm font-bold text-blue-950 shadow-[0_0_25px_rgba(251,191,36,0.25)] transition-all duration-300 hover:bg-amber-200 hover:shadow-[0_0_40px_rgba(251,191,36,0.45)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <span className="relative z-10">{isSubmitting ? 'Mengirim...' : 'Kirim'}</span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </button>

            {submitResult && (
              <p className={`text-sm font-medium ${submitResult.status === 'success' ? 'text-emerald-300' : 'text-amber-300'}`}>
                {submitResult.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
