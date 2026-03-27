import type { AboutSnippetContent } from '../../types/home'

interface AboutSectionProps {
  content: AboutSnippetContent
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
      <div className="grid gap-8 rounded-2xl border border-blue-200/20 bg-linear-to-br from-blue-900/40 via-blue-950/40 to-amber-400/15 p-7 md:grid-cols-2 md:gap-12 md:p-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">About</p>
          <h2 className="text-3xl font-semibold text-blue-50 md:text-4xl">{content.title}</h2>
          <p className="text-sm leading-relaxed text-blue-100/80 md:text-base">{content.summary}</p>
          <a
            href={content.buttonHref}
            className="inline-flex rounded-lg border border-amber-300/70 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/15"
          >
            {content.buttonLabel}
          </a>
        </div>

        <ul className="space-y-3">
          {content.valuePoints.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 rounded-xl border border-blue-200/20 bg-blue-900/30 px-4 py-3 text-sm text-blue-50/90"
            >
              <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
