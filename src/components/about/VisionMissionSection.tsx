import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { VisionMissionContent } from '../../types/about'
import { VisionCanvasOpt } from '../../three/OptimizedCanvases'
import { SectionHeading } from '../home/SectionHeading'

interface VisionMissionSectionProps {
  content: VisionMissionContent
}

export function VisionMissionSection({ content }: VisionMissionSectionProps) {
  const visionRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)

  const sectionRef = useGsapReveal<HTMLElement>({
    from: { y: 28, opacity: 0 },
    to: { duration: 0.75 },
    targets: () => [visionRef.current, missionRef.current],
    threshold: 0.12,
  })

  return (
    <section
      ref={sectionRef}
      id="vision-mission"
      className="relative overflow-hidden py-18 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f3f8ff_0%,#edf4ff_48%,#f7faff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(24,74,168,0.12),transparent_20%),radial-gradient(circle_at_18%_84%,rgba(110,168,255,0.12),transparent_24%),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.9),transparent_30%)]" />

      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Visi & Misi"
          title="Arah yang Jelas, Eksekusi yang Terukur"
          description="Kami menjaga visi perusahaan tetap tajam dan misi tetap operasional, supaya setiap langkah pengembangan tetap punya arah bisnis yang jelas."
          centered={false}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div
            ref={visionRef}
            className="relative overflow-hidden rounded-[2rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] shadow-[0_26px_60px_-42px_rgba(11,31,87,0.24)]"
          >
            <div className="absolute inset-0 opacity-28">
              <VisionCanvasOpt />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(239,245,255,0.92))]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f6c445]/50 to-transparent" />

            <div className="relative z-10 p-8 md:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#f6c445]/30 bg-[#fff2bf] text-[#c49019]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c49019]">Visi</p>
              </div>

              <p className="max-w-xl text-2xl font-bold leading-snug text-[#0b1f57] md:text-[2.15rem]" style={{ fontFamily: "'Sora', sans-serif" }}>
                {content.vision}
              </p>

              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#d7e3f7] bg-white/75 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-blue-500/70 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f6c445]" />
                Partner digital untuk pertumbuhan serius
              </div>
            </div>
          </div>

          <div
            ref={missionRef}
            className="relative overflow-hidden rounded-[2rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] shadow-[0_26px_60px_-42px_rgba(11,31,87,0.24)]"
          >
            <div className="absolute top-0 right-0 h-28 w-28 rounded-bl-[80px] bg-[linear-gradient(225deg,rgba(246,196,69,0.12),transparent)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#184aa8]/30 to-transparent" />

            <div className="relative z-10 p-8 md:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#184aa8]/20 bg-[#e8f1ff] text-[#184aa8]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#184aa8]">Misi</p>
              </div>

              <ul className="space-y-4">
                {content.missions.map((mission, i) => (
                  <li key={i} className="group flex items-start gap-4 rounded-[1.35rem] border border-[#d7e3f7] bg-white/72 px-4 py-4 shadow-[0_14px_32px_-28px_rgba(11,31,87,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#184aa8]/18">
                    <div className="shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl border border-[#f6c445]/25 bg-[#fff2bf] text-xs font-bold text-[#c49019] transition-all duration-300 group-hover:bg-[#ffe89e]">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="pt-1 text-sm leading-7 text-slate-600 md:text-base">
                      {mission}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
