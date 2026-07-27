import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { useTestimonialsContent } from '../../hooks/useTestimonialsContent'
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

function mapApiTestimonialsToViewModel(items: Array<{
  id: string
  name: string
  role: string
  company: string
  quote: string
}>) {
  return items.map((item) => ({
    id: item.id,
    headline: item.company,
    name: item.name,
    role: item.role,
    company: item.company,
    quote: item.quote,
  }))
}

export function TestimonialsSection({ items }: TestimonialsSectionProps) {
  const { data, isLoading, error } = useTestimonialsContent()
  const resolvedItems =
    !isLoading && !error && data.length > 0
      ? mapApiTestimonialsToViewModel(data)
      : items
  const cardsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    to: { stagger: 0.08 },
  })
  const leftColumnItems = resolvedItems.filter((_, index) => index % 2 === 0)
  const rightColumnItems = resolvedItems.filter((_, index) => index % 2 === 1)

  const renderCard = (item: TestimonialItem, index: number, key: string) => (
    <article
      key={key}
      ref={(element) => {
        if (element && index < resolvedItems.length) {
          cardsRef.current[index] = element
        }
      }}
      className="break-inside-avoid rounded-[2rem] bg-white p-8 text-center shadow-[0_18px_50px_-32px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 md:text-left"
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
      <div className="mt-8 flex items-center justify-center gap-4 md:justify-start">
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
    <section ref={sectionRef} className="relative overflow-hidden bg-[linear-gradient(180deg,#121f36_0%,#15284a_100%)] pt-0 pb-14 md:pb-16 lg:py-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(246,196,69,0.08),transparent_14%),radial-gradient(circle_at_82%_24%,rgba(66,122,255,0.12),transparent_20%)]" />
      <div className="mx-auto relative z-10 flex w-full max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-stretch lg:gap-12">
        <div className="w-full lg:flex lg:w-[44%] lg:items-center">
          <div className="py-10 text-center lg:min-h-[40rem] lg:py-14 lg:text-left xl:min-h-[42rem] lg:flex lg:flex-col lg:justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#f6c445]">
              Testimoni Klien
            </p>
            <h2
              className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Pengalaman nyata dari partner bisnis yang tumbuh bersama kami.
            </h2>
            <p className="mt-6 mx-auto max-w-xl text-lg leading-9 text-blue-100/64 lg:mx-0">
              Inovasi digital yang kami rancang bukan sekadar hasil akhir, melainkan solusi yang mengubah cara bisnis beroperasi dan berkomunikasi dengan audiensnya.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[56%]">
          <div className="grid gap-6 lg:hidden">
            {resolvedItems.map((item, index) => renderCard(item, index, item.id))}
          </div>

          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6">
            <div className="testimonial-marquee-shell h-[40rem] overflow-hidden xl:h-[42rem]">
              <div className="flex flex-col gap-6 animate-[testimonialsUp_18s_linear_infinite] will-change-transform">
                {[...leftColumnItems, ...leftColumnItems].map((item, index) =>
                  renderCard(item, index, `${item.id}-left-${index}`),
                )}
              </div>
            </div>

            <div className="testimonial-marquee-shell h-[40rem] overflow-hidden pt-8 xl:h-[42rem]">
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
