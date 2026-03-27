import type { PortfolioItem } from '../../types/home'

interface PortfolioPreviewSectionProps {
  items: PortfolioItem[]
}

export function PortfolioPreviewSection({ items }: PortfolioPreviewSectionProps) {
  return (
    <section id="portfolio" className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
      <div className="mb-10 max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Portfolio Preview</p>
        <h2 className="text-3xl font-semibold text-blue-50 md:text-4xl">Project Pilihan yang Telah Kami Kerjakan</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.id}
            className="group rounded-2xl border border-blue-200/20 bg-blue-900/25 p-6 transition hover:-translate-y-0.5 hover:border-amber-200/60 hover:bg-blue-900/45"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-100/90">{item.category}</p>
            <h3 className="mt-3 text-xl font-semibold text-blue-50">{item.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-blue-100/80">{item.summary}</p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <a
          href="#portfolio-all"
          className="inline-flex rounded-lg border border-blue-200/40 px-5 py-3 text-sm font-semibold text-blue-100 transition hover:border-amber-300/80 hover:text-amber-100"
        >
          Lihat Semua Portfolio
        </a>
      </div>
    </section>
  )
}
