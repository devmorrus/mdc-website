import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface FloatingWhatsAppProps {
  whatsappLink: string
}

export function FloatingWhatsApp({ whatsappLink }: FloatingWhatsAppProps) {
  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !btnRef.current) return

    // Gentle entrance
    gsap.fromTo(
      btnRef.current,
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)', delay: 1.2 },
    )

    // Subtle attention pulse after entrance
    const tl = gsap.timeline({ delay: 2.5 })
    tl.to(btnRef.current, { scale: 1.06, duration: 0.3, ease: 'power2.inOut' })
      .to(btnRef.current, { scale: 1, duration: 0.3, ease: 'power2.inOut' })
      .to(btnRef.current, { scale: 1.06, duration: 0.3, ease: 'power2.inOut', delay: 0.3 })
      .to(btnRef.current, { scale: 1, duration: 0.3, ease: 'power2.inOut' })
  }, [])

  return (
    <a
      id="whatsapp"
      ref={btnRef}
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Hubungi kami via WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 rounded-full bg-[#0b1f57] px-5 py-3.5 text-sm font-bold text-white shadow-[0_18px_50px_-18px_rgba(11,31,87,0.45)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0f2f78]"
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f6c445] text-xs font-black text-[#0b1f57]">
        WA
        <span className="absolute inset-0 rounded-full bg-[#f6c445]/35 animate-ping" />
      </span>
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  )
}
