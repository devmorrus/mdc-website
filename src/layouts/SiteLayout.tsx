import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import gsap from 'gsap'
import type { FooterContent, NavigationItem } from '../types/home'
import logoMdc from '../assets/logo-mdc.png'

interface SiteLayoutProps {
  children: ReactNode
  navItems?: NavigationItem[]
  headerCta?: {
    label: string
    href: string
  }
  footer?: FooterContent
  headerVariant?: 'default' | 'hero'
}

const DEFAULT_NAV_ITEMS: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]

const DEFAULT_HEADER_CTA = {
  label: 'Konsultasi Proyek',
  href: '/contact',
}

const DEFAULT_FOOTER: FooterContent = {
  companyName: 'Morrus Digital Connecting',
  shortDescription: 'Partner digital untuk website modern, aplikasi web, dan sistem bisnis yang siap berkembang.',
  quickLinks: DEFAULT_NAV_ITEMS,
  address: 'Jakarta, Indonesia',
  email: 'hello@morrusdigital.com',
  phone: '+62 812 3456 7890',
  mapEmbedUrl: 'https://www.google.com/maps?q=Jakarta%2C%20Indonesia&z=12&output=embed',
}

export function SiteLayout({
  children,
  navItems = DEFAULT_NAV_ITEMS,
  headerCta = DEFAULT_HEADER_CTA,
  footer = DEFAULT_FOOTER,
  headerVariant = 'default',
}: SiteLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const isHeroHeader = headerVariant === 'hero'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!headerRef.current) return

    gsap.fromTo(
      headerRef.current,
      { y: -32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', delay: 0.05 },
    )
  }, [])

  useEffect(() => {
    let favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']")

    if (!favicon) {
      favicon = document.createElement('link')
      favicon.rel = 'icon'
      document.head.appendChild(favicon)
    }

    favicon.type = 'image/png'
    favicon.href = logoMdc
  }, [])

  const renderLink = (item: NavigationItem, className: string) => {
    if (item.href.includes('#')) {
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
        className={({ isActive }) =>
          `${className} ${isActive ? 'bg-[#f6c445] text-[#0b1f57]' : ''}`.trim()
        }
      >
        {item.label}
      </NavLink>
    )
  }

  const renderFooterLink = (label: string, href: string) => {
    if (href.includes('#')) {
      return (
        <Link to={href} className="transition hover:text-[#f6c445]">
          {label}
        </Link>
      )
    }

    return (
      <NavLink
        to={href}
        className={({ isActive }) =>
          `transition hover:text-[#f6c445] ${isActive ? 'text-[#f6c445]' : ''}`.trim()
        }
      >
        {label}
      </NavLink>
    )
  }

  const isHeaderCtaAnchor = headerCta.href.includes('#')

  return (
    <div
      className="min-h-screen bg-[#f7fbff] text-slate-900"
      style={{
        backgroundImage:
          'radial-gradient(circle at top left, rgba(246,196,69,0.15), transparent 18%), radial-gradient(circle at top right, rgba(24,74,168,0.08), transparent 20%), linear-gradient(180deg, #f5f9ff 0%, #edf3ff 54%, #f7fbff 100%)',
      }}
    >
      {isHeroHeader ? (
        <header
          ref={headerRef}
          className="sticky top-0 z-40 w-full transition-all duration-300"
        >
          <div
            className={`flex h-18 w-full items-center justify-between border-b border-white/12 px-6 transition-all duration-300 ${
              scrolled
                ? 'bg-[#0b1f57]/96 shadow-[0_18px_38px_-28px_rgba(11,31,87,0.58)]'
                : 'bg-[#0b1f57]/84 backdrop-blur-md shadow-[0_18px_38px_-28px_rgba(11,31,87,0.58)]'
            }`}
          >
            <Link to="/" aria-label="Morrus Digital Connecting" className="flex items-center">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_10px_24px_-18px_rgba(11,31,87,0.45)]">
                <img src={logoMdc} alt="Morrus Digital Connecting logo" className="h-full w-full object-contain" />
              </span>
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              {navItems.map((item) =>
                renderLink(
                  item,
                  'rounded-full px-4 py-2 text-sm font-medium text-blue-100/88 transition hover:bg-white/12 hover:text-white',
                ),
              )}
            </nav>

            <div className="hidden md:block">
              {isHeaderCtaAnchor ? (
                <Link
                  to={headerCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-[#f6c445] px-5 py-3 text-sm font-semibold text-[#0b1f57] transition hover:bg-[#ffd15c]"
                >
                  {headerCta.label}
                </Link>
              ) : (
                <Link
                  to={headerCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-[#f6c445] px-5 py-3 text-sm font-semibold text-[#0b1f57] transition hover:bg-[#ffd15c]"
                >
                  {headerCta.label}
                </Link>
              )}
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/18 bg-white/8 text-white md:hidden"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7.5h15m-15 4.5h15m-15 4.5h15" />
                </svg>
              )}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="border-t border-blue-200/20 bg-[#0f2f78]/96 px-6 pb-5 pt-4 backdrop-blur-xl md:hidden">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm font-medium text-blue-50 transition hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link
                to={headerCta.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#f6c445] px-5 py-3 text-sm font-semibold text-[#0b1f57]"
              >
                {headerCta.label}
              </Link>
            </div>
          )}
        </header>
      ) : (
        <header
          ref={headerRef}
          className={`sticky top-0 z-40 transition-all duration-300 ${
            scrolled
              ? 'border-b border-blue-200/70 bg-[#f7fbff]/82 shadow-[0_10px_35px_-28px_rgba(11,31,87,0.3)] backdrop-blur-xl'
              : 'bg-transparent'
          }`}
        >
          <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-6">
            <div className={`flex w-full items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 ${
              scrolled
                ? 'border-blue-300/55 bg-[#0f2f78]/94 shadow-[0_18px_38px_-28px_rgba(11,31,87,0.55)]'
                : 'border-white/12 bg-[#0b1f57]/88 shadow-[0_18px_38px_-28px_rgba(11,31,87,0.55)] backdrop-blur-md'
            }`}>
              <Link to="/" aria-label="Morrus Digital Connecting" className="flex items-center">
                <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_10px_24px_-18px_rgba(11,31,87,0.45)]">
                  <img src={logoMdc} alt="Morrus Digital Connecting logo" className="h-full w-full object-contain" />
                </span>
              </Link>

              <nav className="hidden items-center gap-2 md:flex">
                {navItems.map((item) =>
                  renderLink(
                    item,
                    'rounded-full px-4 py-2 text-sm font-medium text-blue-100/88 transition hover:bg-white/12 hover:text-white',
                  ),
                )}
              </nav>

              <div className="hidden md:block">
                {isHeaderCtaAnchor ? (
                  <Link
                    to={headerCta.href}
                    className="inline-flex items-center justify-center rounded-full bg-[#f6c445] px-5 py-3 text-sm font-semibold text-[#0b1f57] transition hover:bg-[#ffd15c]"
                  >
                    {headerCta.label}
                  </Link>
                ) : (
                  <Link
                    to={headerCta.href}
                    className="inline-flex items-center justify-center rounded-full bg-[#f6c445] px-5 py-3 text-sm font-semibold text-[#0b1f57] transition hover:bg-[#ffd15c]"
                  >
                    {headerCta.label}
                  </Link>
                )}
              </div>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/18 bg-white/8 text-white md:hidden"
                onClick={() => setIsMobileMenuOpen((current) => !current)}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7.5h15m-15 4.5h15m-15 4.5h15" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="border-t border-blue-200/20 bg-[#0f2f78]/96 px-6 pb-5 pt-4 backdrop-blur-xl md:hidden">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm font-medium text-blue-50 transition hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link
                to={headerCta.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#f6c445] px-5 py-3 text-sm font-semibold text-[#0b1f57]"
              >
                {headerCta.label}
              </Link>
            </div>
          )}
        </header>
      )}

      <main className={`relative ${isHeroHeader ? '-mt-18' : ''}`}>{children}</main>

      <footer className="border-t border-blue-900/20 bg-[#0b1f57] text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_10px_24px_-18px_rgba(11,31,87,0.45)]">
                <img src={logoMdc} alt="Morrus Digital Connecting logo" className="h-full w-full object-contain" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
                {footer.companyName}
              </span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-blue-100/72">
              {footer.shortDescription}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f6c445]">
              Quick Links
            </p>
            <ul className="mt-5 space-y-3 text-sm text-blue-100/72">
              {footer.quickLinks.map((item) => (
                <li key={item.label}>{renderFooterLink(item.label, item.href)}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f6c445]">
              Contact
            </p>
            <div className="mt-5 space-y-3 text-sm text-blue-100/72">
              <p>{footer.address}</p>
              <p>{footer.email}</p>
              <p>{footer.phone}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f6c445]">
              Location
            </p>
            <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.35)]">
              <iframe
                title={`${footer.companyName} location`}
                src={footer.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-52 w-full border-0"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-blue-100/55 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} {footer.companyName}. All rights reserved.</p>
            <p>Built for modern company profile presentation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
