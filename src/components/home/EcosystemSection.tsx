import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { EcosystemItem } from '../../types/home'

interface EcosystemSectionProps {
  items: EcosystemItem[]
}

const toneClasses: Record<EcosystemItem['tone'], {
  line: string
  label: string
  icon: string
  surface: string
  button: string
  visual: string
  dot: string
}> = {
  blue: {
    line: 'bg-[#1d6fd8]',
    label: 'text-[#184aa8]',
    icon: 'border-[#c9dbf4] bg-[#eef5ff] text-[#184aa8]',
    surface: 'border-[#cddcf2] bg-[#fbfdff]',
    button: 'bg-[#0f2f78] text-white hover:bg-[#184aa8]',
    visual: 'border-[#d5e2f5] bg-[#eef5ff]',
    dot: 'bg-[#184aa8]',
  },
  gold: {
    line: 'bg-[#f6c445]',
    label: 'text-[#a97416]',
    icon: 'border-[#efd795] bg-[#fff4ce] text-[#a97416]',
    surface: 'border-[#ecdca8] bg-[#fffdf6]',
    button: 'bg-[#f6c445] text-[#0b1f57] hover:bg-[#ffd15c]',
    visual: 'border-[#eedda9] bg-[#fff7d9]',
    dot: 'bg-[#d49a1a]',
  },
  green: {
    line: 'bg-[#16a06f]',
    label: 'text-[#127754]',
    icon: 'border-[#c4e4d6] bg-[#e9f8f1] text-[#127754]',
    surface: 'border-[#c8e4d7] bg-[#fbfffc]',
    button: 'bg-[#127754] text-white hover:bg-[#16956a]',
    visual: 'border-[#cde7da] bg-[#ecf9f3]',
    dot: 'bg-[#16a06f]',
  },
}

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')
}

function EcosystemActionLink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: ReactNode
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  )
}

function EcosystemIcon({ id }: { id: EcosystemItem['id'] }) {
  if (id === 'academy') {
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.5 12 3l8 3.5-8 3.5-8-3.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 9v5.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V9" />
      </svg>
    )
  }

  if (id === 'pos') {
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14v10H5V5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 19h10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9h3m2 0h3M8 12h8" />
      </svg>
    )
  }

  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7.5h16M6 5h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 13h3m3 0h2M8 16h8" />
    </svg>
  )
}

