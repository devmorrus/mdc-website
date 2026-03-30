import type { PortfolioHeroContent } from '../../types/portfolio'

interface PortfolioHeroSectionProps {
  content: PortfolioHeroContent
}

export function PortfolioHeroSection({ content }: PortfolioHeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-blue-900/30">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <p className="inline-flex rounded-full border border-amber-300/60 bg-amber-200/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
          {content.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-blue-50 md:text-5xl">
          {content.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-blue-100/80 md:text-lg">
          {content.description}
        </p>
      </div>
    </section>
  )
}
