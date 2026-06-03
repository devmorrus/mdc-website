import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { TestimonialItem } from '../../types/home'

interface TestimonialsSectionProps {
  items: TestimonialItem[]
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function TestimonialsSection({ items }: TestimonialsSectionProps) {
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    to: { stagger: 0.08 },
  })
  const leftColumnItems = items.filter((_, index) => index % 2 === 0)
  const rightColumnItems = items.filter((_, index) => index % 2 === 1)

  const renderCard = (item: TestimonialItem, index: number, key: string) => (
    <article
      key={key}
      ref={(element) => {
        if (element && index < items.length) {
          cardsRef.current[index] = element
        }
      }}
      className="break-inside-avoid rounded-[2rem] bg-white p-8 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1"
    >
      <h3
        className="text-[1.9rem] font-bold leading-tight text-[#1a2b4c]"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {item.headline}
      </h3>
      <p className="mt-4 text-base leading-8 text-slate-600">
        "{item.quote}"
      </p>
      <div className="mt-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-[#1a2b4c]">
          {getInitials(item.name)}
        </div>
        <div>
          <h4 className="text-base font-bold text-[#1a2b4c]">{item.name}</h4>
          <p className="mt-0.5 text-sm text-slate-500">
            {item.role} - {item.company}
          </p>
        </div>
      </div>
    </article>
  )

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[linear-gradient(180deg,#121f36_0%,#15284a_100%)] py-18 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(246,196,69,0.08),transparent_14%),radial-gradient(circle_at_82%_24%,rgba(66,122,255,0.12),transparent_20%)]" />
      <div className="mx-auto relative z-10 flex w-full max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-start lg:gap-12">
        <div className="w-full lg:w-[44%]">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#f6c445]">
              Testimoni Klien
            </p>
            <h2
              className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Placeholder testimoni yang menegaskan dampak kerja sama dan kualitas hasil proyek.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-9 text-blue-100/64">
              Susunan ini sudah siap dipakai untuk menampilkan social proof di homepage, baik dari klien korporat, partner, maupun stakeholder proyek.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
              >
                Lihat Semua Klien
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
              >
                Cerita Sukses
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[56%]">
          <div className="grid gap-6 lg:hidden">
            {items.map((item, index) => renderCard(item, index, item.id))}
          </div>

          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6">
            <div className="testimonial-marquee-shell h-[52rem] overflow-hidden">
              <div className="flex flex-col gap-6 animate-[testimonialsUp_18s_linear_infinite] will-change-transform">
                {[...leftColumnItems, ...leftColumnItems].map((item, index) =>
                  renderCard(item, index, `${item.id}-left-${index}`),
                )}
              </div>
            </div>

            <div className="testimonial-marquee-shell h-[52rem] overflow-hidden pt-12">
              <div className="flex flex-col gap-6 animate-[testimonialsDown_20s_linear_infinite] will-change-transform">
                {[...rightColumnItems, ...rightColumnItems].map((item, index) =>
                  renderCard(item, index, `${item.id}-right-${index}`),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
