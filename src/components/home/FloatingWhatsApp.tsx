interface FloatingWhatsAppProps {
  whatsappLink: string
}

export function FloatingWhatsApp({ whatsappLink }: FloatingWhatsAppProps) {
  return (
    <a
      id="whatsapp"
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Hubungi kami via WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-amber-300 px-4 py-3 text-sm font-semibold text-blue-950 shadow-[0_18px_45px_-20px_rgba(251,191,36,0.95)] transition hover:-translate-y-0.5 hover:bg-amber-200"
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-900 text-amber-200">WA</span>
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  )
}
