import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { AdvantageItem } from '../../types/home'
import { SectionHeading } from './SectionHeading'

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
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Keunggulan Perusahaan"
            title="Pendekatan yang kami utamakan agar website terasa profesional sekaligus siap dikembangkan."
            description="Section ini membantu menjelaskan alasan perusahaan layak dipilih, bukan hanya daftar layanan yang tersedia."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item, index) => (
              <article
                key={item.id}
                ref={(element) => {
                  if (element) {
                    cardsRef.current[index] = element
                  }
                }}
                className="rounded-[1.9rem] border border-blue-100 bg-white p-6 shadow-[0_18px_50px_-36px_rgba(11,31,87,0.18)]"
              >
                <span className="inline-flex rounded-full bg-[#fff2bf] px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#0f2f78]">
                  {item.stat}
                </span>
                <h3
                  className="mt-5 text-xl font-bold text-[#0b1f57]"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
