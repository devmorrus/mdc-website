import { useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'

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
  { id: 'portfolio', label: 'Portfolio', href: '/#portfolio' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
]

const DEFAULT_HEADER_CTA = {
  label: 'Konsultasi Sekarang',
  href: '/#contact',
}

const DEFAULT_FOOTER: FooterContent = {
  companyName: 'Morrus Digital Connecting',
  shortDescription: 'Partner digital untuk website modern dan scalable.',
  quickLinks: DEFAULT_NAV_ITEMS,
  email: 'hello@morrusdigital.com',
  phone: '+62 812 3456 7890',
}

export function SiteLayout({ children, navItems = DEFAULT_NAV_ITEMS, headerCta = DEFAULT_HEADER_CTA, footer = DEFAULT_FOOTER }: SiteLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
        className={({ isActive }) =>
          `${className} ${isActive ? 'bg-blue-200/10 text-amber-100' : ''}`.trim()
        }
      >
        {item.label}
      </NavLink>
    )
  }

  const renderFooterLink = (label: string, href: string) => {
    if (href.startsWith('/#') || href.startsWith('#')) {
      return (
        <Link to={href} className="transition hover:text-amber-100">
          {label}
        </Link>
      )
    }

    return (
      <NavLink
        to={href}
        className={({ isActive }) =>
          `transition hover:text-amber-100 ${isActive ? 'text-amber-100' : ''}`.trim()
        }
      >
        {label}
      </NavLink>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-950 via-[#041b4a] to-[#021331] text-blue-50">
      <header className="sticky top-0 z-30 border-b border-blue-200/15 bg-blue-950/75 backdrop-blur-lg">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link to="/" className="text-sm font-semibold tracking-[0.24em] text-amber-200">MDC</Link>

          <nav className="hidden items-center gap-6 text-sm text-blue-100/85 md:flex">
            {navItems.map((item) => renderNavItem(item, 'rounded-md px-2 py-1 transition hover:bg-blue-200/10 hover:text-amber-100'))}
          </nav>

          <div className="hidden md:block">
            <Link
              to={headerCta.href}
              className="rounded-lg bg-amber-300 px-4 py-2 text-sm font-semibold text-blue-950 transition hover:bg-amber-200"
            >
              {headerCta.label}
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-blue-200/35 text-blue-100 md:hidden"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="text-lg">{isMobileMenuOpen ? 'x' : '='}</span>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-blue-200/15 px-6 pb-4 pt-3 md:hidden">
            <nav className="flex flex-col gap-2 text-sm text-blue-50/90">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg border border-blue-200/10 bg-blue-900/30 px-3 py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              to={headerCta.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-3 inline-flex rounded-lg bg-amber-300 px-4 py-2 text-sm font-semibold text-blue-950"
            >
              {headerCta.label}
            </Link>
          </div>
        )}
      </header>

      <main className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-blue-300/10 to-transparent" />
        {children}
      </main>

      <footer className="border-t border-blue-200/15 bg-blue-950/70">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 text-sm md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-amber-200">{footer.companyName}</p>
            <p className="mt-3 leading-relaxed text-blue-100/75">{footer.shortDescription}</p>
          </div>

          <div>
            <p className="font-semibold text-blue-50">Quick Links</p>
            <ul className="mt-3 space-y-2 text-blue-100/80">
              {footer.quickLinks.map((item) => (
                <li key={item.label}>
                  {renderFooterLink(item.label, item.href)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-blue-50">Kontak</p>
            <p className="mt-3 text-blue-100/80">{footer.email}</p>
            <p className="mt-1 text-blue-100/80">{footer.phone}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
