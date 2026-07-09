import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import gsap from 'gsap'
import type { FooterContent, NavigationItem } from '../types/home'
import logoMdc from '../assets/logo-mdc-removebg-preview.png'

const WHATSAPP_CONSULTATION_URL =
  'https://wa.me/6281229999752?text=Halo%20Morrus%20Digital%20Connecting%2C%20saya%20ingin%20konsultasi%20pembuatan%20website.'

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
  { id: 'about', label: 'Tentang', href: '/#about' },
  { id: 'services', label: 'Layanan', href: '/#services' },
  { id: 'portfolio', label: 'Portofolio', href: '/#portfolio' },
  { id: 'blog', label: 'Blog', href: '/#blog' },
  { id: 'contact', label: 'Kontak', href: '/#contact' },
]

const DEFAULT_HEADER_CTA = {
  label: 'Konsultasi Sekarang',
  href: WHATSAPP_CONSULTATION_URL,
}

const DEFAULT_FOOTER: FooterContent = {
  companyName: 'Morrus Digital Connecting',
  shortDescription: 'Partner digital untuk website modern, aplikasi web, dan sistem bisnis yang siap berkembang.',
  quickLinks: [
    { label: 'Tentang', href: '/#about' },
    { label: 'Layanan', href: '/#services' },
    { label: 'Portofolio', href: '/#portfolio' },
    { label: 'Blog', href: '/#blog' },
    { label: 'Kontak', href: '/#contact' },
  ],
  address: 'Jl. Klakahrejo No.6-7, Kandangan, Benowo, Surabaya, Jawa Timur, 60198 - Indonesia',
  addressHref: 'https://maps.app.goo.gl/9A12Kf1KXUjDPBmR8',
  fax: '+6231 742 5366',
  email: 'morrusdigitalconnecting@gmail.com',
  whatsapp: '+62812 2999 9752',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Jl.%20Klakahrejo%20No.6-7%2C%20Kandangan%2C%20Benowo%2C%20Surabaya%2C%20Jawa%20Timur%2060198&z=15&output=embed',
}

