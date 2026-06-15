import { useRef } from 'react'
import logoDefert from '../../assets/logo-defert.png'
import logoFtc from '../../assets/logo-ftc.png'
import logoJaladewa from '../../assets/logo-jaladewa.png'
import logoMcb from '../../assets/logo-mcb.png'
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
  const cardsRef = useRef<HTMLElement[]>([])
  const visibleItems = items.filter((item) => item.id in partnerLogos)
  const marqueeItems = [...visibleItems, ...visibleItems]
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => cardsRef.current,
    to: { stagger: 0.06 },
  })

  return (
    <section
      ref={sectionRef}
      className="partners-section relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] pt-[100px] pb-[50px] md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(246,196,69,0.07),transparent_16%),radial-gradient(circle_at_84%_76%,rgba(24,74,168,0.05),transparent_16%)]" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Klien dan Partner"
          title="Dipercaya oleh para pemimpin industri"
          description="Berkolaborasi dengan organisasi yang berpikiran maju untuk menghadirkan solusi digital transformatif."
          centered
        />
      </div>

      <div className="relative z-10 mt-16 w-full px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="overflow-hidden">
          <div className="partners-marquee flex w-max items-center gap-12 sm:gap-14 md:gap-16 lg:gap-[4.5rem]">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                ref={(element) => {
                  if (element) {
                    cardsRef.current[index] = element
                  }
                }}
                aria-label={item.name}
                className="flex h-24 w-[17rem] shrink-0 items-center justify-center transition duration-300 sm:h-[6.25rem] sm:w-[19rem] md:h-28 md:w-[21rem] lg:h-[7.25rem] lg:w-[22rem]"
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
