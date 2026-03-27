import type { AboutHeroContent } from '../../types/about'

interface AboutHeroSectionProps {
  content: AboutHeroContent
}

export function AboutHeroSection({ content }: AboutHeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-blue-900/30">
      <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-sky-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-14 bottom-0 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <p className="inline-flex rounded-full border border-amber-300/60 bg-amber-200/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
          {content.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-blue-50 md:text-5xl">{content.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-blue-100/85 md:text-lg">{content.description}</p>
      </div>
    </section>
  )
}
