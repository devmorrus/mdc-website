import type { PortfolioProjectItem, PortfolioThumbnailTone } from '../../types/portfolio'

interface PortfolioGridSectionProps {
  items: PortfolioProjectItem[]
}

const THUMBNAIL_TONE_CLASSES: Record<PortfolioThumbnailTone, string> = {
  sky: 'from-sky-400/35 to-blue-900/50 border-sky-200/40',
  amber: 'from-amber-300/35 to-blue-900/50 border-amber-200/40',
  blue: 'from-blue-400/35 to-blue-900/50 border-blue-200/40',
}

export function PortfolioGridSection({ items }: PortfolioGridSectionProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-blue-200/20 bg-blue-900/20 p-5 shadow-[0_18px_45px_-35px_rgba(251,191,36,0.85)]"
          >
            <div
              className={`mb-4 flex h-36 items-center justify-center rounded-xl border bg-linear-to-br text-2xl font-semibold text-blue-50 ${THUMBNAIL_TONE_CLASSES[item.thumbnailTone]}`}
              aria-hidden="true"
            >
              {item.thumbnailLabel}
            </div>

            <h2 className="text-xl font-semibold text-blue-50">{item.name}</h2>

            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex gap-2 text-blue-100/80">
                <dt className="min-w-20 text-blue-200/90">Industri</dt>
                <dd>{item.industry}</dd>
              </div>
              <div className="flex gap-2 text-blue-100/80">
                <dt className="min-w-20 text-blue-200/90">Layanan</dt>
                <dd>{item.serviceType}</dd>
              </div>
            </dl>

            <p className="mt-4 text-sm leading-relaxed text-blue-100/80">{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
