import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { AdvantageItem } from '../../types/home'

interface AdvantagesSectionProps {
  items: AdvantageItem[]
}

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
            {items.map((item, index) => (
              <article
                key={item.id}
                ref={(element) => {
                  if (element) {
                    cardsRef.current[index] = element
                  }
                }}
                className="group rounded-[1.8rem] border border-slate-100 bg-white p-6 text-center shadow-[0_18px_50px_-38px_rgba(11,31,87,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-34px_rgba(11,31,87,0.16)]"
              >
                <div className="overflow-hidden rounded-[1.4rem] border border-slate-100 bg-[#f6f9ff]">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="mt-6 flex justify-center">
                  <span className="rounded-full bg-[#edf3ff] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-[#3152a3]">
                    {item.stat}
                  </span>
                </div>

                <h3
                  className="mt-5 text-[1.8rem] font-bold leading-tight text-[#0b1f57]"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
