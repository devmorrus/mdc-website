import { Link } from 'react-router-dom'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { SiteLayout } from '../layouts/SiteLayout'

const SUGGESTED_LINKS = [
  { label: 'Layanan', href: '/services' },
  { label: 'Portofolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontak', href: '/contact' },
]

export function NotFoundPage() {
  usePageMetadata({
    title: 'Halaman Tidak Ditemukan | Morrus Digital Connecting',
    description: 'Halaman yang Anda cari tidak tersedia. Kembali ke beranda Morrus Digital Connecting.',
    noIndex: true,
  })

  return (
    <SiteLayout headerVariant="hero" heroHeaderTone="solid">
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="rounded-[2rem] border border-[#d7e3f7] bg-white p-8 shadow-[0_18px_44px_-36px_rgba(11,31,87,0.22)]">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#c49019]">404</p>
          <h1 className="mt-4 text-3xl font-bold text-[#0f172a]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Halaman tidak ditemukan
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Halaman yang Anda buka mungkin sudah dipindahkan atau alamatnya salah ketik. Silakan kembali ke beranda
            atau pilih halaman lain di bawah ini.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-[#0f2f78] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#184aa8]"
            >
              Kembali ke Beranda
            </Link>
            {SUGGESTED_LINKS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="inline-flex items-center justify-center rounded-full border border-[#d7e3f7] px-5 py-3 text-sm font-semibold text-[#0f2f78] transition hover:border-[#0f2f78]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
