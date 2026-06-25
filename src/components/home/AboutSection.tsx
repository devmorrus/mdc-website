import { useEffect, useState } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { AboutSnippetContent } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface AboutSectionProps {
  content: AboutSnippetContent
}

const FALLBACK_FEATURED_IMAGE = {
  imageUrl:
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
  imageAlt: 'Tim bisnis berdiskusi di ruang meeting modern.',
}

function AboutGallerySlider({ slides }: { slides: { imageUrl: string; imageAlt: string; id: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 3400)

    return () => window.clearInterval(intervalId)
  }, [slides.length])

  return (
    <figure className="relative">
      <div className="absolute -left-4 top-8 h-32 w-32 rounded-full bg-[#f6c445]/12 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-6 right-0 h-40 w-40 rounded-full bg-[#184aa8]/10 blur-3xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/78 p-3 shadow-[0_34px_72px_-38px_rgba(11,31,87,0.26)] backdrop-blur-sm">
        <div className="relative h-[24rem] overflow-hidden rounded-[1.45rem] md:h-[28rem]">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ${
                  isActive
                    ? 'translate-x-0 opacity-100'
                    : index < activeIndex || (activeIndex === 0 && index === slides.length - 1)
                      ? '-translate-x-8 opacity-0'
                      : 'translate-x-8 opacity-0'
                }`}
              >
                <img
                  src={slide.imageUrl}
                  alt={slide.imageAlt}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            )
          })}
        </div>
        <div className="pointer-events-none absolute inset-x-8 bottom-0 h-1.5 rounded-full bg-gradient-to-r from-transparent via-[#f6c445] to-transparent opacity-90" />
      </div>

      {slides.length > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Tampilkan gambar ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? 'w-8 bg-[#f6c445]' : 'w-2.5 bg-[#d7e2f6]'
              }`}
            />
          ))}
        </div>
      ) : null}
    </figure>
  )
}

export function AboutSection({ content }: AboutSectionProps) {
  const sectionRef = useGsapReveal<HTMLElement>({
    from: { y: 30, opacity: 0 },
    to: { duration: 0.72 },
  })
  const gallerySlides =
    content.teamMembers.length > 0
      ? content.teamMembers.map((member) => ({
          id: member.id,
          imageUrl: member.imageUrl,
          imageAlt: member.name || FALLBACK_FEATURED_IMAGE.imageAlt,
        }))
      : [{ id: 'fallback', ...FALLBACK_FEATURED_IMAGE }]

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-20 md:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fffdfa_0%,#fffefb_42%,#f8fbff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(246,196,69,0.14),transparent_18%),radial-gradient(circle_at_86%_82%,rgba(24,74,168,0.08),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.88),transparent_30%)]" />
      <div className="mx-auto relative z-10 grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_0.96fr] lg:items-center lg:gap-12">
        <div className="text-center lg:text-left">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.summary}
          />

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 lg:mx-0">
            {content.description}
          </p>

        </div>

        <div className="mx-auto w-full max-w-[34rem] lg:max-w-none">
          <AboutGallerySlider slides={gallerySlides} />
        </div>
      </div>
    </section>
  )
}
