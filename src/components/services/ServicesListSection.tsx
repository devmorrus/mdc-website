import { Link } from 'react-router-dom'

import type { ServiceDetailItem } from '../../types/services'

interface ServicesListSectionProps {
  services: ServiceDetailItem[]
}

export function ServicesListSection({ services }: ServicesListSectionProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.id}
            className="rounded-2xl border border-blue-200/20 bg-blue-900/22 p-6 shadow-[0_15px_40px_-32px_rgba(251,191,36,0.8)]"
          >
            <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/70 bg-amber-300/15 text-xs font-bold text-amber-100">
              {service.icon}
            </div>

            <h2 className="text-2xl font-semibold text-blue-50">{service.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-blue-100/80 md:text-base">{service.description}</p>

            <ul className="mt-5 space-y-2 text-sm text-blue-50/90">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-300" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <Link
              to={service.ctaHref}
              className="mt-6 inline-flex rounded-lg border border-blue-200/40 px-4 py-2 text-sm font-semibold text-blue-100 transition hover:border-amber-300/80 hover:text-amber-100"
            >
              {service.ctaLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
