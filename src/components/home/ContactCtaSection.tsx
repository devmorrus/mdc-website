import { Link } from 'react-router-dom'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { ContactCtaContent } from '../../types/home'

interface ContactCtaSectionProps {
  content: ContactCtaContent
  whatsappLink: string
}

export function ContactCtaSection({ content, whatsappLink }: ContactCtaSectionProps) {
  const sectionRef = useGsapReveal<HTMLElement>()
  const secondaryHref = content.secondaryCtaHref === '#whatsapp'
    ? whatsappLink
    : content.secondaryCtaHref
  const isSecondaryExternal = secondaryHref.startsWith('http')

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden bg-[linear-gradient(180deg,#edf3ff_0%,#f5f9ff_100%)] pb-18 pt-8 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(246,196,69,0.08),transparent_18%),radial-gradient(circle_at_84%_76%,rgba(24,74,168,0.07),transparent_18%)]" />
      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-[#0b1f57] via-[#0f2f78] to-[#123a93] px-6 py-8 text-white shadow-[0_30px_90px_-40px_rgba(11,31,87,0.65)] md:px-10 md:py-10">
          <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-[#f6c445]/20 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#f6c445]">
                {content.eyebrow}
              </p>
              <h2
                className="mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-4xl"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {content.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                {content.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={content.primaryCtaHref}
                  className="inline-flex items-center justify-center rounded-full bg-[#f6c445] px-6 py-3.5 text-sm font-semibold text-[#0b1f57] transition hover:bg-[#ffd15c]"
                >
                  {content.primaryCtaLabel}
                </Link>

                {isSecondaryExternal ? (
                  <a
                    href={secondaryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-[#f6c445]/55 hover:bg-white/6 hover:text-[#f6c445]"
                  >
                    {content.secondaryCtaLabel}
                  </a>
                ) : (
                  <Link
                    to={secondaryHref}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-[#f6c445]/55 hover:bg-white/6 hover:text-[#f6c445]"
                  >
                    {content.secondaryCtaLabel}
                  </Link>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {content.bulletPoints.map((point, index) => (
                <article
                  key={point}
                  className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-base font-semibold leading-7 text-white">
                    {point}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
