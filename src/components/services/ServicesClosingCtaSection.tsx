import { Link } from 'react-router-dom'

import type { ServicesClosingCtaContent } from '../../types/services'

interface ServicesClosingCtaSectionProps {
  content: ServicesClosingCtaContent
}

export function ServicesClosingCtaSection({ content }: ServicesClosingCtaSectionProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-4 md:pb-20 md:pt-8">
      <div className="rounded-2xl border border-amber-200/30 bg-linear-to-r from-blue-900/60 via-blue-900/50 to-amber-400/20 p-7 md:p-10">
        <h2 className="max-w-3xl text-3xl font-semibold text-blue-50 md:text-4xl">{content.title}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-blue-100/80 md:text-base">
          {content.description}
        </p>

        <Link
          to={content.buttonHref}
          className="mt-6 inline-flex rounded-lg bg-amber-300 px-5 py-3 text-sm font-semibold text-blue-950 transition hover:bg-amber-200"
        >
          {content.buttonLabel}
        </Link>
      </div>
    </section>
  )
}
