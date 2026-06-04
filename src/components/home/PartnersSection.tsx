import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { PartnerItem } from '../../types/home'
import { SectionHeading } from './SectionHeading'

interface PartnersSectionProps {
  items: PartnerItem[]
}

function PartnerLogo({ item }: { item: PartnerItem }) {
  if (item.id === '1') {
    return (
      <div className="partner-logo flex flex-col items-center justify-center">
        <div className="text-[2rem] font-black tracking-[-0.04em] text-slate-700">JalaDewa</div>
        <div className="text-[0.65rem] uppercase tracking-[0.34em] text-slate-400">Group</div>
      </div>
    )
  }

  if (item.id === '2') {
    return (
      <div className="partner-logo flex items-center justify-center gap-3">
        <div className="h-7 w-7 rounded-sm bg-slate-700" />
        <span className="text-[1.55rem] font-bold tracking-[-0.03em] text-slate-700">Focus Trading</span>
      </div>
    )
  }

  if (item.id === '3') {
    return (
      <div className="partner-logo flex items-end justify-center gap-1">
        <span className="text-[2rem] font-serif italic font-bold text-slate-700">DAT</span>
        <span className="pb-1 text-[1rem] text-slate-700">Indonesia</span>
      </div>
    )
  }

  if (item.id === '4') {
    return (
      <div className="partner-logo flex flex-col items-center justify-center">
        <div className="border-b-2 border-slate-700 pb-1 text-[1.45rem] font-bold uppercase text-slate-700">Nusa</div>
        <div className="mt-1 text-[0.72rem] tracking-[0.25em] text-slate-400">Integrasi</div>
      </div>
    )
  }

  if (item.id === '5') {
    return (
      <div className="partner-logo flex items-center justify-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-slate-700">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        </div>
        <span className="text-[1.35rem] font-bold leading-none text-slate-700">Astra<br />Karya</span>
      </div>
    )
  }

  return (
    <div className="partner-logo flex items-center justify-center">
      <span className="text-[1.55rem] font-bold tracking-[-0.04em] text-slate-700">
        URBAN<span className="font-light">LOGISTIK</span>
      </span>
    </div>
  )
}

export function PartnersSection({ items }: PartnersSectionProps) {
	const cardsRef = useRef<HTMLElement[]>([])
	const marqueeItems = [...items, ...items]
	const sectionRef = useGsapReveal<HTMLElement>({
		targets: () => cardsRef.current,
		to: { stagger: 0.06 },
	})

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(246,196,69,0.07),transparent_16%),radial-gradient(circle_at_84%_76%,rgba(24,74,168,0.05),transparent_16%)]" />
      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Klien dan Partner"
          title="Area logo partner untuk memperkuat kepercayaan"
          description="Untuk tahap awal, section ini memakai logo placeholder. Nanti bisa diganti ke logo resmi tanpa mengubah struktur layout."
          centered
        />

		<div className="mx-auto mt-16 w-full max-w-5xl overflow-hidden">
			<div className="partners-marquee flex w-max items-center gap-10 md:gap-16 lg:gap-20">
				{marqueeItems.map((item, index) => (
					<div
						key={`${item.id}-${index}`}
						ref={(element) => {
							if (element) {
								cardsRef.current[index] = element
							}
						}}
						aria-label={item.name}
						className="flex h-16 w-32 shrink-0 items-center justify-center transition duration-300 md:h-20 md:w-40 lg:w-44"
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
