import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { AdvantageItem } from '../../types/home'

interface AdvantagesSectionProps {
  items: AdvantageItem[]
}

const ADVANTAGE_ICONS = {
  'brand-first': (
    <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  responsive: (
    <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 6.25A1.75 1.75 0 016.5 4.5h11A1.75 1.75 0 0119.25 6.25v7.5A1.75 1.75 0 0117.5 15.5h-11a1.75 1.75 0 01-1.75-1.75v-7.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19.5h6M12 15.5v4" />
    </svg>
  ),
  scalable: (
    <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7.5h8M8 12h8M8 16.5h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 4.5h11A1.75 1.75 0 0119.25 6.25v11.5A1.75 1.75 0 0117.5 19.5h-11a1.75 1.75 0 01-1.75-1.75V6.25A1.75 1.75 0 016.5 4.5z" />
    </svg>
  ),
  collaborative: (
    <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 20.25h4.75v-1.5a3.25 3.25 0 00-4.6-2.95" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.75 20.25H14.5v-1.75a4.75 4.75 0 00-9.5 0v1.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 11a3 3 0 100-6 3 3 0 000 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 10a2.25 2.25 0 100-4.5A2.25 2.25 0 0018 10z" />
    </svg>
  ),
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
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-8">
          <div className="text-center lg:sticky lg:top-28 lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#c49019]">
              Keunggulan Perusahaan
            </p>
            <h2
              className="mt-4 text-3xl font-bold leading-tight text-[#0b1f57] md:text-4xl"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Pendekatan yang kami utamakan agar website terasa profesional sekaligus siap dikembangkan.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 lg:mx-0">
              Kami tidak sekadar membuat website, kami membangun fondasi digital yang kuat. Setiap keputusan desain dan teknis ditujukan untuk memaksimalkan kredibilitas brand dan efisiensi bisnis Anda.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {items.map((item, index) => {
              const icon = ADVANTAGE_ICONS[item.id as keyof typeof ADVANTAGE_ICONS]

              return (
                <article
                  key={item.id}
                  ref={(element) => {
                    if (element) {
                      cardsRef.current[index] = element
                    }
                  }}
                  className="group flex min-h-[284px] flex-col items-center rounded-[1.8rem] border border-slate-100 bg-white px-7 py-8 text-center shadow-[0_18px_50px_-38px_rgba(15,23,42,0.16)] transition duration-500 hover:-translate-y-2 hover:border-[#1a2b4c] hover:bg-[#1a2b4c] hover:shadow-[0_30px_70px_-40px_rgba(26,43,76,0.55)] md:px-8 md:py-9"
                >
                  <div className="flex h-18 w-18 items-center justify-center rounded-[1.25rem] bg-[#fdf6e3] text-[#b2822a] transition duration-500 group-hover:bg-white/10 group-hover:text-white">
                    {icon}
                  </div>

                  <h3
                    className="mt-6 text-[1.75rem] font-bold leading-tight text-[#1a2b4c] transition duration-500 group-hover:text-white md:text-[1.85rem]"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-[16.5rem] text-[0.97rem] leading-7 text-slate-500 transition duration-500 group-hover:text-blue-100/80">
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
