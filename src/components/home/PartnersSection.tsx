import { useRef } from 'react'
import logoDefert from '../../assets/logo-defert.png'
import logoDat from '../../assets/dat.png'
import logoIphone from '../../assets/iphone_gresik.png'
import logoFtc from '../../assets/logo-ftc.png'
import logoJaladewa from '../../assets/logo-jaladewa.png'
import logoMcb from '../../assets/logo-mcb.png'
import logoFgc from '../../assets/logo fgc fix png (1).png'
import logoSankta from '../../assets/Sankta-Icon.jpg'
import logoX3o from '../../assets/X3O Samping-Hitam (1).png'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { PartnerItem } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface PartnersSectionProps {
  items: PartnerItem[]
}

const partnerLogos: Record<string, { src: string; frameClassName: string; imageClassName: string }> = {
  '1': {
    src: logoJaladewa,
    frameClassName: 'w-[15.5rem] sm:w-[17.5rem] md:w-[19rem] lg:w-[20rem]',
    imageClassName: 'max-h-[4.8rem] sm:max-h-[5.4rem] md:max-h-[6rem]',
  },
  '2': {
    src: logoFtc,
    frameClassName: 'w-[15rem] sm:w-[17rem] md:w-[18.5rem] lg:w-[19.5rem]',
    imageClassName: 'max-h-[4.3rem] sm:max-h-[4.8rem] md:max-h-[5.3rem]',
  },
  '3': {
    src: logoMcb,
    frameClassName: 'w-[14.75rem] sm:w-[16.75rem] md:w-[18.25rem] lg:w-[19rem]',
    imageClassName: 'max-h-[4.2rem] sm:max-h-[4.7rem] md:max-h-[5.1rem]',
  },
  '4': {
    src: logoDefert,
    frameClassName: 'w-[14.5rem] sm:w-[16.25rem] md:w-[17.5rem] lg:w-[18.5rem]',
    imageClassName: 'max-h-[4.9rem] sm:max-h-[5.5rem] md:max-h-[6.1rem]',
  },
  '5': {
    src: logoDat,
    frameClassName: 'w-[12rem] sm:w-[13.5rem] md:w-[15rem] lg:w-[16rem]',
    imageClassName: 'max-h-[3.2rem] sm:max-h-[3.6rem] md:max-h-[4rem]',
  },
  '6': {
    src: logoIphone,
    frameClassName: 'w-[12.5rem] sm:w-[14rem] md:w-[15.5rem] lg:w-[16.5rem]',
    imageClassName: 'max-h-[3.5rem] sm:max-h-[3.9rem] md:max-h-[4.3rem]',
  },
  '7': {
    src: logoFgc,
    frameClassName: 'w-[15rem] sm:w-[17rem] md:w-[18.5rem] lg:w-[19.5rem]',
    imageClassName: 'max-h-[3.8rem] sm:max-h-[4.3rem] md:max-h-[4.8rem]',
  },
  '8': {
    src: logoSankta,
    frameClassName: 'w-[5.5rem] sm:w-[6.5rem] md:w-[7.5rem] lg:w-[8.5rem]',
    imageClassName: 'max-h-[4.5rem] sm:max-h-[5rem] md:max-h-[5.5rem]',
  },
  '9': {
    src: logoX3o,
    frameClassName: 'w-[14.5rem] sm:w-[16rem] md:w-[17.5rem] lg:w-[18.5rem]',
    imageClassName: 'max-h-[4rem] sm:max-h-[4.5rem] md:max-h-[5rem]',
  },
}

function PartnerLogo({ item }: { item: PartnerItem }) {
  const logo = partnerLogos[item.id]

  if (logo) {
    return (
      <div className={`partner-logo flex items-center justify-center ${logo.frameClassName}`}>
        <img
          src={logo.src}
          alt={`${item.name} logo`}
          className={`h-auto w-full max-w-full object-contain ${logo.imageClassName}`}
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className="partner-logo flex items-center justify-center">
      <span className="text-[1.1rem] font-semibold tracking-[-0.02em] text-slate-700">{item.name}</span>
    </div>
  )
}

export function PartnersSection({ items }: PartnersSectionProps) {
  const revealRefs = useRef<HTMLElement[]>([])
  const visibleItems = items.filter((item) => item.id in partnerLogos)
  const marqueeItems = [...visibleItems, ...visibleItems]

  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => revealRefs.current,
    from: { y: 34, opacity: 0 },
    to: { stagger: 0.1, duration: 0.72 },
  })

  return (
    <section ref={sectionRef} className="partners-section relative overflow-hidden pt-[108px] pb-[58px] md:pt-26 md:pb-22">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fbfdff_0%,#ffffff_54%,#f8fbff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(246,196,69,0.16),transparent_18%),radial-gradient(circle_at_84%_22%,rgba(24,74,168,0.07),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.78),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f6c445]/28 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div
          ref={(element) => {
            if (element) {
              revealRefs.current[0] = element
            }
          }}
        >
          <SectionHeading
            eyebrow="Klien dan Partner"
            title="Dipercaya bisnis yang ingin tumbuh serius."
            description="Kami membantu brand tampil lebih profesional dan lebih siap memenangkan kepercayaan calon klien."
            centered
          />
        </div>
      </div>

      <div
        ref={(element) => {
          if (element) {
            revealRefs.current[1] = element
          }
        }}
        className="relative z-10 mt-15 w-full px-6 md:px-8 lg:px-10 xl:px-12"
      >
        <div className="partners-marquee-shell overflow-hidden">
          <div className="partners-marquee flex w-max items-center gap-12 sm:gap-14 md:gap-16 lg:gap-[4.5rem]">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                aria-label={item.name}
                className="flex h-24 w-[17rem] shrink-0 items-center justify-center sm:h-[6.25rem] sm:w-[19rem] md:h-28 md:w-[21rem] lg:h-[7.25rem] lg:w-[22rem]"
              >
                <PartnerLogo item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