const HEADER_BACKGROUND = '#f7fbff'
const FOOTER_BACKGROUND = '#f3f7ff'

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
  const isExternalHeaderCta = headerCta.href.startsWith('http')
  const isHeroAtTop = isHeroHeader && !scrolled

  // Nav item classes change based on hero-at-top vs scrolled/default
  const navItemBaseClass = isHeroAtTop
    ? 'rounded-full px-4 py-2 text-sm font-medium text-white/85 transition duration-200 hover:bg-white/10 hover:text-white'
    : 'rounded-full px-4 py-2 text-sm font-medium text-[#16336f] transition duration-200 hover:bg-[#dce8ff] hover:text-[#0b1f57]'
  const navItemMobileBaseClass =
    'block px-0 py-4 text-left text-base font-medium text-[#16336f] transition hover:text-[#0b1f57]'
  const navItemActiveClass = isHeroAtTop ? 'bg-white/12 text-white' : 'bg-[#dce8ff] text-[#0b1f57]'
  const navItemMobileActiveClass = 'text-[#0b1f57]'

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

  const renderLink = (
    item: NavigationItem,
    className: string,
    activeClassName: string,
    onClick?: () => void,
  ) => {
    if (item.href.includes('#')) {
      return (
        <Link key={item.id} to={item.href} className={className} onClick={onClick}>
          {item.label}
        </Link>
      )
    }

    return (
      <NavLink
        key={item.id}
        to={item.href}
        onClick={onClick}
        className={({ isActive }) => `${className} ${isActive ? activeClassName : ''}`.trim()}
      >
        {item.label}
      </NavLink>
    )
  }

  const renderHeaderCta = (className: string, onClick?: () => void) => {
    if (isExternalHeaderCta) {
      return (
        <a href={headerCta.href} className={className} onClick={onClick}>
          {headerCta.label}
        </a>
      )
    }

    return (
      <Link to={headerCta.href} className={className} onClick={onClick}>
        {headerCta.label}
      </Link>
    )
  }

  const renderFooterLink = (label: string, href: string) => {
    if (href.includes('#')) {
      return (
        <Link to={href} className="transition hover:text-[#f6c445] active:text-[#f6c445]">
          {label}
        </Link>
      )
    }

    return (
      <NavLink
        to={href}
        className={({ isActive }) =>
          `transition hover:text-[#f6c445] active:text-[#f6c445] ${isActive ? 'text-[#f6c445]' : ''}`.trim()
        }
      >
        {label}
      </NavLink>
    )
  }

  const renderMobileMenuButton = () => (
    <button
      type="button"
      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 hover:scale-[1.03] md:hidden ${
        isHeroAtTop
          ? 'border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
          : `border-[#c9d7f0] bg-white/78 text-[#0b1f57] shadow-[0_12px_24px_-18px_rgba(11,31,87,0.22)] ${
              isMobileMenuOpen ? 'shadow-[0_18px_30px_-18px_rgba(11,31,87,0.28)]' : ''
            }`
      }`}
      onClick={() => setIsMobileMenuOpen((current) => !current)}
      aria-expanded={isMobileMenuOpen}
      aria-label="Toggle navigation menu"
    >
      <span className="relative h-5 w-5">
        <span
          className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'top-[9px] rotate-45' : 'top-[4px]'
          }`}
        />
        <span
          className={`absolute left-0 top-[9px] h-0.5 w-5 rounded-full bg-current transition-all duration-200 ease-out ${
            isMobileMenuOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
          }`}
        />
        <span
          className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'top-[9px] -rotate-45' : 'top-[14px]'
          }`}
        />
      </span>
    </button>
  )

  const renderMobileMenuPanel = () => (
    <div className="fixed inset-x-0 top-[4.85rem] z-50 md:hidden pointer-events-none">
      <div
        className={`pointer-events-none absolute inset-0 h-[calc(100vh-4.85rem)] w-full bg-[#0b1f57]/8 transition duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`relative w-full overflow-hidden border-t border-[#d5e1f5] bg-[#f7fbff] px-6 pb-6 pt-3 shadow-[0_26px_60px_-34px_rgba(11,31,87,0.22)] transition-all duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        } ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ backgroundColor: HEADER_BACKGROUND }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#184aa8]/26 to-transparent" />
        <nav className="flex flex-col">
          {navItems.map((item) => (
            renderLink(
              item,
              navItemMobileBaseClass,
              navItemMobileActiveClass,
              () => setIsMobileMenuOpen(false),
            )
          ))}
        </nav>
        {renderHeaderCta(
          'mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#f6c445] px-5 py-3 text-sm font-semibold text-[#121417] shadow-[0_18px_35px_-22px_rgba(246,196,69,0.85)] transition hover:bg-[#ffd15c]',
          () => setIsMobileMenuOpen(false),
        )}
      </div>
    </div>
  )

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
          className="sticky top-0 z-50 overflow-visible px-4 pt-3 transition-all duration-300 md:px-6"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div
              className={`flex h-[4.75rem] w-full items-center justify-between rounded-[1.6rem] border px-4 py-2.5 transition-all duration-500 md:h-[4.9rem] md:px-5 ${
                scrolled
                  ? 'border-[#d5e1f5] shadow-[0_16px_34px_-26px_rgba(11,31,87,0.18)]'
                  : 'border-white/10 shadow-[0_14px_28px_-26px_rgba(4,13,30,0.45)]'
              }`}
              style={{
                backgroundColor: scrolled ? HEADER_BACKGROUND : 'rgba(5,13,30,0.18)',
                backdropFilter: scrolled ? 'none' : 'blur(12px)',
                WebkitBackdropFilter: scrolled ? 'none' : 'blur(12px)',
              }}
            >
              <Link to="/" aria-label="Morrus Digital Connecting" className="flex items-center">
                <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-transparent md:h-22 md:w-22">
                  <img
                    src={logoMdc}
                    alt="Morrus Digital Connecting logo"
                    className={`h-full w-full scale-[1.12] object-contain transition-all duration-500 ${
                      isHeroAtTop ? 'brightness-0 invert' : ''
                    }`}
                  />
                </span>
              </Link>

              <nav className="hidden items-center gap-2 md:flex">
                {navItems.map((item) =>
                  renderLink(
                    item,
                    navItemBaseClass,
                    navItemActiveClass,
                  ),
                )}
              </nav>

              <div className="hidden md:block">
                {renderHeaderCta(
                  isHeroAtTop
                    ? 'inline-flex items-center justify-center rounded-full bg-[#facc15] px-5 py-2.5 text-sm font-semibold text-[#0b1f57] shadow-[0_0_18px_rgba(250,204,21,0.26)] transition-all duration-300 hover:bg-[#fde047] hover:shadow-[0_0_24px_rgba(250,204,21,0.36)]'
                    : 'inline-flex items-center justify-center rounded-full bg-[#f6c445] px-5 py-2.5 text-sm font-semibold text-[#0b1f57] transition hover:bg-[#ffd15c]',
                )}
              </div>

              {renderMobileMenuButton()}
            </div>
          </div>

          {renderMobileMenuPanel()}
        </header>
      ) : (
        <header
          ref={headerRef}
          className={`sticky top-0 z-50 overflow-visible px-4 pt-3 transition-all duration-300 md:px-6 ${
            scrolled
              ? 'bg-transparent'
              : 'bg-transparent'
          }`}
        >
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
            <div
              className={`flex h-[4.75rem] w-full items-center justify-between rounded-[1.6rem] border px-4 py-2.5 transition-all duration-300 md:h-[4.9rem] md:px-5 ${
                scrolled
                  ? 'border-[#d5e1f5] shadow-[0_16px_34px_-26px_rgba(11,31,87,0.18)]'
                  : 'border-white/70 shadow-[0_16px_34px_-28px_rgba(11,31,87,0.14)]'
              }`}
              style={{ backgroundColor: HEADER_BACKGROUND }}
            >
              <Link to="/" aria-label="Morrus Digital Connecting" className="flex items-center">
                <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-transparent md:h-12 md:w-12">
                  <img src={logoMdc} alt="Morrus Digital Connecting logo" className="h-full w-full scale-[1.12] object-contain" />
                </span>
              </Link>

              <nav className="hidden items-center gap-2 md:flex">
                {navItems.map((item) =>
                  renderLink(
                    item,
                    navItemBaseClass,
                    navItemActiveClass,
                  ),
                )}
              </nav>

              <div className="hidden md:block">
                {renderHeaderCta(
                  'inline-flex items-center justify-center rounded-full bg-[#f6c445] px-5 py-2.5 text-sm font-semibold text-[#0b1f57] transition hover:bg-[#ffd15c]',
                )}
              </div>

              {renderMobileMenuButton()}
            </div>
          </div>

          {renderMobileMenuPanel()}
        </header>
      )}

      <main className={`relative ${isHeroHeader ? '-mt-[5.5rem] md:-mt-[5.65rem]' : ''}`}>{children}</main>

      <footer
        className="w-full border-t border-[#d5e1f5] text-[#0f214d]"
        style={{ backgroundColor: FOOTER_BACKGROUND }}
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-8 py-14 text-center md:px-6 md:grid-cols-2 md:text-left xl:grid-cols-[1.2fr_0.7fr_1fr_1fr] xl:gap-x-6 xl:gap-y-8">
          <div className="px-2 md:px-0">
            <div className="flex items-center justify-center md:justify-start">
              <span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-transparent">
                <img src={logoMdc} alt="Morrus Digital Connecting logo" className="h-full w-full scale-[1.22] object-contain" />
              </span>
            </div>
            <p className="mt-2 mx-auto max-w-md text-sm leading-7 text-[#4f628d] md:mx-0">
              {footer.shortDescription}
            </p>
          </div>

          <div className="px-2 md:px-0">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#16336f]">
              Menu
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[#4f628d]">
              {footer.quickLinks.map((item) => (
                <li key={item.label}>{renderFooterLink(item.label, item.href)}</li>
              ))}
            </ul>
          </div>

          <div className="px-2 md:px-0">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#16336f]">
              Contact
            </p>
            <div className="mt-5 space-y-4 text-sm text-[#4f628d]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f214d]/78">Alamat</p>
                <a
                  href={footer.addressHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block transition hover:text-[#f6c445] active:text-[#f6c445]"
                >
                  {footer.address}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f214d]/78">Fax</p>
                <p className="mt-1">{footer.fax}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f214d]/78">Email</p>
                <a
                  href={`mailto:${footer.email}`}
                  className="mt-1 block transition hover:text-[#f6c445] active:text-[#f6c445]"
                >
                  {footer.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f214d]/78">Whatsapp</p>
                <a
                  href={`https://wa.me/${footer.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block transition hover:text-[#f6c445] active:text-[#f6c445]"
                >
                  {footer.whatsapp}
                </a>
              </div>
            </div>
          </div>

          <div className="px-2 md:px-0">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#16336f]">
              Location
            </p>
            <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#d5e1f5] bg-white shadow-[0_18px_40px_-30px_rgba(11,31,87,0.18)]">
              <iframe
                title={`${footer.companyName} location`}
                src={footer.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-64 w-full border-0"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#d5e1f5]">
          <div className="mx-auto w-full max-w-6xl px-8 py-6 text-center text-xs text-[#6a7ca6] md:px-6">
            <p>© {new Date().getFullYear()} {footer.companyName}. All rights reserved. Built for modern company profile presentation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
