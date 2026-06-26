import { useRef, type MouseEvent } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { PortfolioProjectItem, PortfolioThumbnailTone } from '../../types/portfolio'
import { SectionHeading } from '../home/SectionHeading'

interface PortfolioGridSectionProps {
  items: PortfolioProjectItem[]
}

const TONE_STYLES: Record<PortfolioThumbnailTone, { thumb: string; badge: string; glow: string }> = {
  sky: {
    thumb: 'from-sky-500/28 via-sky-700/15 to-blue-950',
    badge: 'text-sky-700 bg-sky-50 border-sky-200',
    glow: 'from-sky-500/12',
  },
  amber: {
    thumb: 'from-amber-400/28 via-amber-700/15 to-blue-950',
    badge: 'text-amber-700 bg-amber-50 border-amber-200',
    glow: 'from-amber-400/12',
  },
  blue: {
    thumb: 'from-blue-400/28 via-blue-600/15 to-blue-950',
    badge: 'text-blue-700 bg-blue-50 border-blue-200',
    glow: 'from-blue-400/12',
  },
}

const SERVICE_TYPE_COLORS: Record<string, string> = {
  'Website Company Profile': 'text-amber-700 bg-amber-50 border-amber-200',
  'Web App Custom': 'text-sky-700 bg-sky-50 border-sky-200',
  'Internal System': 'text-violet-700 bg-violet-50 border-violet-200',
  'Brand Website': 'text-emerald-700 bg-emerald-50 border-emerald-200',
  'Website / Platform Custom': 'text-orange-700 bg-orange-50 border-orange-200',
}

export function PortfolioGridSection({ items }: PortfolioGridSectionProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    from: { y: 36, opacity: 0, scale: 0.97 },
    to: { stagger: 0.09, duration: 0.75 },
    threshold: 0.08,
  })

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2

    card.style.transform = `perspective(900px) rotateX(${((y - cy) / cy) * -4}deg) rotateY(${((x - cx) / cx) * 4}deg) translateY(-2px)`
  }

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-18 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fffdfa_0%,#f8fbff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_24%,rgba(24,74,168,0.08),transparent_20%),radial-gradient(circle_at_12%_76%,rgba(246,196,69,0.08),transparent_18%)]" />

      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Portofolio dan Proyek"
          title="Bukti nyata bagaimana kami menerjemahkan kebutuhan bisnis menjadi solusi digital."
          description="Jelajahi hasil karya kami. Dari company profile sampai sistem internal, setiap project dibangun untuk kredibilitas, efisiensi, dan pertumbuhan."
          centered
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const toneStyle = TONE_STYLES[item.thumbnailTone]
            const serviceStyle = SERVICE_TYPE_COLORS[item.serviceType] ?? 'text-blue-700 bg-blue-50 border-blue-200'

            return (
              <article
                key={item.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
                className="group relative overflow-hidden rounded-[1.85rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] shadow-[0_22px_48px_-38px_rgba(11,31,87,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-[#184aa8]/18 hover:shadow-[0_28px_58px_-36px_rgba(11,31,87,0.28)]"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${toneStyle.glow} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${toneStyle.thumb}`}>
                  <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 25% 40%, rgba(255,255,255,0.55) 0%, transparent 55%), radial-gradient(circle at 75% 65%, rgba(255,255,255,0.35) 0%, transparent 45%)',
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-black text-white/14 select-none" style={{ fontFamily: "'Sora', sans-serif" }}>
                      {item.thumbnailLabel}
                    </span>
                  </div>

                  <div className={`absolute top-4 left-4 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${serviceStyle}`}>
                    {item.serviceType}
                  </div>

                  <div className="absolute right-4 top-4 rounded-full border border-white/16 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                    {item.industry}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-[#0b1f57]" style={{ fontFamily: "'Sora', sans-serif" }}>
                      {item.name}
                    </h3>
                    <span className="text-sm font-semibold text-[#184aa8]/50">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.summary}
                  </p>

                  <div className="mt-6 flex items-center gap-3 rounded-[1.35rem] border border-[#d7e3f7] bg-white/78 px-4 py-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#f6c445]" />
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                      Project showcase
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#f6c445]/70 to-transparent transition-all duration-500 group-hover:w-full" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
