import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { PartnerItem } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface PartnersSectionProps {
  items: PartnerItem[]
}

export function PartnersSection({ items }: PartnersSectionProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    to: { stagger: 0.06 },
  })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] py-18 md:py-22">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(246,196,69,0.08),transparent_16%),radial-gradient(circle_at_84%_76%,rgba(24,74,168,0.06),transparent_16%)]" />
      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Klien dan Partner"
          title="Area logo partner untuk memperkuat kepercayaan dan menunjukkan cakupan kolaborasi."
          description="Untuk tahap awal, section ini memakai logo placeholder berbasis inisial. Nanti bisa diganti ke logo resmi tanpa mengubah struktur layout."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.id}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element
                }
              }}
              aria-label={item.name}
              className="flex items-center gap-4 rounded-[1.75rem] border border-blue-100 bg-gradient-to-br from-white to-[#f4f8ff] p-5 shadow-[0_18px_50px_-38px_rgba(11,31,87,0.18)]"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0f2f78] text-base font-bold text-white">
                {item.abbreviation}
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c49019]">
                  Partner
                </p>
                <p className="mt-2 text-lg font-semibold text-[#0b1f57]">{item.name}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
