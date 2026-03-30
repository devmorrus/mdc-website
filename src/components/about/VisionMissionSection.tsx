import type { VisionMissionContent } from '../../types/about'

interface VisionMissionSectionProps {
  content: VisionMissionContent
}

export function VisionMissionSection({ content }: VisionMissionSectionProps) {
  return (
    <section id="vision-mission" className="mx-auto w-full max-w-6xl px-6 py-4 md:py-6">
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-blue-200/20 bg-linear-to-br from-blue-900/35 to-blue-900/20 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Visi</p>
          <p className="mt-4 text-sm leading-relaxed text-blue-100/85 md:text-base">{content.vision}</p>
        </article>

        <article className="rounded-2xl border border-blue-200/20 bg-linear-to-br from-blue-900/35 to-amber-400/15 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Misi</p>
          <ul className="mt-4 space-y-3 text-sm text-blue-50/90 md:text-base">
            {content.missions.map((mission) => (
              <li key={mission} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-300" />
                <span>{mission}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
