import { Link } from 'react-router-dom'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { AboutSnippetContent } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface AboutSectionProps {
  content: AboutSnippetContent
}

export function AboutSection({ content }: AboutSectionProps) {
  const sectionRef = useGsapReveal<HTMLElement>()

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] py-18 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(246,196,69,0.08),transparent_18%),radial-gradient(circle_at_86%_32%,rgba(24,74,168,0.08),transparent_22%)]" />
      <div className="mx-auto relative z-10 grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.summary}
          />

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            {content.description}
          </p>

          <Link
            to={content.buttonHref}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0f2f78] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#184aa8]"
          >
            {content.buttonLabel}
          </Link>
        </div>

        <div className="grid gap-4">
          <article className="rounded-[2rem] border border-blue-900/10 bg-gradient-to-br from-[#0b1f57] via-[#0f2f78] to-[#184aa8] p-7 shadow-[0_24px_60px_-34px_rgba(11,31,87,0.55)]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f6c445]">
              Company snapshot
            </p>
            <p
              className="mt-4 text-2xl font-bold leading-snug text-white"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Website yang rapi membantu perusahaan tampil lebih siap, lebih jelas, dan lebih dipercaya.
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {content.valuePoints.map((point, index) => (
              <article
                key={point}
                className="rounded-[1.75rem] border border-blue-100 bg-white p-5 shadow-[0_18px_50px_-38px_rgba(11,31,87,0.2)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff2bf] text-sm font-semibold text-[#0b1f57]">
                    0{index + 1}
                  </span>
                  <h3 className="text-base font-semibold leading-7 text-[#0b1f57]">
                    {point}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
