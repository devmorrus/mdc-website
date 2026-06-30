import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useHomeHeroAnimation } from '../../animations/useHomeHeroAnimation'
import { useHeroThreeCanvas } from '../../hooks/useHeroThreeCanvas'
import { usePlexusGlobe } from '../../hooks/usePlexusGlobe'
import type { PortfolioProjectItem } from '../../types/portfolio'

interface PortfolioDetailSectionProps {
  project: PortfolioProjectItem
}

export function PortfolioDetailSection({ project }: PortfolioDetailSectionProps) {
  const rootRef = useRef<HTMLElement>(null)
  const heroScopeRef = useRef<HTMLDivElement>(null)
  const backgroundCanvasRef = useHeroThreeCanvas()
  const globeCanvasRef = usePlexusGlobe()
  const [scrollProgress, setScrollProgress] = useState(0)

  useHomeHeroAnimation({ scope: heroScopeRef })

  const storyStages = useMemo(
    () => [
      {
        number: '01',
        label: 'TANTANGAN',
        title: 'Fondasi project perlu diterjemahkan lebih meyakinkan',
        text: project.challenge,
        beadClassName: 'bg-[#f6c445] shadow-[0_0_12px_rgba(246,196,69,0.5)]',
      },
      {
        number: '02',
        label: 'TUJUAN',
        title: 'Pengalaman yang jelas dari eksplorasi ke aksi',
        text: project.objective,
        beadClassName: 'bg-[#184aa8]',
      },
      {
        number: '03',
        label: 'PROSES',
        title: 'Struktur halaman dan alur kami susun bertahap',
        text: project.solution,
        beadClassName: 'bg-[#f6c445] shadow-[0_0_12px_rgba(246,196,69,0.5)]',
      },
      {
        number: '04',
        label: 'HASIL',
        title: 'Hasil akhir yang lebih rapi dan mudah dijalankan',
        text: project.outcome,
        beadClassName: 'bg-[#184aa8]',
      },
    ],
    [project.challenge, project.objective, project.outcome, project.solution],
  )

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  useEffect(() => {
    if (!rootRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = Array.from(rootRef.current.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (prefersReducedMotion) {
      targets.forEach((target) => {
        gsap.set(target, { autoAlpha: 1, y: 0 })
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          gsap.fromTo(
            entry.target,
            { y: 26, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' },
          )

          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>
        {`
          @keyframes portfolioLaneFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }

          @keyframes portfolioLaneFloatX {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(5px); }
          }
        `}
      </style>

      <div className="fixed left-0 top-0 z-[200] h-[3px] w-full bg-[rgba(11,31,87,0.06)]">
        <div
          className="h-full bg-[linear-gradient(90deg,#184aa8,#f6c445)] transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <section
        ref={rootRef}
        className="overflow-hidden bg-[#f5f8ff] pb-12 text-[#48597e] md:pb-16"
      >
        <section ref={heroScopeRef} className="relative -mt-px overflow-hidden px-0 pb-12 md:pb-14">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(160deg, #030b1a 0%, #050f26 35%, #071640 60%, #0a1f54 100%)',
            }}
          />

          <canvas
            ref={backgroundCanvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ opacity: 0.88 }}
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 68% 58% at 50% 50%, transparent 18%, rgba(3,11,26,0.34) 64%, rgba(3,11,26,0.82) 100%)',
            }}
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4"
            style={{
              background: 'radial-gradient(circle, rgba(246,196,69,0.10) 0%, transparent 70%)',
              filter: 'blur(44px)',
            }}
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute left-0 top-0 h-[360px] w-[360px] -translate-x-1/4 -translate-y-1/4"
            style={{
              background: 'radial-gradient(circle, rgba(56,189,248,0.09) 0%, transparent 70%)',
              filter: 'blur(48px)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto w-full max-w-[78rem] px-6 pb-18 pt-28 text-white md:pb-20 md:pt-32">
            <div data-hero-animate className="flex flex-wrap items-center gap-3">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/[0.07] px-4 py-2.5 text-[0.85rem] font-semibold text-white/92 backdrop-blur-sm transition hover:-translate-x-0.5 hover:border-white/28 hover:bg-white/[0.12]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
                Kembali ke Portfolio
              </Link>
              <span className="rounded-full border border-[#f6c445]/35 bg-[#f6c445]/12 px-4 py-2 text-[0.8rem] font-semibold text-[#fde68a] backdrop-blur-sm">
                {project.category}
              </span>
              <span className="rounded-full border border-[#93c5fd]/25 bg-[#60a5fa]/10 px-4 py-2 text-[0.8rem] font-semibold text-[#bfdbfe] backdrop-blur-sm">
                {project.serviceType}
              </span>
            </div>

            <div className="mt-10 grid w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              <div className="order-1 flex w-full flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
                <p
                  data-hero-animate
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.07] px-5 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-blue-100/80 backdrop-blur-sm"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_2px_rgba(56,189,248,0.7)]" />
                  Studi Kasus - {project.year}
                </p>

                <h1
                  data-hero-animate
                  className="mt-8 text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.8rem] lg:leading-[0.98]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="bg-gradient-to-r from-[#facc15] via-[#fde68a] to-[#f6c445] bg-clip-text text-transparent">
                    {project.name}
                  </span>
                </h1>

                <div data-hero-animate className="my-6 max-w-[21rem]">
                  <div className="flex items-center gap-0">
                    {[0, 1, 2, 3].map((item) => (
                      <div key={item} className="flex flex-1 items-center">
                        <span
                          className={`h-[9px] w-[9px] shrink-0 rounded-full ${item % 2 === 0 ? 'bg-[#f6c445] shadow-[0_0_10px_rgba(246,196,69,0.5)]' : 'bg-[#60a5fa]'}`}
                          style={{ animation: 'portfolioLaneFloat 2.6s ease-in-out infinite', animationDelay: `${item * 0.3}s` }}
                        />
                        {item < 3 ? (
                          <span className="h-[2px] flex-1 bg-[repeating-linear-gradient(90deg,rgba(191,219,254,0.32)_0_6px,transparent_6px_10px)]" />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

                <p
                  data-hero-animate
                  className="max-w-[42rem] text-lg leading-8 text-blue-100/72"
                >
                  {project.summary}
                </p>

                <div data-hero-animate className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <span className="rounded-full border border-[#93c5fd]/24 bg-white/[0.06] px-4 py-2 text-sm font-medium text-blue-50/84 backdrop-blur-sm">
                    {project.industry}
                  </span>
                  {project.technologies.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm text-blue-100/72 backdrop-blur-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div
                  data-hero-animate
                  className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row lg:justify-start"
                >
                  <Link
                    to="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#facc15] px-8 py-3.5 text-sm font-bold text-[#0b1f57] shadow-[0_0_32px_rgba(250,204,21,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#fde047] hover:shadow-[0_0_48px_rgba(250,204,21,0.42)] sm:w-auto"
                  >
                    Mulai Konsultasi Project
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    to="/portfolio"
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/18 bg-white/[0.07] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.13] sm:w-auto"
                  >
                    Lihat Portfolio Lainnya
                  </Link>
                </div>
              </div>

              <div data-hero-animate className="order-2 relative flex h-[340px] w-full items-center justify-center select-none sm:h-[400px] lg:col-span-5 lg:h-[480px]">
                <div
                  className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 via-cyan-500/8 to-yellow-400/0 blur-3xl"
                  aria-hidden="true"
                />
                <canvas ref={globeCanvasRef} className="relative z-10 h-full w-full max-w-[460px]" />

                <div className="absolute right-2 top-6 rounded-2xl border border-blue-200/12 bg-[#0b1f57]/82 px-5 py-4 shadow-[0_20px_50px_-24px_rgba(11,31,87,0.65)] backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300/65">Deliverables</p>
                  <p className="mt-1 text-3xl font-extrabold text-[#facc15]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {project.deliverables.length}
                  </p>
                </div>

                <div className="absolute -bottom-2 left-2 rounded-2xl border border-blue-200/12 bg-[#0b1f57]/82 px-5 py-4 shadow-[0_20px_50px_-24px_rgba(11,31,87,0.65)] backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300/65">Tech Stack</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#facc15]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {project.technologies.length} Tools
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="mx-auto w-full max-w-[78rem] px-6 py-10 md:py-12">
          <div
            data-reveal
            className="relative overflow-hidden rounded-[2rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] px-6 py-7 shadow-[0_26px_60px_-42px_rgba(11,31,87,0.24)] md:px-8 md:py-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(246,196,69,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(24,74,168,0.08),transparent_24%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(24,74,168,0.24),transparent)]" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="flex items-center gap-3.5">
                    <span className="h-[2px] w-[34px] bg-[#f6c445]" />
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#d9a52e]">
                      Informasi Proyek
                    </p>
                  </div>
                  <h2
                    className="mt-4 text-2xl font-bold text-[#0b1f57] md:text-[2rem]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Ringkasan singkat sebelum masuk ke studi kasus
                  </h2>
                </div>

                <p className="max-w-xl text-sm leading-7 text-[#5b6d93] md:text-[0.95rem]">
                  Gambaran inti project ini kami rangkum lebih dulu agar konteks client, industri, layanan, dan timeline langsung terbaca dengan cepat.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: 'Client', value: project.client, code: '01' },
                  { label: 'Industri', value: project.industry, code: '02' },
                  { label: 'Layanan', value: project.serviceType, code: '03' },
                  { label: 'Tahun', value: project.year, code: '04' },
                ].map((item) => (
                  <article
                    key={item.label}
                    data-reveal
                    className="group relative overflow-hidden rounded-[1.6rem] border border-[#d7e3f7] bg-white px-5 py-5 shadow-[0_18px_44px_-36px_rgba(11,31,87,0.22)] transition duration-300 hover:-translate-y-1 hover:border-[#b9ccef] hover:shadow-[0_26px_52px_-34px_rgba(11,31,87,0.28)]"
                  >
                    <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 bg-[radial-gradient(circle_at_top_right,rgba(246,196,69,0.18),transparent_72%)] opacity-80" />
                    <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-[linear-gradient(90deg,#f6c445,#184aa8)] opacity-90" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c49019]">
                          {item.label}
                        </p>
                        <span className="rounded-full border border-[#dbe7ff] bg-[#f7faff] px-2.5 py-1 font-mono text-[0.68rem] font-semibold text-[#8aa0cc]">
                          {item.code}
                        </span>
                      </div>

                      <p
                        className="mt-5 text-[1.05rem] font-bold leading-8 text-[#0f172a] transition group-hover:text-[#16336f]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[78rem] px-6 py-16 md:py-20">
          <div data-reveal className="mb-10 flex items-center gap-3.5">
            <span className="h-[2px] w-[34px] bg-[#f6c445]" />
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#d9a52e]">
              Perjalanan Proyek
            </p>
          </div>

          <div className="grid grid-cols-[18px_1fr] gap-x-6 md:grid-cols-[auto_1fr]">
            {storyStages.map((stage, index) => (
              <div key={stage.number} className="contents">
                <div className="flex flex-col items-center">
                  <span
                    className={`h-[11px] w-[11px] rounded-full ${stage.beadClassName}`}
                    style={{ animation: 'portfolioLaneFloatX 2.6s ease-in-out infinite', animationDelay: `${index * 0.2}s` }}
                  />
                  {index < storyStages.length - 1 ? (
                    <span className="mt-0 block h-full min-h-[110px] w-[2px] bg-[repeating-linear-gradient(180deg,#dde6f8_0_6px,transparent_6px_10px)]" />
                  ) : null}
                </div>

                <article
                  data-reveal
                  className={`mb-6 rounded-[1.5rem] border border-[#dde6f8] bg-white px-7 py-7 shadow-[0_18px_40px_-32px_rgba(11,31,87,0.3)] transition duration-300 hover:translate-x-1.5 hover:border-[rgba(24,74,168,0.25)] hover:shadow-[0_22px_46px_-30px_rgba(11,31,87,0.4)] ${index === storyStages.length - 1 ? 'mb-0' : ''}`}
                >
                  <p className="flex items-center gap-2.5 text-[0.74rem] font-bold tracking-[0.18em] text-[#184aa8]">
                    <span className="font-mono text-[#d9a52e]">{stage.number}</span>
                    {stage.label}
                  </p>
                  <h3
                    className="mt-2 text-[1.15rem] font-bold text-[#0b1f57]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {stage.title}
                  </h3>
                  <p className="mt-3 text-[0.96rem] leading-8 text-[#48597e]">{stage.text}</p>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[78rem] px-6 pb-20">
          <div className="grid gap-6 md:grid-cols-2">
            <div
              data-reveal
              className="rounded-[1.6rem] border border-[#dde6f8] bg-white p-8 shadow-[0_18px_40px_-34px_rgba(11,31,87,0.3)]"
            >
              <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[#d9a52e]">
                Cakupan Proyek
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {project.deliverables.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#dde6f8] bg-[#eef3ff] px-4 py-2 text-[0.84rem] font-semibold text-[#48597e] transition hover:-translate-y-0.5 hover:bg-[#dbe7ff] hover:text-[#184aa8]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div
              data-reveal
              className="rounded-[1.6rem] border border-[#dde6f8] bg-white p-8 shadow-[0_18px_40px_-34px_rgba(11,31,87,0.3)]"
            >
              <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[#d9a52e]">
                Tech Stack
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {project.technologies.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#0b1f57] px-4 py-2 text-[0.84rem] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#184aa8]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[78rem] px-6 pb-10 md:pb-14">
          <div data-reveal className="mb-10 flex items-center gap-3.5">
            <span className="h-[2px] w-[34px] bg-[#f6c445]" />
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#d9a52e]">
              Galeri
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            {project.gallery.map((image, index) => (
              <figure
                key={image.alt}
                data-reveal
                className="overflow-hidden rounded-[1.7rem] border border-[#dde6f8] bg-white shadow-[0_18px_40px_-34px_rgba(11,31,87,0.3)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_54px_-30px_rgba(11,31,87,0.4)]"
              >
                <div className="aspect-[16/10] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] p-6">
                  <div className="h-full w-full overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#dbe7ff,#fff2bf)]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`h-full w-full object-contain p-4 ${index === 0 ? 'lg:p-6' : ''}`}
                    />
                  </div>
                </div>
                <figcaption className="border-t border-[#dde6f8] px-6 py-4 text-[0.8rem] font-bold tracking-[0.05em] text-[#184aa8]">
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </section>
    </>
  )
}
