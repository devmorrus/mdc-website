import type { ServiceItem } from '../../types/home'

interface ServicesSectionProps {
  items: ServiceItem[]
}

export function ServicesSection({ items }: ServicesSectionProps) {
  return (
    <section id="services" className="mx-auto w-full max-w-6xl px-6 py-14 md:py-18">
      <div className="mb-10 max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Services</p>
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Designed for Now, Structured for Future APIs</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-200">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
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
