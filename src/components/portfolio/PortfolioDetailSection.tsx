import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import type { PortfolioProjectItem } from '../../types/portfolio'

interface PortfolioDetailSectionProps {
  project: PortfolioProjectItem
}

const STORY_SECTIONS = [
  {
    key: 'challenge',
    number: '01',
    label: 'Tantangan',
    title: 'Fondasi project perlu diterjemahkan lebih meyakinkan',
  },
  {
    key: 'objective',
    number: '02',
    label: 'Tujuan',
    title: 'Pengalaman yang jelas dari eksplorasi ke aksi',
  },
  {
    key: 'solution',
    number: '03',
    label: 'Solusi',
    title: 'Struktur halaman dan alur kami susun bertahap',
  },
  {
    key: 'outcome',
    number: '04',
    label: 'Hasil',
    title: 'Hasil akhir yang lebih rapi dan mudah dijalankan',
  },
] as const

function OverviewIcon({ kind }: { kind: 'client' | 'industry' | 'service' | 'year' }) {
  if (kind === 'client') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
        <path d="M4 20a8 8 0 0116 0" />
      </svg>
    )
  }

  if (kind === 'industry') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M4 19h16" />
        <path d="M6 19V9l6-4 6 4v10" />
        <path d="M10 19v-4h4v4" />
      </svg>
    )
  }

  if (kind === 'service') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    )
  }

  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 8v4l2.5 2.5" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  )
}

