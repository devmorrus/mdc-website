import { useEffect, useState } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { AboutSnippetContent } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface AboutSectionProps {
  content: AboutSnippetContent
}

const ABOUT_GALLERY_SLIDES = [
  {
    id: 'office-meeting',
    imageUrl:
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
    imageAlt: 'Tim bisnis berdiskusi di ruang meeting modern.',
  },
  {
    id: 'workspace',
    imageUrl:
      'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
    imageAlt: 'Suasana workspace modern dengan tampilan profesional.',
  },
  {
    id: 'presentation',
    imageUrl:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
    imageAlt: 'Tim perusahaan dalam sesi presentasi dan kolaborasi.',
  },
] as const

function AboutGallerySlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (ABOUT_GALLERY_SLIDES.length <= 1) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % ABOUT_GALLERY_SLIDES.length)
    }, 3200)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <article className="relative overflow-hidden rounded-[2rem] p-0">
      <div className="relative h-[24rem] overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-34px_rgba(11,31,87,0.34)] md:h-[28rem]">
        {ABOUT_GALLERY_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ${
                isActive
                  ? 'translate-x-0 opacity-100'
                  : index < activeIndex || (activeIndex === 0 && index === ABOUT_GALLERY_SLIDES.length - 1)
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

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,87,0.04),transparent_20%,transparent_72%,rgba(11,31,87,0.12))]" />
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {ABOUT_GALLERY_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Tampilkan gambar ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex ? 'w-8 bg-[#f6c445]' : 'w-2.5 bg-white/38'
            }`}
          />
        ))}
      </div>
    </article>
  )
}

export function AboutSection({ content }: AboutSectionProps) {
  const sectionRef = useGsapReveal<HTMLElement>()

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] py-18 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(246,196,69,0.08),transparent_18%),radial-gradient(circle_at_86%_32%,rgba(24,74,168,0.08),transparent_22%)]" />
      <div className="mx-auto relative z-10 grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div className="text-center lg:text-left">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.summary}
          />

          <p className="mt-6 mx-auto max-w-2xl text-base leading-8 text-slate-600 lg:mx-0">
            {content.description}
          </p>
        </div>

        <div>
          <AboutGallerySlider />
        </div>
      </div>
    </section>
  )
}
