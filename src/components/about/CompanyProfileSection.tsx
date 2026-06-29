import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import type { CompanyProfileContent } from '../../types/about'

interface CompanyProfileSectionProps {
  content: CompanyProfileContent
}

export function CompanyProfileSection({ content }: CompanyProfileSectionProps) {
  const sectionRef = useGsapReveal<HTMLElement>({
    from: { y: 28, opacity: 0 },
    to: { duration: 0.75 },
    threshold: 0.12,
  })

  const introRef = useRef<HTMLDivElement>(null)
  const identityRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} id="company-profile" className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f6c445] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f6c445]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-700">Profil Perusahaan</span>
          </div>

          <h2
            className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.12] tracking-tight text-[#0f172a] sm:text-5xl lg:text-7xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Fondasi yang Membuat Bisnis Lebih Meyakinkan
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Kami membangun company profile dengan struktur informasi yang rapi, desain yang modern, dan pesan yang mudah dipahami calon klien untuk memaksimalkan konversi bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div
            ref={introRef}
            className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-colors duration-300 hover:border-[#184aa8]/30 lg:col-span-7 sm:p-10"
          >
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-slate-100 blur-2xl" />
            <div className="absolute left-0 top-0 h-full w-1.5 rounded-l-[2rem] bg-gradient-to-b from-[#184aa8] to-cyan-400" />

            <div className="relative z-10">
              <h3 className="mb-4 text-2xl font-bold text-[#0f172a]">{content.title}</h3>
              <div className="space-y-5 text-lg leading-relaxed text-slate-600">
                <p>
                  {content.paragraphs[0] ?? ''}
                </p>
                <p>
                  {content.paragraphs[1] ?? ''}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium text-slate-500">
                <div className="inline-flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5">
                  <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Modern Tech Stack
                </div>
                <div className="inline-flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5">
                  <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Scalable Architecture
                </div>
              </div>
            </div>
          </div>

          <div
            ref={identityRef}
            className="group relative overflow-hidden rounded-[2rem] border border-slate-800 bg-gradient-to-br from-[#0f172a] to-slate-900 p-8 shadow-xl lg:col-span-5 sm:p-10"
          >
            <div className="absolute top-0 right-0 -mr-10 -mt-10 h-48 w-48 rounded-full bg-blue-500/10 blur-2xl" />

            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Identitas Resmi</h3>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f6c445]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4" />
                </svg>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-6">
              {[
                { label: 'Nama Perusahaan', value: 'CV Morrus Digital Connecting' },
                { label: 'Bidang Industri', value: 'Teknologi' },
                { label: 'Domisili Kantor', value: 'Surabaya, Jawa Timur' },
                { label: 'Fokus Layanan', value: 'Web & App Dev' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{item.label}</p>
                  <p className="text-sm font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={quoteRef}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0f172a] to-slate-800 p-8 text-white shadow-xl lg:col-span-7 sm:p-10"
          >
            <div className="absolute -right-4 -top-8 select-none font-serif text-[12rem] leading-none text-white/5">"</div>
            <div className="relative z-10">
              <svg className="mb-6 h-10 w-10 text-[#f6c445] opacity-90" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-xl font-light italic leading-relaxed text-slate-300 md:text-2xl">
                Kami percaya bahwa website bukan hanya sekadar tampilan visual, tetapi{' '}
                <span className="rounded bg-white/10 px-1.5 py-0.5 font-medium not-italic text-white">aset bisnis strategis</span> yang membangun kepercayaan dan secara aktif mendorong pertumbuhan.
              </p>
            </div>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 gap-4 lg:col-span-5">
            {[
              { value: '120+', label: 'Total Proyek', accent: 'text-[#f6c445]' },
              { value: '94%', label: 'Retensi Klien', accent: 'text-[#184aa8]' },
              { value: '3+', label: 'Tahun Exp', accent: 'text-emerald-500' },
              { value: '95+', label: 'Skor Kinerja', accent: 'text-purple-500' },
            ].map((stat) => (
              <article
                key={stat.label}
                className="group flex flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <p
                  className={`mb-2 text-4xl font-extrabold text-[#0f172a] transition-colors ${stat.accent}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
