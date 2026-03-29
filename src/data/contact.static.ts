import type { ContactContent } from '../types/contact'

export const CONTACT_STATIC_CONTENT: ContactContent = {
  navItems: [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ],
  headerCtaLabel: 'Konsultasi Sekarang',
  headerCtaHref: '/contact',
  footer: {
    companyName: 'Morrus Digital Connecting',
    shortDescription: 'Partner digital untuk website, aplikasi, dan sistem bisnis yang modern serta scalable.',
    quickLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Contact', href: '/contact' },
    ],
    email: 'hello@morrusdigital.com',
    phone: '+62 812 3456 7890',
  },
  hero: {
    eyebrow: 'Halaman Contact',
    title: 'Mari Diskusikan Kebutuhan Digital Bisnis Anda',
    description:
      'Hubungi tim Morrus Digital Connecting untuk konsultasi website company profile, aplikasi custom, dashboard, dan dukungan teknis.',
  },
  info: {
    title: 'Informasi Kontak Utama',
    description: 'Kami siap merespon inquiry Anda secara profesional pada jam kerja.',
    items: [
      { label: 'Email', value: 'hello@morrusdigital.com', href: 'mailto:hello@morrusdigital.com' },
      { label: 'Telepon', value: '+62 812 3456 7890', href: 'tel:+6281234567890' },
      { label: 'Jam Operasional', value: 'Senin - Jumat, 09.00 - 18.00 WIB' },
      { label: 'Lokasi', value: 'Gresik, Jawa Timur, Indonesia' },
    ],
    whatsappNumber: '6281234567890',
    whatsappMessage: 'Halo Morrus Digital Connecting, saya ingin konsultasi kebutuhan website dan layanan digital.',
    whatsappButtonLabel: 'Hubungi via WhatsApp',
  },
}
