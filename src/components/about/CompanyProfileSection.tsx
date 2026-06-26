import { useRef, type ReactNode } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { CompanyProfileContent } from '../../types/about'
import { SectionHeading } from '../home/SectionHeading'

interface CompanyProfileSectionProps {
  content: CompanyProfileContent
}

const HIGHLIGHT_WORDS = ['website', 'aplikasi', 'aset bisnis', 'kepercayaan', 'pertumbuhan', 'solusi', 'digital', 'profesional']

function highlightText(text: string): ReactNode {
  const parts = text.split(/(\bwebsite\b|\baset bisnis\b|\bkepercayaan\b|\bpertumbuhan\b)/gi)

  return parts.map((part, i) => {
    const isHighlight = HIGHLIGHT_WORDS.some((word) => word.toLowerCase() === part.toLowerCase())

    return isHighlight ? (
      <span key={i} className="font-semibold text-[#c49019]">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  })
}

export function CompanyProfileSection({ content }: CompanyProfileSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const sideRef = useRef<HTMLDivElement>(null)

  const sectionRef = useGsapReveal<HTMLElement>({
    from: { y: 24, opacity: 0 },
    to: { duration: 0.72 },
    targets: () => [contentRef.current, sideRef.current],
    threshold: 0.14,
  })

  return (
    <section
      ref={sectionRef}
      id="company-profile"
      className="relative overflow-hidden py-18 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fffdfa_0%,#fffefb_42%,#f8fbff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(246,196,69,0.14),transparent_18%),radial-gradient(circle_at_86%_82%,rgba(24,74,168,0.08),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.88),transparent_30%)]" />

      <div className="mx-auto relative z-10 w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow={content.title}
          title="Fondasi yang Membuat Bisnis Lebih Meyakinkan"
          description="Kami membangun company profile dengan struktur informasi yang rapi, desain yang modern, dan pesan yang mudah dipahami calon klien."
          centered={false}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div ref={contentRef} className="space-y-5">
            {content.paragraphs.map((paragraph, i) => (
              <div
                key={i}
                className="relative rounded-[1.6rem] border border-[#d7e3f7] bg-white/78 px-6 py-5 shadow-[0_18px_44px_-34px_rgba(11,31,87,0.22)] backdrop-blur-sm"
              >
                <div
                  className={`absolute left-0 top-0 h-full w-1 rounded-l-[1.6rem] ${
                    i === 0
                      ? 'bg-gradient-to-b from-[#f6c445]/85 via-[#f6c445]/30 to-transparent'
                      : 'bg-gradient-to-b from-[#184aa8]/45 via-[#184aa8]/20 to-transparent'
                  }`}
                />
                <p className="pl-2 text-base leading-8 text-slate-600 md:text-[1.05rem]">
                  {i === 0 ? highlightText(paragraph) : paragraph}
                </p>
              </div>
            ))}

            <blockquote className="relative overflow-hidden rounded-[1.75rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] px-7 py-6 shadow-[0_22px_52px_-36px_rgba(11,31,87,0.24)]">
              <div className="absolute right-5 top-4 text-7xl font-black leading-none text-[#184aa8]/8" style={{ fontFamily: 'Georgia, serif' }}>
                "
              </div>
              <p className="max-w-3xl text-base italic leading-8 text-slate-600 md:text-lg">
                Kami percaya bahwa website bukan hanya tampilan, tetapi{' '}
                <span className="not-italic font-semibold text-[#c49019]">aset bisnis</span> yang membangun kepercayaan dan mendorong pertumbuhan.
              </p>
            </blockquote>
          </div>

          <div ref={sideRef} className="flex flex-col gap-4">
            <div className="rounded-[1.75rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(242,247,255,0.98))] p-6 shadow-[0_22px_48px_-38px_rgba(11,31,87,0.24)]">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#c49019]">
                Identitas
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Nama', value: 'Morrus Digital Connecting' },
                  { label: 'Bidang', value: 'Digital Agency / Web Dev' },
                  { label: 'Domisili', value: 'Gresik, Jawa Timur' },
                  { label: 'Fokus', value: 'Website & Aplikasi' },
                ].map((item) => (
                  <div key={item.label} className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-blue-500/55">
                      {item.label}
                    </span>
                    <div className="text-sm font-medium text-[#0b1f57]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '120+', label: 'Projects' },
                { value: '94%', label: 'Retensi' },
                { value: '3+', label: 'Tahun' },
                { value: '95+', label: 'Skor' },
              ].map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[1.35rem] border border-[#d7e3f7] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] px-4 py-5 text-center shadow-[0_18px_40px_-34px_rgba(11,31,87,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#184aa8]/18"
                >
                  <p className="text-[1.65rem] font-extrabold leading-none text-[#f6c445]" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-500/60">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
