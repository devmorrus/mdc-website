import { useEffect, useRef, useState, type FormEvent } from 'react'
import gsap from 'gsap'
import { createWhatsAppLink } from '../../utils/createWhatsAppLink'

const WHATSAPP_TARGET_NUMBER = '6281229999752'

interface WhatsAppFormState {
  name: string
  phone: string
  message: string
}

const INITIAL_FORM: WhatsAppFormState = {
  name: '',
  phone: '',
  message: '',
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M19.11 17.23c-.27-.14-1.6-.79-1.84-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.31.21-.58.07-.27-.14-1.12-.41-2.14-1.31-.79-.7-1.33-1.56-1.49-1.82-.16-.27-.02-.41.12-.55.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.61-1.47-.84-2.02-.22-.53-.44-.46-.61-.47l-.52-.01c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.97 2.64 1.11 2.82c.14.18 1.91 2.92 4.62 4.09.64.28 1.15.45 1.54.57.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.82-1.27.22-.61.22-1.14.16-1.27-.07-.13-.25-.2-.52-.34z" />
      <path d="M16.01 3.2c-7.06 0-12.79 5.72-12.79 12.78 0 2.25.58 4.44 1.69 6.37L3 29l6.84-1.79a12.75 12.75 0 0 0 6.16 1.57h.01c7.05 0 12.79-5.73 12.79-12.79A12.78 12.78 0 0 0 16.01 3.2zm0 23.44h-.01c-1.91 0-3.78-.51-5.42-1.47l-.39-.23-4.06 1.06 1.08-3.96-.25-.41a10.61 10.61 0 0 1-1.63-5.65c0-5.88 4.79-10.67 10.68-10.67 2.85 0 5.53 1.11 7.54 3.12a10.58 10.58 0 0 1 3.12 7.55c0 5.89-4.79 10.67-10.66 10.67z" />
    </svg>
  )
}

export function FloatingWhatsApp() {
  const shellRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState<WhatsAppFormState>(INITIAL_FORM)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !shellRef.current) return

    gsap.fromTo(
      shellRef.current,
      { y: 20, opacity: 0, scale: 0.92 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', delay: 1.2 },
    )
  }, [])

  useEffect(() => {
    if (!isOpen || !popupRef.current) return

    const firstField = popupRef.current.querySelector<HTMLInputElement>('input')
    firstField?.focus()
  }, [isOpen])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node

      if (
        isOpen &&
        popupRef.current &&
        !popupRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleFieldChange = (field: keyof WhatsAppFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const templateMessage = [
      'Halo Morrus Digital Connecting,',
      '',
      `Nama: ${form.name}`,
      `Nomor yang bisa dihubungi: ${form.phone}`,
      `Pesan: ${form.message}`,
    ].join('\n')

    const whatsappUrl = createWhatsAppLink(WHATSAPP_TARGET_NUMBER, templateMessage)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
    setForm(INITIAL_FORM)
  }

  return (
    <div ref={shellRef} className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div
        ref={popupRef}
        id="whatsapp-popup"
        className={`w-[min(22rem,calc(100vw-2rem))] origin-bottom-right rounded-[1.8rem] border border-[#25d366]/20 bg-white p-5 shadow-[0_24px_80px_-26px_rgba(11,31,87,0.38)] transition-all duration-300 ${
          isOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#25d366] text-white shadow-[0_12px_28px_-12px_rgba(37,211,102,0.75)]">
            <WhatsAppIcon />
          </span>
          <div>
            <p className="text-base font-bold text-[#0b1f57]">Mulai Chat WhatsApp</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Isi data singkat di bawah ini, lalu kami buatkan template pesan otomatis.
            </p>
          </div>
        </div>

        <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Nama
            </span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => handleFieldChange('name', event.target.value)}
              required
              placeholder="Nama lengkap"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#25d366] focus:bg-white"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Nomor Yang Bisa Dihubungi
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => handleFieldChange('phone', event.target.value)}
              required
              placeholder="08xxxxxxxxxx"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#25d366] focus:bg-white"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Pesan
            </span>
            <textarea
              value={form.message}
              onChange={(event) => handleFieldChange('message', event.target.value)}
              required
              rows={4}
              placeholder="Ceritakan kebutuhan Anda..."
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#25d366] focus:bg-white"
            />
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_36px_-18px_rgba(37,211,102,0.75)] transition hover:-translate-y-0.5 hover:bg-[#20bd5a]"
          >
            <WhatsAppIcon />
            Kirim ke WhatsApp
          </button>
        </form>
      </div>

      <button
        id="whatsapp"
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="whatsapp-popup"
        aria-label="Buka formulir WhatsApp"
        onClick={() => setIsOpen((current) => !current)}
        className="pointer-events-auto inline-flex items-center gap-3 rounded-full bg-[#25d366] px-4 py-3 text-sm font-bold text-white shadow-[0_20px_55px_-18px_rgba(37,211,102,0.7)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bd5a]"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#25d366] shadow-[0_8px_22px_-10px_rgba(255,255,255,0.95)]">
          <WhatsAppIcon />
        </span>
        <span className="hidden sm:inline">Chat WhatsApp</span>
      </button>
    </div>
  )
}
