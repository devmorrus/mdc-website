import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { AdvantageItem } from '../../types/home'

interface AdvantagesSectionProps {
  items: AdvantageItem[]
}

const ADVANTAGE_ICONS = {
  'brand-first': (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  responsive: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.75A1.75 1.75 0 015.75 5h12.5A1.75 1.75 0 0120 6.75v7.5A1.75 1.75 0 0118.25 16H5.75A1.75 1.75 0 014 14.25v-7.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19h6M12 16v3" />
    </svg>
  ),
  scalable: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5h10.5M6.75 12h10.5M6.75 16.5h6.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5h13.5A1.5 1.5 0 0120.25 6v12a1.5 1.5 0 01-1.5 1.5H5.25A1.5 1.5 0 013.75 18V6a1.5 1.5 0 011.5-1.5z" />
    </svg>
  ),
  collaborative: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
      <circle cx="9.5" cy="8" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-3-3.87" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 4.13a4 4 0 010 7.75" />
    </svg>
  ),
} as const

const ADVANTAGE_CARD_STYLES = {
  'brand-first': {
    card: 'bg-[#eef1ff] border-[#dde4ff] shadow-[0_20px_44px_-34px_rgba(90,108,199,0.22)]',
    icon: 'bg-white text-[#5b4fd7] shadow-[0_14px_30px_-18px_rgba(91,79,215,0.35)]',
  },
  responsive: {
    card: 'bg-[#fff9e6] border-[#f8ebaf] shadow-[0_20px_44px_-34px_rgba(202,160,37,0.22)]',
    icon: 'bg-white text-[#b56b22] shadow-[0_14px_30px_-18px_rgba(181,107,34,0.28)]',
  },
  scalable: {
    card: 'bg-[#e8fbff] border-[#cdeef4] shadow-[0_20px_44px_-34px_rgba(42,154,180,0.2)]',
    icon: 'bg-white text-[#18839d] shadow-[0_14px_30px_-18px_rgba(24,131,157,0.28)]',
  },
  collaborative: {
    card: 'bg-[#eaf9ef] border-[#d4efdc] shadow-[0_20px_44px_-34px_rgba(47,151,94,0.2)]',
    icon: 'bg-white text-[#198457] shadow-[0_14px_30px_-18px_rgba(25,132,87,0.28)]',
  },
} as const

export function AdvantagesSection({ items }: AdvantagesSectionProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    to: { stagger: 0.08 },
  })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[linear-gradient(180deg,#eef4ff_0%,#f7fbff_100%)] py-18 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.72),transparent_20%),radial-gradient(circle_at_88%_68%,rgba(24,74,168,0.08),transparent_18%)]" />
      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-8">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#c49019]">
              Keunggulan Perusahaan
            </p>
            <h2
              className="mt-4 text-3xl font-bold leading-tight text-[#0b1f57] md:text-4xl"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Pendekatan yang kami utamakan agar website terasa profesional sekaligus siap dikembangkan.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              Kami tidak sekadar membuat website, kami membangun fondasi digital yang kuat. Setiap keputusan desain dan teknis ditujukan untuk memaksimalkan kredibilitas brand dan efisiensi bisnis Anda.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {items.map((item, index) => {
              const styles = ADVANTAGE_CARD_STYLES[item.id as keyof typeof ADVANTAGE_CARD_STYLES]
              const icon = ADVANTAGE_ICONS[item.id as keyof typeof ADVANTAGE_ICONS]

              return (
                <article
                  key={item.id}
                  ref={(element) => {
                    if (element) {
                      cardsRef.current[index] = element
                    }
                  }}
                  className={`group rounded-[2rem] border p-8 shadow-[0_18px_50px_-38px_rgba(11,31,87,0.12)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_60px_-34px_rgba(11,31,87,0.16)] ${styles.card}`}
                >
                  <div className={`flex h-15 w-15 items-center justify-center rounded-[1.15rem] ${styles.icon}`}>
                    {icon}
                  </div>

                  <h3
                    className="mt-8 text-[1.95rem] font-bold leading-tight text-[#172548]"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-5 max-w-[18rem] text-base leading-8 text-slate-600">
                    {item.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
