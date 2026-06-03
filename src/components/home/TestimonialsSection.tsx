import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { TestimonialItem } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface TestimonialsSectionProps {
  items: TestimonialItem[]
}

export function TestimonialsSection({ items }: TestimonialsSectionProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    to: { stagger: 0.08 },
  })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(246,196,69,0.09),transparent_14%),radial-gradient(circle_at_78%_20%,rgba(66,122,255,0.16),transparent_18%),linear-gradient(180deg,#0a1c50_0%,#12357f_50%,#0b255f_100%)] py-18 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.06),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Testimoni Klien"
          title="Placeholder testimoni yang menegaskan dampak kerja sama dan kualitas hasil proyek."
          description="Susunan ini sudah siap dipakai untuk menampilkan social proof di homepage, baik dari klien korporat, partner, maupun stakeholder proyek."
          tone="dark"
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.id}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element
                }
              }}
              className="rounded-[2rem] border border-white/12 bg-white/8 p-6 shadow-[0_18px_50px_-36px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            >
              <p className="text-4xl leading-none text-[#f6c445]">"</p>
              <p className="mt-4 text-base leading-8 text-blue-50/86">
                {item.quote}
              </p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="mt-1 text-sm text-blue-100/68">
                  {item.role} - {item.company}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
