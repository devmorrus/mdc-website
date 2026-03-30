import { useState, type FormEvent } from 'react'

interface ContactLeadFormProps {
  whatsappNumber: string
}

interface ContactFormState {
  name: string
  email: string
  message: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INITIAL_FORM_STATE: ContactFormState = {
  name: '',
  email: '',
  message: '',
}

export function ContactLeadForm({ whatsappNumber }: ContactLeadFormProps) {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM_STATE)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({})

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof ContactFormState, string>> = {}

    if (!form.name.trim()) {
      nextErrors.name = 'Nama wajib diisi.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email wajib diisi.'
    } else if (!EMAIL_REGEX.test(form.email)) {
      nextErrors.email = 'Format email belum valid.'
    }

    if (!form.message.trim()) {
      nextErrors.message = 'Pesan wajib diisi.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    const cleanNumber = whatsappNumber.replace(/\D/g, '')
    const whatsappMessage = encodeURIComponent(
      `Halo Morrus Digital Connecting,%0A%0ANama: ${form.name}%0AEmail: ${form.email}%0APesan: ${form.message}`,
    )

    window.open(`https://wa.me/${cleanNumber}?text=${whatsappMessage}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={submitForm} noValidate className="space-y-4 rounded-xl border border-blue-200/20 bg-blue-950/35 p-5">
      <div>
        <label htmlFor="lead-name" className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-blue-100/90">
          Nama
        </label>
        <input
          id="lead-name"
          type="text"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          className="w-full rounded-lg border border-blue-200/30 bg-blue-900/30 px-3 py-2 text-sm text-blue-50 outline-none transition focus:border-amber-300/70"
          placeholder="Nama Anda"
        />
        {errors.name && <p className="mt-1 text-xs text-amber-200">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="lead-email" className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-blue-100/90">
          Email
        </label>
        <input
          id="lead-email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          className="w-full rounded-lg border border-blue-200/30 bg-blue-900/30 px-3 py-2 text-sm text-blue-50 outline-none transition focus:border-amber-300/70"
          placeholder="email@perusahaan.com"
        />
        {errors.email && <p className="mt-1 text-xs text-amber-200">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="lead-message" className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-blue-100/90">
          Kebutuhan
        </label>
        <textarea
          id="lead-message"
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          rows={4}
          className="w-full resize-none rounded-lg border border-blue-200/30 bg-blue-900/30 px-3 py-2 text-sm text-blue-50 outline-none transition focus:border-amber-300/70"
          placeholder="Ceritakan kebutuhan website Anda"
        />
        {errors.message && <p className="mt-1 text-xs text-amber-200">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex rounded-lg bg-amber-300 px-4 py-2 text-sm font-semibold text-blue-950 transition hover:bg-amber-200"
      >
        Kirim via WhatsApp
      </button>
    </form>
  )
}
