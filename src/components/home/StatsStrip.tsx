import type { StatItem } from '../../types/home'

interface StatsStripProps {
  stats: StatItem[]
}

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <section className="border-b border-blue-900/30 bg-blue-950/55">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-3 px-6 py-6 sm:grid-cols-3">
        {stats.map((item) => (
          <article key={item.label} className="rounded-xl border border-blue-200/20 bg-linear-to-br from-blue-400/10 to-amber-300/10 p-4 backdrop-blur-sm">
            <p className="text-2xl font-semibold text-blue-50">{item.value}</p>
            <p className="mt-1 text-sm text-blue-100/80">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
