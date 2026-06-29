import { Link } from 'react-router-dom'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { PortfolioProjectItem } from '../../types/portfolio'

interface PortfolioDetailSectionProps {
  project: PortfolioProjectItem
}

const PROJECT_META = [
  { key: 'Client', field: 'client' as const },
  { key: 'Industry', field: 'industry' as const },
  { key: 'Service', field: 'serviceType' as const },
  { key: 'Year', field: 'year' as const },
]

export function PortfolioDetailSection({ project }: PortfolioDetailSectionProps) {
  const sectionRef = useGsapReveal<HTMLElement>({
    from: { y: 28, opacity: 0 },
    to: { duration: 0.75 },
    threshold: 0.08,
  })

  const coverImage = project.gallery[0]

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdfa_0%,#f8fbff_100%)] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_24%,rgba(24,74,168,0.08),transparent_20%),radial-gradient(circle_at_12%_76%,rgba(246,196,69,0.08),transparent_18%)]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="mb-10 flex flex-wrap items-center gap-3 text-sm">
          <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-[#0f172a] shadow-sm transition hover:border-[#184aa8]/20 hover:text-[#184aa8]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Portfolio
          </Link>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 font-semibold text-amber-700">
            {project.category}
          </span>
          <span className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 font-semibold text-sky-700">
            {project.serviceType}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#c49019]">
              Portfolio Detail
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#0f172a] md:text-5xl" style={{ fontFamily: "'Sora', sans-serif" }}>
              {project.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {project.summary}
            </p>

            <div className="mt-8 rounded-[1.75rem] border border-[#d7e3f7] bg-white p-6 shadow-[0_18px_44px_-36px_rgba(11,31,87,0.22)]">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#184aa8]">Objective</p>
              <p className="mt-3 text-base leading-8 text-slate-600">
                {project.objective}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-[#d7e3f7] bg-white shadow-[0_26px_60px_-40px_rgba(11,31,87,0.28)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(246,196,69,0.12),transparent_26%),radial-gradient(circle_at_85%_85%,rgba(24,74,168,0.12),transparent_24%)]" />
            <div className="relative z-10 p-4 sm:p-6">
              <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50">
                <div className="flex aspect-[4/3] items-center justify-center bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] p-8">
                  <img
                    src={coverImage.src}
                    alt={coverImage.alt}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Client</p>
                  <p className="mt-2 font-semibold text-[#0f172a]">{project.client}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Year</p>
                  <p className="mt-2 font-semibold text-[#0f172a]">{project.year}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PROJECT_META.map((meta) => (
            <article
              key={meta.key}
              className="rounded-[1.5rem] border border-[#d7e3f7] bg-white p-5 shadow-[0_18px_44px_-36px_rgba(11,31,87,0.22)]"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c49019]">
                {meta.key}
              </p>
              <p className="mt-3 text-base font-semibold text-[#0f172a]">
                {project[meta.field]}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            {[
              { title: 'Challenge', text: project.challenge },
              { title: 'Objective', text: project.objective },
              { title: 'Solution / Process', text: project.solution },
              { title: 'Result / Outcome', text: project.outcome },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-[#d7e3f7] bg-white p-6 shadow-[0_18px_44px_-36px_rgba(11,31,87,0.22)]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#184aa8]">
                  {item.title}
                </p>
                <p className="mt-3 text-base leading-8 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="rounded-[1.75rem] border border-[#d7e3f7] bg-white p-6 shadow-[0_18px_44px_-36px_rgba(11,31,87,0.22)]">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c49019]">
                Deliverables
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.deliverables.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#d7e3f7] bg-white p-6 shadow-[0_18px_44px_-36px_rgba(11,31,87,0.22)]">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c49019]">
                Technologies
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-[#0f172a] px-3 py-1.5 text-sm font-medium text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#0f172a_0%,#111c35_100%)] p-6 text-white shadow-[0_22px_54px_-38px_rgba(11,31,87,0.45)]">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">
                Ready for discussion?
              </p>
              <p className="mt-3 text-base leading-8 text-slate-300">
                Ceritakan project serupa yang ingin Anda bangun, lalu kami bantu susun scope dan roadmap yang tepat.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#facc15] px-5 py-3 text-sm font-bold text-[#0b1f57] transition hover:bg-[#fde047]"
                >
                  Konsultasi Sekarang
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Lihat Portfolio
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-[#f6c445]" />
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#c49019]">
              Gallery
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {project.gallery.map((image, index) => {
              const largeCard = index === 0

              return (
                <figure
                  key={image.alt}
                  className={`overflow-hidden rounded-[2rem] border border-[#d7e3f7] bg-white shadow-[0_18px_44px_-36px_rgba(11,31,87,0.22)] ${
                    largeCard ? 'lg:col-span-2 lg:row-span-2' : ''
                  }`}
                >
                  <div className={`flex items-center justify-center bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] ${largeCard ? 'aspect-[16/10] lg:aspect-[16/11]' : 'aspect-[16/10]'}`}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-contain p-6"
                    />
                  </div>
                  <figcaption className="border-t border-slate-200 bg-white px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#184aa8]">
                      {image.caption}
                    </p>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
