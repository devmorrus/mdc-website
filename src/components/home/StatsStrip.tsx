import type { StatItem } from '../../types/home'

interface StatsStripProps {
  stats: StatItem[]
}

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <section className="border-b border-white/10 bg-slate-900/50">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-3 px-6 py-6 sm:grid-cols-3">
        {stats.map((item) => (
          <article key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-2xl font-semibold text-white">{item.value}</p>
            <p className="mt-1 text-sm text-slate-300">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
