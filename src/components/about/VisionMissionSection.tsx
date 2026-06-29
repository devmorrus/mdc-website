import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { VisionMissionContent } from '../../types/about'

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
    <section ref={sectionRef} id="vision-mission" className="relative overflow-hidden bg-white py-20 lg:py-32 border-t border-slate-100">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-24">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#184aa8]">Arah Strategis</p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl">
            Visi yang Jelas, Eksekusi yang Terukur
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Kami menjaga visi perusahaan tetap tajam dan misi tetap operasional, supaya setiap langkah pengembangan digital tetap memiliki arah bisnis yang jelas.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div
            ref={visionRef}
            className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl lg:p-14"
          >
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-amber-500/20 blur-2xl" />

            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest text-white">Visi Kami</span>
              </div>

              <h3 className="font-heading text-3xl font-semibold leading-snug text-white md:text-4xl">
                {content.vision}
              </h3>
            </div>

            <div className="relative z-10 mt-10 border-t border-white/10 pt-8">
              <p className="text-sm text-slate-400">Berkomitmen pada pertumbuhan jangka panjang dan inovasi berkelanjutan.</p>
            </div>
          </div>

          <div
            ref={missionRef}
            className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 p-10 lg:p-14"
          >
            <div className="absolute top-0 right-0 h-28 w-28 rounded-bl-[80px] bg-[linear-gradient(225deg,rgba(246,196,69,0.12),transparent)]" />

            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-[#184aa8]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-[#0f172a]">Misi Perusahaan</span>
              </div>

              <ul className="space-y-6">
                {content.missions.map((mission, index) => (
                  <li key={index} className="group flex items-start gap-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-bold text-[#184aa8] shadow-sm transition-colors group-hover:bg-[#184aa8] group-hover:text-white">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-slate-700 leading-relaxed">{mission}</p>
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