export function PortfolioDetailSection({ project }: PortfolioDetailSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = Array.from(sectionRef.current.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (prefersReducedMotion) {
      targets.forEach((target) => gsap.set(target, { autoAlpha: 1, y: 0 }))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          gsap.fromTo(
            entry.target,
            { y: 28, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.75, ease: 'power3.out' },
          )

          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  const mainPreview = project.gallery[0]
  const secondaryPreview = project.gallery[1] ?? project.gallery[0]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdfa_0%,#f8fbff_100%)] py-20 text-[#48597e] md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(246,196,69,0.11),transparent_18%),radial-gradient(circle_at_84%_16%,rgba(24,74,168,0.08),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.88),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#184aa8 1px, transparent 1px), linear-gradient(90deg, #184aa8 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div data-reveal className="flex flex-wrap items-center gap-3">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-[#d7e3f7] bg-white/82 px-4 py-2.5 text-[0.85rem] font-semibold text-[#16336f] shadow-[0_14px_34px_-30px_rgba(11,31,87,0.18)] transition hover:-translate-x-0.5 hover:border-[#c7d4ff] hover:bg-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Portfolio
          </Link>

          <span className="rounded-full border border-[#f6c445]/35 bg-[#fff2bf] px-4 py-2 text-[0.8rem] font-semibold text-[#c49019] shadow-[0_12px_30px_-28px_rgba(246,196,69,0.7)]">
            {project.category}
          </span>

          <span className="rounded-full border border-[#c7d4ff] bg-[#eef3ff] px-4 py-2 text-[0.8rem] font-semibold text-[#184aa8]">
            {project.serviceType}
          </span>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div data-reveal className="rounded-[2rem] border border-[#d7e3f7] bg-white/82 p-8 shadow-[0_26px_60px_-42px_rgba(11,31,87,0.24)] md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#c49019]">Portfolio Detail</p>
            <h1 className="mt-5 max-w-[30rem] text-4xl font-bold leading-[1.08] tracking-tight text-[#0b1f57] md:text-5xl" style={{ fontFamily: "'Sora', sans-serif" }}>
              {project.name}
            </h1>
            <p className="mt-6 max-w-[34rem] text-base leading-8 text-[#5b6d93] md:text-[1.05rem]">
              {project.summary}
            </p>

            <div className="mt-8 rounded-[1.7rem] border border-[#dbe7ff] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_100%)] p-6 shadow-[0_18px_40px_-34px_rgba(11,31,87,0.16)]">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#184aa8]">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M12 6v6l4 2" />
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                </span>
                <div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-[#8aa0cc]">Objective</p>
                  <p className="mt-1 text-lg font-bold text-[#0b1f57]">Fokus pengalaman yang jelas dan mudah ditindaklanjuti</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#5b6d93] md:text-[0.98rem]">
                {project.objective}
              </p>
            </div>
          </div>

          <div data-reveal className="space-y-5">
            <div className="overflow-hidden rounded-[2rem] border border-[#d7e3f7] bg-white p-4 shadow-[0_26px_60px_-42px_rgba(11,31,87,0.24)]">
              <div className="rounded-[1.7rem] bg-[linear-gradient(135deg,#dbe7ff,#fff2bf)] p-3">
                <img
                  src={mainPreview.src}
                  alt={mainPreview.alt}
                  className="aspect-[16/10] w-full rounded-[1.35rem] border border-white/80 object-cover object-top shadow-[0_22px_50px_-38px_rgba(11,31,87,0.18)]"
                />
              </div>
              <p className="mt-4 px-2 text-sm font-medium leading-7 text-[#5b6d93]">
                {mainPreview.caption}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[1.7rem] border border-[#d7e3f7] bg-white/84 p-6 shadow-[0_18px_44px_-36px_rgba(11,31,87,0.18)]">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#c49019]">Client</p>
                <p className="mt-3 text-[1.15rem] font-bold leading-snug text-[#0b1f57]">{project.client}</p>
              </div>
              <div className="rounded-[1.7rem] border border-[#d7e3f7] bg-white/84 p-6 shadow-[0_18px_44px_-36px_rgba(11,31,87,0.18)]">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#c49019]">Tahun</p>
                <p className="mt-3 text-[1.15rem] font-bold leading-snug text-[#0b1f57]">{project.year}</p>
              </div>
            </div>
          </div>
        </div>

        <div data-reveal className="mt-8 grid gap-5 lg:grid-cols-4">
          {[
            { label: 'Client', value: project.client, kind: 'client' as const },
            { label: 'Industri', value: project.industry, kind: 'industry' as const },
            { label: 'Layanan', value: project.serviceType, kind: 'service' as const },
            { label: 'Tahun', value: project.year, kind: 'year' as const },
          ].map((item, index) => (
            <div
              key={item.label}
              className="group rounded-[1.7rem] border border-[#d7e3f7] bg-white/84 p-6 shadow-[0_18px_44px_-36px_rgba(11,31,87,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_54px_-30px_rgba(11,31,87,0.16)]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#dbe7ff] bg-[#f7faff] text-[#184aa8]">
                  <OverviewIcon kind={item.kind} />
                </span>
                <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-[#dbe7ff] bg-[#f7faff] px-2 text-[0.72rem] font-bold text-[#8aa0cc]">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-5 text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#c49019]">{item.label}</p>
              <p className="mt-3 text-[1.05rem] font-bold leading-8 text-[#0b1f57]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            {STORY_SECTIONS.map((section) => (
              <article
                key={section.key}
                data-reveal
                className="rounded-[1.85rem] border border-[#d7e3f7] bg-white/86 p-7 shadow-[0_24px_58px_-42px_rgba(11,31,87,0.18)] md:p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#c49019]">{section.number}</span>
                  <span className="text-[0.94rem] font-bold uppercase tracking-[0.18em] text-[#184aa8]">{section.label}</span>
                </div>
                <h2 className="mt-5 max-w-[30rem] text-[1.9rem] font-bold leading-tight text-[#0b1f57]" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {section.title}
                </h2>
                <p className="mt-5 text-base leading-8 text-[#5b6d93] md:text-[1.02rem]">
                  {project[section.key]}
                </p>
              </article>
            ))}
          </div>

          <aside className="space-y-4">
            <div
              data-reveal
              className="rounded-[1.85rem] border border-[#d7e3f7] bg-white/86 p-7 shadow-[0_24px_58px_-42px_rgba(11,31,87,0.18)] md:p-8"
            >
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#c49019]">Deliverables</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {project.deliverables.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#dbe7ff] bg-[#f7faff] px-4 py-2 text-sm font-medium text-[#16336f]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div
              data-reveal
              className="rounded-[1.85rem] border border-[#d7e3f7] bg-white/86 p-7 shadow-[0_24px_58px_-42px_rgba(11,31,87,0.18)] md:p-8"
            >
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#c49019]">Technologies</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {project.technologies.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#dbe7ff] bg-[#eef4ff] px-4 py-2 text-sm font-semibold text-[#184aa8]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div
              data-reveal
              className="overflow-hidden rounded-[1.85rem] border border-[rgba(246,196,69,0.18)] bg-[linear-gradient(160deg,#0b1c4a_0%,#10295e_45%,#081a45_100%)] p-8 text-white shadow-[0_30px_90px_-40px_rgba(11,31,87,0.65)]"
            >
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#f6c445]">Ready for Discussion?</p>
              <h3 className="mt-4 text-[1.55rem] font-bold leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
                Ingin hasil serapi ini untuk project Anda berikutnya?
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#c7d4f5] md:text-[0.98rem]">
                Kami bisa bantu susun arahan visual, struktur konten, sampai implementasi agar website Anda tampil lebih meyakinkan dan mudah digunakan.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#f6c445] px-6 py-3 text-sm font-bold text-[#081a45] transition hover:-translate-y-0.5 hover:bg-[#ffd866]"
                >
                  Mulai Konsultasi
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
                >
                  Portfolio Lainnya
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <div data-reveal className="mt-14">
          <div className="flex items-center gap-4">
            <span className="h-[2px] w-12 bg-[#f6c445]" />
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#c49019]">Gallery</p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <figure className="group overflow-hidden rounded-[1.85rem] border border-[#d7e3f7] bg-white p-3 shadow-[0_22px_50px_-38px_rgba(11,31,87,0.18)] lg:col-span-2 lg:row-span-2">
              <img
                src={mainPreview.src}
                alt={mainPreview.alt}
                className="aspect-[16/10] w-full rounded-[1.45rem] object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <figcaption className="px-3 pb-2 pt-4 text-sm font-medium text-[#5b6d93]">{mainPreview.caption}</figcaption>
            </figure>

            <figure className="group overflow-hidden rounded-[1.85rem] border border-[#d7e3f7] bg-white p-3 shadow-[0_22px_50px_-38px_rgba(11,31,87,0.18)]">
              <img
                src={secondaryPreview.src}
                alt={secondaryPreview.alt}
                className="aspect-[16/10] w-full rounded-[1.45rem] object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <figcaption className="px-3 pb-2 pt-4 text-sm font-medium text-[#5b6d93]">{secondaryPreview.caption}</figcaption>
            </figure>

            {project.gallery.slice(2).map((item) => (
              <figure
                key={item.src}
                className="group overflow-hidden rounded-[1.85rem] border border-[#d7e3f7] bg-white p-3 shadow-[0_22px_50px_-38px_rgba(11,31,87,0.18)]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="aspect-[16/10] w-full rounded-[1.45rem] object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <figcaption className="px-3 pb-2 pt-4 text-sm font-medium text-[#5b6d93]">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
