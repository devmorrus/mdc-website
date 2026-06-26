import { useRef, type ReactNode } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { LegalDocumentItem } from '../../types/about'
import { LegalityCanvasOpt } from '../../three/OptimizedCanvases'

interface LegalitySectionProps {
  items: LegalDocumentItem[]
}

const DOC_ICONS: Record<string, ReactNode> = {
  'Akta Pendirian': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  NIB: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  NPWP: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
}

export function LegalitySection({ items }: LegalitySectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])

  const sectionRef = useGsapReveal<HTMLElement>({
    from: { y: 28, opacity: 0 },
    to: { duration: 0.75 },
    targets: () => [wrapperRef.current, ...cardsRef.current],
    threshold: 0.1,
  })

  return (
    <section
      ref={sectionRef}
      id="legality"
      className="relative overflow-hidden py-18 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#edf4ff_0%,#f7fbff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(24,74,168,0.08),transparent_22%),radial-gradient(circle_at_82%_84%,rgba(246,196,69,0.08),transparent_20%)]" />

      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <div
          ref={wrapperRef}
          className="relative overflow-hidden rounded-[2rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] shadow-[0_26px_60px_-40px_rgba(11,31,87,0.28)]"
        >
          <div className="absolute inset-0 opacity-28">
            <LegalityCanvasOpt />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(239,245,255,0.94))]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f6c445]/50 to-transparent" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-8 bg-[#f6c445]/60" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c49019]">
                    Legalitas & Trust
                  </p>
                </div>
                <h2 className="text-3xl font-extrabold leading-tight text-[#0b1f57] md:text-4xl" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Dokumen Legal{' '}
                  <span className="bg-gradient-to-r from-[#f6c445] to-[#fde68a] bg-clip-text text-transparent">
                    Perusahaan
                  </span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-slate-600 md:ml-auto md:text-right">
                Untuk menjaga transparansi dan kepercayaan kerja sama, kami melengkapi legalitas perusahaan sesuai ketentuan yang berlaku di Indonesia.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {items.map((item, i) => (
                <article
                  key={item.type}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el
                  }}
                  className="group relative overflow-hidden rounded-[1.6rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] p-6 shadow-[0_18px_44px_-36px_rgba(11,31,87,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#184aa8]/18"
                >
                  <div className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                    <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>

                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f6c445]/30 bg-[#fff2bf] text-[#c49019] transition-all duration-300 group-hover:scale-105">
                    {DOC_ICONS[item.type] ?? null}
                  </div>

                  <h3 className="mb-2 text-base font-bold text-[#0b1f57]" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {item.type}
                  </h3>

                  <p className="text-sm leading-7 text-slate-600">
                    {item.summary}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                      Terverifikasi
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#f6c445]/70 to-transparent transition-all duration-500 group-hover:w-full" />
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.6rem] border border-[#d7e3f7] bg-white/78 px-6 py-4 shadow-[0_18px_40px_-34px_rgba(11,31,87,0.18)] sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#f6c445]/25 bg-[#fff2bf] text-[#c49019]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <p className="text-sm leading-7 text-slate-600">
                  Butuh dokumen verifikasi lebih lanjut? Kami siap menyediakan salinannya.
                </p>
              </div>

              <a
                href="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#f6c445]/35 bg-[#fff2bf] px-5 py-2.5 text-sm font-semibold text-[#0b1f57] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffe89e]"
              >
                Hubungi Kami
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
