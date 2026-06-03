// ─── App.tsx (optimized) ──────────────────────────────────────────────────────
// Gunakan React.lazy + Suspense agar Three.js & GSAP dari halaman lain
// tidak masuk bundle saat user buka halaman home.
// Semua halaman selain Home dimuat hanya saat pertama kali dikunjungi.

import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ScrollToTop } from './components/common/ScrollToTop'
import { HomePage } from './pages/HomePage'

// Lazy-load semua halaman selain home
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })),
)
const PortfolioPage = lazy(() =>
  import('./pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)

// Loading fallback – minimal, tidak ada spinner mencolok
function PageFallback() {
  return (
    <div
      className="min-h-screen"
      style={{ background: '#f7fbff' }}
      aria-hidden="true"
    />
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}
