import type { ReactNode } from 'react'
import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { SectionHeading } from './SectionHeading'

interface ProcessStep {
  id: string
  title: string
  description: string
  colorClass: string
  textClass: string
  icon: ReactNode
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: '01',
    title: 'Konsultasi & Analisis',
    description: 'Memahami kebutuhan inti dan menyusun arah proyek yang jelas.',
    colorClass: 'bg-[#2f6df6]',
    textClass: 'text-[#2f6df6]',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 10.5h10m-10 3h6m-7.5 5.25L4 20l1.25-3.5A7.25 7.25 0 014 11.75v-2.5A5.25 5.25 0 019.25 4h5.5A5.25 5.25 0 0120 9.25v2.5A5.25 5.25 0 0114.75 17h-4a7.2 7.2 0 00-5.25 2.25z"
        />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Desain UI/UX',
    description: 'Menerjemahkan ide menjadi tampilan yang intuitif dan menarik.',
    colorClass: 'bg-[#8b3cf1]',
    textClass: 'text-[#8b3cf1]',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 19.5l6-1.5L18.75 9.75a2.121 2.121 0 10-3-3L7.5 15l-3 4.5z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 8.25l1.5 1.5" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Pengembangan',
    description: 'Membangun sistem yang rapi, aman, dan siap digunakan.',
    colorClass: 'bg-[#5a4df0]',
    textClass: 'text-[#5a4df0]',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 8.25L4.5 12l3.75 3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.25L19.5 12l-3.75 3.75" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'QA & Testing',
    description: 'Menguji fitur utama, performa, dan stabilitas aplikasi.',
    colorClass: 'bg-[#ef1f5f]',
    textClass: 'text-[#ef1f5f]',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3l6 2.25v5.13c0 4.09-2.56 7.76-6 9.12-3.44-1.36-6-5.03-6-9.12V5.25L12 3z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 11.75l1.5 1.5 3-3.5" />
      </svg>
    ),
  },
  {
    id: '05',
    title: 'Deployment',
    description: 'Merilis aplikasi ke lingkungan produksi dengan aman.',
    colorClass: 'bg-[#f97316]',
    textClass: 'text-[#f97316]',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5c2.2 2.31 4.25 5.14 4.25 8.25A4.25 4.25 0 118 12.75c0-3.11 2.05-5.94 4-8.25z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5V9m0 0l-2 2m2-2l2 2" />
      </svg>
    ),
  },
  {
    id: '06',
    title: 'Maintenance',
    description: 'Menjaga sistem tetap terpantau, stabil, dan terbarui.',
    colorClass: 'bg-[#0f9f97]',
    textClass: 'text-[#0f9f97]',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.25 5.25a4.5 4.5 0 00-5.84 5.84L4.5 15v4.5H9l3.91-3.91a4.5 4.5 0 005.84-5.84l-2.9 2.9-2.7-.3-.3-2.7 2.9-2.9z"
        />
      </svg>
    ),
  },
]

export function ProcessTimelineSection() {
  const stepsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => stepsRef.current,
    to: { stagger: 0.08 },
  })

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f4f8ff_0%,#ffffff_54%,#f8fbff_100%)] py-18 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(99,102,241,0.1),transparent_20%),radial-gradient(circle_at_86%_30%,rgba(59,130,246,0.12),transparent_18%),radial-gradient(circle_at_48%_82%,rgba(15,159,151,0.08),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c7d4ff] to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Metodologi Kami"
          title="Proses kerja dari ide hingga realita."
          description="Setiap proyek kami jalankan dengan alur yang jelas, transparan, dan mudah diikuti agar hasil akhirnya rapi dari sisi bisnis maupun teknis."
          centered
        />

        <div className="relative mt-14 lg:mt-20">
          <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-6 lg:gap-y-0">
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0

              return (
                <article
                  key={step.id}
                  ref={(element) => {
                    if (element) {
                      stepsRef.current[index] = element
                    }
                  }}
                  className={`group relative flex flex-col items-center px-4 text-center ${
                    isEven ? 'lg:pb-30' : 'lg:pt-30'
                  }`}
                >
                  {index !== PROCESS_STEPS.length - 1 ? (
                    <div
                      className="absolute left-1/2 top-16 hidden h-30 w-full -translate-x-[2%] lg:block"
                      aria-hidden="true"
                    >
                      <svg
                        preserveAspectRatio="none"
                        viewBox="0 0 100 100"
                        className="h-full w-full"
                      >
                        <path
                          d={isEven ? 'M0,0 C50,0 50,100 100,100' : 'M0,100 C50,100 50,0 100,0'}
                          stroke="rgba(99,102,241,0.24)"
                          strokeWidth="3"
                          fill="none"
                          vectorEffect="non-scaling-stroke"
                          strokeDasharray="5 7"
                        />
                      </svg>
                    </div>
                  ) : null}

                  {index !== PROCESS_STEPS.length - 1 ? (
                    <div
                      className="absolute left-1/2 top-16 h-[calc(100%+1.5rem)] w-px -translate-x-1/2 border-l-2 border-dashed border-[#cdd7ff] lg:hidden"
                      aria-hidden="true"
                    />
                  ) : null}

                  <div
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-white shadow-[0_18px_40px_-20px_rgba(15,23,42,0.42)] transition duration-300 group-hover:-translate-y-1 group-hover:scale-110 ${step.colorClass}`}
                  >
                    {step.icon}
                  </div>

                  <div className="relative z-10 mt-6 max-w-[13rem] px-3 py-2">
                    <div
                      className={`text-5xl font-black leading-none tracking-tight ${step.textClass}`}
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {step.id}
                    </div>
                    <h3
                      className="mt-3 text-xl font-bold leading-tight text-[#10224f]"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-500 md:text-[0.95rem]">
                      {step.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