function EcosystemPreview({ id, tone }: { id: EcosystemItem['id']; tone: EcosystemItem['tone'] }) {
  const visual = toneClasses[tone]

  if (id === 'academy') {
    return (
      <div className={`relative h-full min-h-[13rem] overflow-hidden rounded-[1.1rem] border p-4 ${visual.visual}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#0b1f57]">Academy Track</p>
            <p className="mt-1 text-[0.72rem] text-slate-500">Sertifikasi dan bootcamp</p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-bold text-[#a97416] shadow-sm">Live</span>
        </div>
        <div className="mt-5 space-y-3">
          {['Fundamental', 'Project Lab', 'Certification'].map((label, index) => (
            <div key={label} className="grid grid-cols-[5rem_1fr] items-center gap-3">
              <span className="text-[0.7rem] font-semibold text-slate-500">{label}</span>
              <span className="h-2 overflow-hidden rounded-full bg-white">
                <span
                  className="block h-full rounded-full bg-[#f6c445]"
                  style={{ width: `${index === 0 ? 88 : index === 1 ? 62 : 42}%` }}
                />
              </span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
          {['Mentor', 'Online', 'Batch'].map((label) => (
            <span key={label} className="rounded-xl bg-white px-2 py-2 text-center text-[0.68rem] font-bold text-[#0b1f57] shadow-sm">
              {label}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (id === 'pos') {
    return (
      <div className={`relative h-full min-h-[13rem] overflow-hidden rounded-[1.1rem] border p-4 ${visual.visual}`}>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-[0.72rem] font-bold text-slate-500">
            <span>Morrus POS</span>
            <span>Today</span>
          </div>
          <div className="mt-4 text-2xl font-extrabold text-[#0b1f57]">Rp 4.8jt</div>
          <div className="mt-1 text-[0.72rem] text-slate-500">Penjualan tercatat</div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {['Kasir', 'Stok', 'Laporan'].map((label) => (
            <span key={label} className="rounded-xl bg-white px-2 py-3 text-center text-[0.68rem] font-bold text-[#127754] shadow-sm">
              {label}
            </span>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-[#127754] px-4 py-3 text-sm font-bold text-white shadow-[0_14px_28px_-20px_rgba(18,119,84,0.8)]">
          128 transaksi
        </div>
      </div>
    )
  }

  return (
    <div className={`relative h-full min-h-[13rem] overflow-hidden rounded-[1.1rem] border p-4 ${visual.visual}`}>
      <div className="rounded-xl bg-white shadow-sm">
        <div className="flex h-9 items-center gap-1.5 border-b border-[#d9e5f7] px-3">
          <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
          <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
          <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
        </div>
        <div className="p-4">
          <div className="h-3 w-24 rounded-full bg-[#184aa8]/20" />
          <div className="mt-4 h-8 rounded-lg bg-[#184aa8]" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <span className="h-12 rounded-lg bg-[#dce8ff]" />
            <span className="h-12 rounded-lg bg-[#edf4ff]" />
            <span className="h-12 rounded-lg bg-[#dce8ff]" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
        <span className="rounded-xl bg-white px-3 py-2 text-[0.68rem] font-bold text-[#184aa8] shadow-sm">Web App</span>
        <span className="rounded-xl bg-white px-3 py-2 text-[0.68rem] font-bold text-[#184aa8] shadow-sm">Dashboard</span>
      </div>
    </div>
  )
}

export function EcosystemSection({ items }: EcosystemSectionProps) {
  const panelRefs = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => panelRefs.current,
    from: { y: 18, autoAlpha: 0 },
    to: { stagger: 0.08, duration: 0.86 },
  })

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative overflow-hidden bg-[#f7fbff] py-24 md:py-30"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(244,248,255,0.9) 100%), linear-gradient(to right, rgba(11,31,87,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,31,87,0.045) 1px, transparent 1px)',
          backgroundSize: 'auto, 44px 44px, 44px 44px',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs font-bold uppercase text-[#c49019]">
            Ekosistem Morrus
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-[#0b1f57] md:text-5xl" style={{ fontFamily: "'Sora', sans-serif" }}>
            Bukan hanya jasa, tapi tiga mesin pertumbuhan.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
            Morrus Digital Connecting bergerak sebagai payung untuk membangun produk digital, meningkatkan skill, dan merapikan operasional bisnis.
          </p>

          <div className="mt-9 overflow-hidden rounded-[1.4rem] border border-[#d2deef] bg-white shadow-[0_24px_70px_-52px_rgba(11,31,87,0.28)]">
            <div className="border-b border-[#e1e8f4] px-6 py-5">
              <p className="text-sm font-bold text-[#0b1f57]">Morrus Digital Connecting</p>
              <p className="mt-1 text-sm text-slate-500">Build. Learn. Operate.</p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-[#e1e8f4]">
              {items.map((item, index) => {
                const tone = toneClasses[item.tone]

                return (
                  <div key={item.id} className="px-4 py-5 text-center">
                    <span className={`mx-auto block h-2 w-2 rounded-full ${tone.dot}`} />
                    <p className="mt-3 text-[0.72rem] font-bold text-[#0b1f57]">{String(index + 1).padStart(2, '0')}</p>
                    <p className="mt-1 text-[0.7rem] leading-5 text-slate-500">{item.label.replace('Morrus ', '')}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-[#cfdcf0] lg:block" />

          <div className="space-y-6">
            {items.map((item, index) => {
              const tone = toneClasses[item.tone]

              return (
                <article
                  key={item.id}
                  ref={(element) => {
                    if (element) {
                      panelRefs.current[index] = element
                    }
                  }}
                  className={`relative grid gap-5 overflow-hidden rounded-[1.35rem] border p-5 transition duration-[520ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-[2px] md:grid-cols-[1fr_17rem] ${tone.surface}`}
                >
                  <span className={`absolute left-0 top-0 h-full w-1 ${tone.line}`} />
                  <span className={`absolute left-[1.35rem] top-8 hidden h-3 w-3 rounded-full ring-8 ring-[#f7fbff] lg:block ${tone.dot}`} />

                  <div className="flex min-h-[16rem] flex-col pl-0 md:pl-3">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${tone.icon}`}>
                        <EcosystemIcon id={item.id} />
                      </div>
                      <div>
                        <p className={`text-xs font-bold uppercase ${tone.label}`}>
                          {item.label}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold leading-snug text-[#0b1f57]" style={{ fontFamily: "'Sora', sans-serif" }}>
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.points.map((point) => (
                        <span key={point} className="rounded-full border border-[#d7e3f2] bg-white px-3 py-2 text-xs font-semibold text-slate-700">
                          {point}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-7">
                      <EcosystemActionLink
                        href={item.href}
                        className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition duration-[420ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-px ${tone.button}`}
                      >
                        {item.ctaLabel}
                      </EcosystemActionLink>
                    </div>
                  </div>

                  <EcosystemPreview id={item.id} tone={item.tone} />
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
