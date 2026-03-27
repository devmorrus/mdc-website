import type { LegalDocumentItem } from '../../types/about'

interface LegalitySectionProps {
  items: LegalDocumentItem[]
}

export function LegalitySection({ items }: LegalitySectionProps) {
  return (
    <section id="legality" className="mx-auto w-full max-w-6xl px-6 pb-16 pt-4 md:pb-20 md:pt-8">
      <div className="rounded-2xl border border-blue-200/20 bg-linear-to-r from-blue-900/35 via-blue-900/25 to-amber-400/15 p-7 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Legalitas & Trust</p>
        <h2 className="mt-3 text-3xl font-semibold text-blue-50 md:text-4xl">Dokumen Legal Perusahaan</h2>
        <p className="mt-3 text-sm leading-relaxed text-blue-100/80 md:text-base">
          Untuk menjaga transparansi dan kepercayaan kerja sama, kami melengkapi legalitas perusahaan sesuai ketentuan yang berlaku.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.type} className="rounded-xl border border-blue-200/20 bg-blue-900/30 p-4">
              <h3 className="text-base font-semibold text-amber-100">{item.type}</h3>
              <p className="mt-2 text-sm leading-relaxed text-blue-100/80">{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
