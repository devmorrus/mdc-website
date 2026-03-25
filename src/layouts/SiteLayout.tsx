import type { ReactNode } from 'react'

interface SiteLayoutProps {
  children: ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <span className="text-sm font-semibold tracking-[0.24em] text-violet-300">MDC</span>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#home" className="transition hover:text-white">Home</a>
            <a href="#products" className="transition hover:text-white">Products</a>
            <a href="#portofolio" className="transition hover:text-white">Portofolio</a>
            <a href="#services" className="transition hover:text-white">Services</a>
            <a href="#blog" className="transition hover:text-white">Blog</a>
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer id="contact" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>hello@mdc-studio.com</p>
          <p>Ready for API-driven content and growth.</p>
        </div>
      </footer>
    </div>
  )
}
