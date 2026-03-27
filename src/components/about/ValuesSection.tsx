import type { CompanyValueItem } from '../../types/about'

interface ValuesSectionProps {
  values: CompanyValueItem[]
}

export function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section id="company-values" className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
      <div className="mb-8 max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Nilai Perusahaan</p>
        <h2 className="text-3xl font-semibold text-blue-50 md:text-4xl">Prinsip Kerja yang Menjadi Fondasi Tim Kami</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {values.map((item, index) => (
          <article key={item.id} className="rounded-2xl border border-blue-200/20 bg-blue-900/20 p-6">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/70 bg-amber-300/20 text-xs font-semibold text-amber-100">
              {(index + 1).toString().padStart(2, '0')}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-blue-50">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-blue-100/80">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
