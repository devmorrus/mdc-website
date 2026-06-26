import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useHomeHeroAnimation } from '../../animations/useHomeHeroAnimation'
import { useHeroThreeCanvas } from '../../hooks/useHeroThreeCanvas'
import type { ContactHeroContent } from '../../types/contact'
import { ContactHeroCanvasOpt } from '../../three/OptimizedCanvases'

interface ContactHeroSectionProps {
  content: ContactHeroContent
}

const CONTACT_PILLS = ['Email cepat', 'WhatsApp', 'Brief awal', 'Follow-up']

export function ContactHeroSection({ content }: ContactHeroSectionProps) {
  const scopeRef = useRef<HTMLDivElement>(null)
  const backgroundCanvasRef = useHeroThreeCanvas()

  useHomeHeroAnimation({ scope: scopeRef })

  return (
    <div ref={scopeRef} className="relative">
      <section className="hero-section relative -mt-px overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, #030b1a 0%, #050f26 35%, #071640 60%, #0a1f54 100%)',
          }}
        />

        <canvas
          ref={backgroundCanvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ opacity: 0.88 }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 68% 58% at 50% 50%, transparent 18%, rgba(3,11,26,0.34) 64%, rgba(3,11,26,0.82) 100%)',
          }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4"
          style={{
            background: 'radial-gradient(circle, rgba(246,196,69,0.10) 0%, transparent 70%)',
            filter: 'blur(44px)',
          }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute left-0 top-0 h-[360px] w-[360px] -translate-x-1/4 -translate-y-1/4"
          style={{
            background: 'radial-gradient(circle, rgba(56,189,248,0.09) 0%, transparent 70%)',
            filter: 'blur(48px)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex min-h-[92vh] w-full max-w-7xl items-center px-6 pb-24 pt-28 text-white md:pb-28 md:pt-32">
          <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="order-1 flex w-full flex-col items-center text-center lg:order-1 lg:col-span-7 lg:items-start lg:text-left">
              <p
                data-hero-animate
                className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.07] px-5 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-blue-100/80 backdrop-blur-sm"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_2px_rgba(56,189,248,0.7)]" />
                {content.eyebrow}
              </p>

              <h1
                data-hero-animate
                className="mt-8 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.35rem] lg:leading-[1.08]"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                <span className="block">
                  <span className="bg-gradient-to-r from-[#facc15] via-[#fde68a] to-[#f6c445] bg-clip-text text-transparent">
                    Mari Diskusikan
                  </span>
                </span>
                <span className="mt-2 block text-white/94">
                  Kebutuhan digital bisnis Anda.
                </span>
              </h1>

              <p
                data-hero-animate
                className="mt-7 max-w-2xl text-base leading-7 text-blue-100/72 sm:text-lg"
              >
                Hubungi tim Morrus Digital Connecting untuk konsultasi website company profile,
                aplikasi custom, dashboard, dan dukungan teknis yang lebih terarah.
              </p>

              <div
                data-hero-animate
                className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row lg:justify-start"
              >
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#facc15] px-8 py-3.5 text-sm font-bold text-[#0b1f57] shadow-[0_0_32px_rgba(250,204,21,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#fde047] hover:shadow-[0_0_48px_rgba(250,204,21,0.42)] sm:w-auto"
                >
                  Kirim Inquiry
                </Link>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/18 bg-white/[0.07] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.13] sm:w-auto"
                >
                  WhatsApp Sekarang
                </a>
              </div>

              <div data-hero-animate className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                {CONTACT_PILLS.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-blue-50/80 backdrop-blur-sm"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="order-2 relative flex h-[340px] w-full items-center justify-center select-none sm:h-[400px] lg:col-span-5 lg:h-[480px]">
              <div
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 via-cyan-500/8 to-yellow-400/0 blur-3xl"
                aria-hidden="true"
              />
              <ContactHeroCanvasOpt />

              <div className="absolute right-2 top-6 rounded-2xl border border-blue-200/12 bg-[#0b1f57]/82 px-5 py-4 shadow-[0_20px_50px_-24px_rgba(11,31,87,0.65)] backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300/65">Respons</p>
                <p className="mt-1 text-3xl font-extrabold text-[#facc15]" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Cepat
                </p>
              </div>

              <div className="absolute -bottom-2 left-2 rounded-2xl border border-blue-200/12 bg-[#0b1f57]/82 px-5 py-4 shadow-[0_20px_50px_-24px_rgba(11,31,87,0.65)] backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300/65">Fokus</p>
                <p className="mt-1 text-3xl font-extrabold text-[#facc15]" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Solusi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
