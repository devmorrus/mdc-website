import type { ReactNode } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { LegalDocumentItem } from '../../types/about'

interface LegalitySectionProps {
  items: LegalDocumentItem[]
}

const DOC_LABELS: Record<LegalDocumentItem['type'], string> = {
  'Akta Pendirian': 'Akta Pendirian',
  NIB: 'NIB (OSS)',
  NPWP: 'NPWP Perusahaan',
}

const DOC_ICONS: Record<LegalDocumentItem['type'], ReactNode> = {
  'Akta Pendirian': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  NIB: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  NPWP: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
}

export function LegalitySection({ items }: LegalitySectionProps) {
  const sectionRef = useGsapReveal<HTMLElement>({
    from: { y: 28, opacity: 0 },
    to: { duration: 0.75 },
    threshold: 0.1,
  })

  return (
    <section ref={sectionRef} id="legality" className="relative overflow-hidden bg-white py-20 lg:py-32">
      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-slate-900 p-1 shadow-2xl">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-slate-900 px-6 py-12 lg:p-16">
            <div className="pointer-events-none absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl" />

            <div className="relative z-10 mb-12 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-xl">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-amber-400">Legalitas & Kepercayaan</p>
                <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Dokumen Legal Perusahaan Terverifikasi
                </h2>
                <p className="text-slate-300">
                  Untuk menjaga transparansi, keamanan, dan profesionalisme kerja sama, kami beroperasi dengan entitas legal resmi yang tercatat dan mematuhi peraturan hukum di Indonesia.
                </p>
              </div>

              <div className="hidden lg:flex">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <svg className="h-10 w-10 text-[#184aa8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative z-10 grid gap-6 md:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item.type}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-amber-400">
                      {DOC_ICONS[item.type]}
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Valid
                    </span>
                  </div>

                  <h3 className="mb-2 font-heading text-lg font-semibold text-white">{DOC_LABELS[item.type]}</h3>
                  <p className="text-sm leading-7 text-slate-400">{item.summary}</p>
                </article>
              ))}
            </div>

            <div className="relative z-10 mt-12 flex flex-col items-start justify-between gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 px-6 py-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-amber-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-sm leading-7 text-slate-300">Butuh dokumen verifikasi lebih lanjut? Kami siap menyediakan salinannya.</p>
              </div>

              <a
                href="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#f6c445]/35 bg-[#fff2bf] px-5 py-2.5 text-sm font-semibold text-[#0f172a] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffe89e]"
              >
                Hubungi Tim Kami
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
