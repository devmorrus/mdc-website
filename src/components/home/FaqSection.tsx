import { useState } from 'react'
import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'

interface FaqItem {
  id: string
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'timeline',
    question: 'Berapa lama estimasi pembuatan sistem atau aplikasi?',
    answer:
      'Durasi mengikuti kompleksitas fitur. Website company profile biasanya 2-3 minggu, sementara sistem atau aplikasi yang lebih kompleks dapat berjalan 3-6 bulan dengan progress berkala.',
  },
  {
    id: 'ownership',
    question: 'Apakah source code menjadi milik klien setelah proyek selesai?',
    answer:
      'Ya. Setelah ruang lingkup dan administrasi proyek diselesaikan, source code serta hak penggunaan hasil kerja kami serahkan kepada klien sesuai kesepakatan kerja sama.',
  },
  {
    id: 'warranty',
    question: 'Apakah ada layanan garansi dan maintenance?',
    answer:
      'Ada. Kami menyediakan masa garansi bug fixing setelah rilis, lalu bisa dilanjutkan dengan paket maintenance untuk monitoring, update, dan dukungan teknis rutin.',
  },
  {
    id: 'security',
    question: 'Standar keamanan seperti apa yang diterapkan?',
    answer:
      'Kami menerapkan pendekatan security by design, mulai dari validasi input, proteksi akses, enkripsi data, hingga praktik pengembangan yang mengacu pada standar keamanan web modern.',
  },
]

export function FaqSection() {
  const [openItemId, setOpenItemId] = useState<string>(FAQ_ITEMS[0]?.id ?? '')
  const itemsRef = useRef<HTMLElement[]>([])
  const sectionRef = useGsapReveal<HTMLElement>({
    targets: () => itemsRef.current,
    to: { stagger: 0.08 },
  })

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_100%)] py-18 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(24,74,168,0.06),transparent_18%),radial-gradient(circle_at_84%_76%,rgba(246,196,69,0.09),transparent_16%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="text-center lg:col-span-5 lg:self-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#c49019]">
            Pertanyaan Umum
          </p>
          <h2
            className="mt-4 text-3xl font-bold leading-tight text-[#0b1f57] md:text-4xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Jawaban cepat untuk hal yang paling sering ditanyakan sebelum proyek dimulai.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 lg:mx-0">
            Ringkasan seputar durasi pengerjaan, kepemilikan source code, maintenance, dan standar keamanan yang kami terapkan.
          </p>
        </div>

        <div className="space-y-4 lg:col-span-7 lg:col-start-6">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = item.id === openItemId
            const panelId = `faq-panel-${item.id}`
            const buttonId = `faq-button-${item.id}`

            return (
              <article
                key={item.id}
                ref={(element) => {
                  if (element) {
                    itemsRef.current[index] = element
                  }
                }}
                className={`overflow-hidden rounded-[1.5rem] border bg-white transition duration-300 ${
                  isOpen
                    ? 'border-[#c7d4ff] shadow-[0_22px_55px_-40px_rgba(24,74,168,0.28)]'
                    : 'border-slate-200 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.16)] hover:border-[#d9e2ff]'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenItemId((current) => (current === item.id ? '' : item.id))}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span
                      className={`text-base font-bold leading-7 md:text-[1.1rem] ${
                        isOpen ? 'text-[#0b1f57]' : 'text-[#1a2b4c]'
                      }`}
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                        isOpen
                          ? 'border-[#4f46e5] bg-[#4f46e5] text-white rotate-180'
                          : 'border-slate-200 bg-slate-50 text-slate-400'
                      }`}
                      aria-hidden="true"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm leading-7 text-slate-600 md:text-[0.97rem]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
