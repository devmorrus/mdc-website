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

  const fieldClass =
    'peer w-full rounded-[1.35rem] border border-[#d7e3f7] bg-white/88 px-4 pb-3 pt-6 text-sm text-[#0b1f57] outline-none transition-all duration-300 placeholder:text-transparent focus:border-[#5b8cff] focus:bg-white focus:shadow-[0_0_0_3px_rgba(24,74,168,0.08)]'
  const labelClass =
    'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[11px] font-semibold tracking-[0.14em] text-[#5b6d93] uppercase transition-all duration-200 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:text-[#184aa8] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#184aa8]'

  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] p-6 shadow-[0_24px_58px_-42px_rgba(11,31,87,0.24)] sm:p-8 ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#184aa8]/26 to-transparent" />
      <div className="pointer-events-none absolute -right-8 top-0 h-28 w-28 rounded-bl-[80px] bg-[linear-gradient(225deg,rgba(246,196,69,0.14),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-tr-[100px] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),rgba(246,196,69,0.25))] opacity-40 blur-2xl" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e3f7] bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#184aa8] shadow-[inset_0_1px_0_rgba(255,255,255,0.42)] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#184aa8]" />
          Form digital
        </div>

        <h2
          className="mt-5 mb-2 text-xl font-extrabold text-[#0b1f57] sm:text-2xl"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {title}
        </h2>
        <p className="mb-6 max-w-xl text-sm leading-7 text-slate-600 sm:mb-7">{description}</p>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <input
                id={`${formId}-name`}
                type="text"
                value={values.name}
                onChange={(event) => setFieldValue('name', event.target.value)}
                className={fieldClass}
                placeholder=" "
              />
              <label htmlFor={`${formId}-name`} className={labelClass}>Nama Lengkap</label>
              {errors.name && <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>}
            </div>
            <div className="relative">
              <input
                id={`${formId}-company`}
                type="text"
                value={values.companyName}
                onChange={(event) => setFieldValue('companyName', event.target.value)}
                className={fieldClass}
                placeholder=" "
              />
              <label htmlFor={`${formId}-company`} className={labelClass}>Perusahaan</label>
              {errors.companyName && <p className="mt-1.5 text-xs text-rose-500">{errors.companyName}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <input
                id={`${formId}-whatsapp`}
                type="tel"
                value={values.whatsappNumber}
                onChange={(event) => setFieldValue('whatsappNumber', event.target.value)}
                className={fieldClass}
                placeholder=" "
              />
              <label htmlFor={`${formId}-whatsapp`} className={labelClass}>WhatsApp</label>
              {errors.whatsappNumber && <p className="mt-1.5 text-xs text-rose-500">{errors.whatsappNumber}</p>}
            </div>
            <div className="relative">
              <input
                id={`${formId}-email`}
                type="email"
                value={values.email}
                onChange={(event) => setFieldValue('email', event.target.value)}
                className={fieldClass}
                placeholder=" "
              />
              <label htmlFor={`${formId}-email`} className={labelClass}>Email</label>
              {errors.email && <p className="mt-1.5 text-xs text-rose-500">{errors.email}</p>}
            </div>
          </div>

          <div className="relative">
            <textarea
              id={`${formId}-message`}
              rows={5}
              value={values.message}
              onChange={(event) => setFieldValue('message', event.target.value)}
              className={`${fieldClass} min-h-[152px] resize-none pt-7`}
              placeholder=" "
            />
            <label htmlFor={`${formId}-message`} className={`${labelClass} top-7 peer-focus:top-3 peer-[:not(:placeholder-shown)]:top-3`}>
              Kebutuhan / Pesan
            </label>
            {errors.message && <p className="mt-1.5 text-xs text-rose-500">{errors.message}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-[1.2rem] bg-[#0f2f78] px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_40px_-20px_rgba(15,23,42,0.42)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#184aa8] hover:shadow-[0_26px_54px_-30px_rgba(11,31,87,0.4)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <span className="relative z-10">{isSubmitting ? 'Mengirim...' : 'Kirim'}</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/16 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </button>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Kami akan menggunakan detail ini hanya untuk menindaklanjuti inquiry Anda secara relevan.
            </p>

            {submitResult && (
              <p className={`mt-3 text-sm font-medium ${submitResult.status === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}>
                {submitResult.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
