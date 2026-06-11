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

const partnerLogos: Record<string, { src: string; className: string }> = {
  '1': { src: logoJaladewa, className: 'max-h-14 md:max-h-16' },
  '2': { src: logoFtc, className: 'max-h-12 md:max-h-14' },
  '3': { src: logoMcb, className: 'max-h-11 md:max-h-12' },
  '4': { src: logoDefert, className: 'max-h-14 md:max-h-16' },
}

function PartnerLogo({ item }: { item: PartnerItem }) {
  const logo = partnerLogos[item.id]

  if (logo) {
    return (
      <div className="partner-logo flex items-center justify-center">
        <img
          src={logo.src}
          alt={`${item.name} logo`}
          className={`h-auto w-full max-w-full object-contain ${logo.className}`}
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
          <div className="partners-marquee flex w-max items-center gap-14 md:gap-16 lg:gap-[4.5rem]">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                ref={(element) => {
                  if (element) {
                    cardsRef.current[index] = element
                  }
                }}
                aria-label={item.name}
                className="flex h-20 w-44 shrink-0 items-center justify-center transition duration-300 md:h-24 md:w-56 lg:w-60"
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
