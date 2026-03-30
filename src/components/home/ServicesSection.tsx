import type { ServiceItem } from '../../types/home'

interface ServicesSectionProps {
  items: ServiceItem[]
}

export function ServicesSection({ items }: ServicesSectionProps) {
  return (
    <section id="services" className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
      <div className="mb-10 max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Services</p>
        <h2 className="text-3xl font-semibold text-blue-50 md:text-4xl">Layanan Utama Untuk Mendukung Pertumbuhan Bisnis</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-blue-200/20 bg-blue-900/20 p-6 shadow-[0_15px_45px_-35px_rgba(251,191,36,0.9)]">
            <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/70 bg-amber-300/20 text-xs font-bold text-amber-100">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-blue-50">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-blue-100/80">{item.description}</p>
            <ul className="mt-5 space-y-2 text-sm text-blue-50/90">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
