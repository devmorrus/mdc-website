// ─── App.tsx (optimized) ──────────────────────────────────────────────────────
// Gunakan React.lazy + Suspense agar Three.js & GSAP dari halaman lain
// tidak masuk bundle saat user buka halaman home.
// Semua halaman selain Home dimuat hanya saat pertama kali dikunjungi.

import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ScrollToTop } from './components/common/ScrollToTop'
import { useConversionTracking } from './hooks/useConversionTracking'
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
const PortfolioDetailPage = lazy(() =>
  import('./pages/PortfolioDetailPage').then((m) => ({ default: m.PortfolioDetailPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const BlogPage = lazy(() =>
  import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })),
)
const BlogDetailPage = lazy(() =>
  import('./pages/BlogDetailPage').then((m) => ({ default: m.BlogDetailPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
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
  useConversionTracking()

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}
