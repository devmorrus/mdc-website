import { useState, useEffect, useRef, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import gsap from 'gsap'
import type { FooterContent, NavigationItem } from '../types/home'

interface SiteLayoutProps {
  children: ReactNode
  navItems?: NavigationItem[]
  headerCta?: {
    label: string
    href: string
  }
  footer?: FooterContent
}

const DEFAULT_NAV_ITEMS: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]

const DEFAULT_HEADER_CTA = {
  label: 'Konsultasi Sekarang',
  href: '/contact',
}

const DEFAULT_FOOTER: FooterContent = {
  companyName: 'Morrus Digital Connecting',
  shortDescription: 'Partner digital untuk website modern dan scalable.',
  quickLinks: DEFAULT_NAV_ITEMS,
  email: 'hello@morrusdigital.com',
  phone: '+62 812 3456 7890',
}

export function SiteLayout({
  children,
  navItems = DEFAULT_NAV_ITEMS,
  headerCta = DEFAULT_HEADER_CTA,
  footer = DEFAULT_FOOTER,
}: SiteLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)

  // Scroll detection for header style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Header entrance animation
  useEffect(() => {
    if (!headerRef.current) return
    gsap.fromTo(
      headerRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 },
    )
  }, [])

  const renderNavItem = (item: NavigationItem, className: string) => {
    if (item.href.startsWith('/#') || item.href.startsWith('#')) {
      return (
        <Link key={item.id} to={item.href} className={className}>
          {item.label}
        </Link>
      )
    }

    return (
      <NavLink
        key={item.id}
        to={item.href}
        className={({ isActive }) => `${className} ${isActive ? 'text-amber-300' : ''}`.trim()}
      >
        {({ isActive }) => (
          <span className="relative">
            {item.label}
            {isActive && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-amber-300" />
            )}
          </span>
        )}
      </NavLink>
    )
  }

  const renderFooterLink = (label: string, href: string) => {
    if (href.startsWith('/#') || href.startsWith('#')) {
      return (
        <Link to={href} className="transition-colors duration-200 hover:text-amber-200">
          {label}
        </Link>
      )
    }

    return (
      <NavLink
        to={href}
        className={({ isActive }) =>
          `transition-colors duration-200 hover:text-amber-200 ${isActive ? 'text-amber-300' : ''}`.trim()
        }
      >
        {label}
      </NavLink>
    )
  }

  return (
    <div className="min-h-screen bg-[#021331] text-blue-50" style={{ background: 'radial-gradient(circle at 12% -5%, rgba(59,130,246,0.22), transparent 42%), radial-gradient(circle at 85% 15%, rgba(250,204,21,0.15), transparent 38%), #021331' }}>
      {/* ─── Header ──────────────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-30 transition-all duration-500 ${
          scrolled
            ? 'border-b border-blue-200/12 bg-blue-950/80 shadow-[0_8px_40px_rgba(2,19,49,0.6)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            ref={logoRef}
            to="/"
            className="group flex items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-300/40 bg-amber-300/10 text-xs font-black text-amber-300 transition-all duration-300 group-hover:bg-amber-300/20 group-hover:border-amber-300/70">
              M
            </div>
            <span className="text-sm font-bold tracking-[0.22em] text-amber-200">MDC</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 text-sm text-blue-200/75 md:flex">
            {navItems.map((item) =>
              renderNavItem(
                item,
                'relative rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-blue-200/8 hover:text-amber-100',
              ),
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to={headerCta.href}
              className="group relative overflow-hidden rounded-xl bg-amber-300 px-5 py-2.5 text-sm font-bold text-blue-950 transition-all duration-300 hover:bg-amber-200 hover:shadow-[0_0_25px_rgba(251,191,36,0.45)]"
            >
              <span className="relative z-10">{headerCta.label}</span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200/25 bg-blue-900/30 text-blue-200 transition hover:border-amber-300/40 hover:text-amber-200 md:hidden"
            onClick={() => setIsMobileMenuOpen((c) => !c)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-blue-200/12 bg-blue-950/90 px-6 pb-5 pt-4 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1.5 text-sm text-blue-100/85">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl border border-blue-200/12 bg-blue-900/25 px-4 py-2.5 transition hover:border-amber-300/30 hover:text-amber-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              to={headerCta.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-amber-300 px-5 py-3 text-sm font-bold text-blue-950"
            >
              {headerCta.label}
            </Link>
          </div>
        )}
      </header>

      {/* ─── Main ────────────────────────────────────────────────────────────── */}
      <main className="relative">
        {children}
      </main>

      {/* ─── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="relative border-t border-blue-200/12 bg-blue-950/60 backdrop-blur-sm">
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-300/25 to-transparent" />

        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-300/40 bg-amber-300/10 text-xs font-black text-amber-300">
                  M
                </div>
                <span className="text-sm font-bold tracking-[0.22em] text-amber-200">{footer.companyName}</span>
              </div>
              <p className="text-sm leading-relaxed text-blue-300/60">{footer.shortDescription}</p>
            </div>

            {/* Quick links */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-200/50">Quick Links</p>
              <ul className="space-y-2 text-sm text-blue-300/65">
                {footer.quickLinks.map((item) => (
                  <li key={item.label}>{renderFooterLink(item.label, item.href)}</li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-200/50">Kontak</p>
              <div className="space-y-2 text-sm text-blue-300/65">
                <p>{footer.email}</p>
                <p>{footer.phone}</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-blue-200/10 pt-6 md:flex-row">
            <p className="text-xs text-blue-400/40">© {new Date().getFullYear()} {footer.companyName}. All rights reserved.</p>
            <p className="text-xs text-blue-400/30">Built with precision & care</p>
          </div>
        </div>
      </footer>
    </div>
  )
}