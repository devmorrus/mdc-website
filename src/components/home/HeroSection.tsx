import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { useHomeHeroAnimation } from '../../animations/useHomeHeroAnimation'
import type { HeroContent, PortfolioItem } from '../../types/home'

interface HeroSectionProps {
  content: HeroContent
  projects: PortfolioItem[]
}

interface HeroActionLinkProps {
  href: string
  className: string
  children: ReactNode
}

const HERO_TYPEWRITER_WORDS = ['Terintegrasi.', 'Skalabel.', 'Profesional.', 'Inovatif.']
const HERO_BACKGROUND_IMAGE =
  'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2000'
const HERO_PROJECT_SLIDE_DURATION_MS = 420
const HERO_PROJECT_SUMMARY_MAX_CHARS = 74
const HERO_PROJECT_OUTCOME_MAX_CHARS = 68

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')
}

function HeroActionLink({ href, className, children }: HeroActionLinkProps) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  )
}

function TerminalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="m8 9 3 3-3 3" />
      <path d="M13 15h3" />
    </svg>
  )
}

function MessageCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7.9 20A8.7 8.7 0 1 1 20 12.1" />
      <path d="M11.9 20H6l1.1-4.8" />
    </svg>
  )
}

function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function truncateText(text: string, maxChars: number) {
  if (text.length <= maxChars) {
    return text
  }

  return `${text.slice(0, maxChars).trimEnd()}...`
}

function HeroProjectSlideContent({ project }: { project: PortfolioItem }) {
  const truncatedSummary = truncateText(project.summary, HERO_PROJECT_SUMMARY_MAX_CHARS)
  const truncatedOutcome = truncateText(project.outcome, HERO_PROJECT_OUTCOME_MAX_CHARS)

  return (
    <>
      <div className="overflow-hidden rounded-[1.6rem]">
        <img
          src={project.imageUrl}
          alt={project.imageAlt}
          className="h-[15rem] w-full object-cover md:h-[17rem]"
        />
      </div>

      <div className="mt-4">
        <p className="text-[11px] uppercase tracking-[0.28em] text-blue-100/66">{project.category}</p>
        <h3 className="mt-2.5 text-xl font-bold leading-snug text-white">{project.name}</h3>
        <p className="mt-3 text-sm leading-6 text-blue-50/82" title={project.summary}>
          {truncatedSummary}
        </p>
        <p className="mt-2.5 text-sm leading-6 text-blue-100/66" title={project.outcome}>
          {truncatedOutcome}
        </p>
      </div>
    </>
  )
}

export function HeroSection({ content, projects }: HeroSectionProps) {
  const scopeRef = useRef<HTMLDivElement>(null)
  const measurementSlideRefs = useRef<Array<HTMLDivElement | null>>([])
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  const [typedWord, setTypedWord] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [transitionProjectIndex, setTransitionProjectIndex] = useState<number | null>(null)
  const [projectSlideDirection, setProjectSlideDirection] = useState<1 | -1>(1)
  const [projectStageMinHeight, setProjectStageMinHeight] = useState<number | null>(null)
  const featuredProjects = projects.slice(0, 4)
  const featuredProjectIds = featuredProjects.map((project) => project.id).join('|')
  const normalizedActiveProjectIndex =
    featuredProjects.length > 0 ? activeProjectIndex % featuredProjects.length : 0
  const normalizedTransitionProjectIndex =
    transitionProjectIndex !== null && featuredProjects.length > 0
      ? transitionProjectIndex % featuredProjects.length
      : null
  const activeProject = featuredProjects[normalizedActiveProjectIndex] ?? null
  const transitionProject =
    normalizedTransitionProjectIndex !== null
      ? featuredProjects[normalizedTransitionProjectIndex] ?? null
      : null
  const visibleProjectIndex = normalizedTransitionProjectIndex ?? normalizedActiveProjectIndex
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const displayedWord = prefersReducedMotion ? HERO_TYPEWRITER_WORDS[activeWordIndex] : typedWord
  useHomeHeroAnimation({
    scope: scopeRef,
  })

  useEffect(() => {
    const currentWord = HERO_TYPEWRITER_WORDS[activeWordIndex]

    if (prefersReducedMotion) {
      return
    }

    let timeoutId: number

    if (!isDeleting && typedWord === currentWord) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(true)
      }, 1800)
    } else if (isDeleting && typedWord === '') {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false)
        setActiveWordIndex((currentIndex) => (currentIndex + 1) % HERO_TYPEWRITER_WORDS.length)
      }, 350)
    } else {
      timeoutId = window.setTimeout(() => {
        setTypedWord((currentValue) =>
          isDeleting ? currentValue.slice(0, -1) : currentWord.slice(0, currentValue.length + 1),
        )
      }, isDeleting ? 42 : 78)
    }

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [activeWordIndex, isDeleting, prefersReducedMotion, typedWord])

  useEffect(() => {
    if (prefersReducedMotion || featuredProjects.length < 2 || transitionProjectIndex !== null) {
      return
    }

    const intervalId = window.setInterval(() => {
      setProjectSlideDirection(1)
      setTransitionProjectIndex((normalizedActiveProjectIndex + 1) % featuredProjects.length)
    }, 4800)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [featuredProjects.length, normalizedActiveProjectIndex, prefersReducedMotion, transitionProjectIndex])

  useEffect(() => {
    if (transitionProjectIndex === null) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setActiveProjectIndex(transitionProjectIndex)
      setTransitionProjectIndex(null)
    }, HERO_PROJECT_SLIDE_DURATION_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [transitionProjectIndex])

  useLayoutEffect(() => {
    if (featuredProjects.length === 0) {
      measurementSlideRefs.current = []
      return
    }

    const measureTallestSlide = () => {
      const slideHeights = measurementSlideRefs.current
        .filter((node): node is HTMLDivElement => node !== null)
        .map((node) => node.offsetHeight)

      if (slideHeights.length === 0) {
        return
      }

      const tallestSlideHeight = Math.max(...slideHeights)
      setProjectStageMinHeight((currentHeight) =>
        currentHeight === tallestSlideHeight ? currentHeight : tallestSlideHeight,
      )
    }

    measureTallestSlide()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measureTallestSlide)

      return () => {
        window.removeEventListener('resize', measureTallestSlide)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      measureTallestSlide()
    })

    measurementSlideRefs.current.forEach((node) => {
      if (node) {
        resizeObserver.observe(node)
      }
    })

    return () => {
      resizeObserver.disconnect()
    }
  }, [featuredProjectIds, featuredProjects.length])

  const requestProjectChange = (nextIndex: number, direction: -1 | 1) => {
    if (featuredProjects.length < 2 || transitionProjectIndex !== null) {
      return
    }

    const normalizedNextIndex = ((nextIndex % featuredProjects.length) + featuredProjects.length) % featuredProjects.length

    if (normalizedNextIndex === normalizedActiveProjectIndex) {
      return
    }

    if (prefersReducedMotion) {
      setActiveProjectIndex(normalizedNextIndex)
      return
    }

    setProjectSlideDirection(direction)
    setTransitionProjectIndex(normalizedNextIndex)
  }

  const changeProject = (direction: -1 | 1) => {
    if (featuredProjects.length < 2) {
      return
    }

    requestProjectChange(normalizedActiveProjectIndex + direction, direction)
  }

  const resolveProjectDirection = (nextIndex: number): -1 | 1 => {
    if (nextIndex === normalizedActiveProjectIndex) {
      return 1
    }

    if (normalizedActiveProjectIndex === featuredProjects.length - 1 && nextIndex === 0) {
      return 1
    }

    if (normalizedActiveProjectIndex === 0 && nextIndex === featuredProjects.length - 1) {
      return -1
    }

    return nextIndex > normalizedActiveProjectIndex ? 1 : -1
  }

  return (
    <div ref={scopeRef} className="relative">
      <section
        id="home"
        className="hero-section relative -mt-px overflow-hidden px-0 pb-18 pt-28 text-white md:pb-24 md:pt-34 lg:pb-28 lg:pt-38"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(104deg, rgba(6,18,56,0.96) 0%, rgba(9,35,97,0.9) 42%, rgba(23,62,148,0.72) 100%), url("${HERO_BACKGROUND_IMAGE}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.14]" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.16),transparent_24%)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.9fr)] lg:items-center">
          <div className="max-w-xl text-center lg:text-left">
            <p
              data-hero-animate
              className="inline-flex rounded-full border border-white/16 bg-white/6 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.24em] text-blue-100/90"
            >
              {content.eyebrow || 'Kami Memiliki Pengalaman & Profesionalitas'}
            </p>

            <h1
              data-hero-animate
              className="mt-6 text-2xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-3xl lg:text-[2.85rem]"
            >
              <span className="block">{content.title}</span>
              <span className="block text-[#facc15]">
                Lebih{' '}
                <span className="whitespace-nowrap">
                  {displayedWord}
                  <span className="ml-1 inline-block h-[0.9em] w-1 align-[-0.08em] animate-pulse rounded-full bg-[#facc15]" />
                </span>
              </span>
            </h1>

            <p
              data-hero-animate
              className="mt-6 max-w-lg text-sm leading-7 text-blue-50/86 sm:text-base"
            >
              {content.description}
            </p>

            <div
              data-hero-animate
              className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:justify-start"
            >
              <HeroActionLink
                href={content.secondaryCtaHref}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#facc15] px-6 py-3 text-sm font-bold text-[#243b93] shadow-[0_0_24px_rgba(250,204,21,0.24)] transition-all hover:-translate-y-1 hover:bg-[#fde047] hover:shadow-[0_0_32px_rgba(250,204,21,0.36)]"
              >
                <TerminalIcon className="h-4.5 w-4.5" />
                {content.secondaryCtaLabel}
              </HeroActionLink>
              <HeroActionLink
                href={content.primaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/18 bg-white/8 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/14"
              >
                <MessageCircleIcon className="h-4.5 w-4.5" />
                {content.primaryCtaLabel}
              </HeroActionLink>
            </div>

            {content.trustPoints.length > 0 ? (
              <ul data-hero-animate className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                {content.trustPoints.map((point) => (
                  <li
                    key={point}
                    className="rounded-full border border-white/16 bg-white/8 px-4 py-2 text-sm text-blue-50 shadow-sm backdrop-blur-sm"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div data-hero-animate className="relative mx-auto w-full max-w-[38rem] lg:mx-0 lg:justify-self-end">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-[linear-gradient(165deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] p-4 shadow-[0_28px_80px_-42px_rgba(3,12,35,0.92)] backdrop-blur-md md:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-blue-100/64">Featured Project</p>
                  {/* <h2 className="mt-2 text-base font-semibold text-white/94 md:text-lg">Project pilihan untuk inspirasi digital brand Anda</h2> */}
                </div>

                {featuredProjects.length > 1 ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white/86 transition hover:bg-white/16"
                      onClick={() => changeProject(-1)}
                      aria-label="Project sebelumnya"
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white/86 transition hover:bg-white/16"
                      onClick={() => changeProject(1)}
                      aria-label="Project berikutnya"
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}
              </div>

              {activeProject ? (
                <>
                  <div aria-hidden="true" className="pointer-events-none invisible h-0 overflow-hidden">
                    {featuredProjects.map((project, index) => (
                      <div
                        key={`${project.id}-measurement`}
                        ref={(node) => {
                          measurementSlideRefs.current[index] = node
                        }}
                      >
                        <HeroProjectSlideContent project={project} />
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-5 grid"
                    style={projectStageMinHeight && featuredProjects.length > 0 ? { minHeight: `${projectStageMinHeight}px` } : undefined}
                  >
                    <div
                      className={`hero-project-slide col-start-1 row-start-1 ${
                        transitionProject
                          ? projectSlideDirection === 1
                            ? 'hero-project-slide--exit-left'
                            : 'hero-project-slide--exit-right'
                          : ''
                      }`}
                    >
                      <HeroProjectSlideContent project={activeProject} />
                    </div>

                    {transitionProject ? (
                      <div
                        className={`hero-project-slide col-start-1 row-start-1 ${
                          projectSlideDirection === 1
                            ? 'hero-project-slide--enter-right'
                            : 'hero-project-slide--enter-left'
                        }`}
                      >
                        <HeroProjectSlideContent project={transitionProject} />
                      </div>
                    ) : null}
                  </div>
                </>
              ) : (
                <div className="mt-6 rounded-[1.6rem] border border-dashed border-white/18 px-6 py-12 text-center text-blue-100/76">
                  Project unggulan akan ditampilkan di area ini.
                </div>
              )}

              {featuredProjects.length > 1 ? (
                <div className="mt-5 flex items-center justify-center gap-2.5">
                  {featuredProjects.map((project, index) => (
                    <button
                      key={project.id}
                      type="button"
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        index === visibleProjectIndex
                          ? 'bg-[#facc15] shadow-[0_0_16px_rgba(250,204,21,0.5)]'
                          : 'bg-white/28 hover:bg-white/48'
                      }`}
                      onClick={() => requestProjectChange(index, resolveProjectDirection(index))}
                      aria-label={`Tampilkan project ${project.name}`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
