import type { ContactContent } from '../types/contact'

export const CONTACT_STATIC_CONTENT: ContactContent = {
  navItems: [
    { id: 'about', label: 'Tentang', href: '/about' },
    { id: 'services', label: 'Layanan', href: '/services' },
    { id: 'portfolio', label: 'Portofolio', href: '/portfolio' },
    { id: 'blog', label: 'Blog', href: '/#blog' },
    { id: 'contact', label: 'Kontak', href: '/contact' },
  ],
  headerCtaLabel: 'Konsultasi Sekarang',
  headerCtaHref:
    'https://wa.me/6281234567890?text=Halo%20Morrus%20Digital%20Connecting%2C%20saya%20ingin%20konsultasi%20pembuatan%20website.',
  footer: {
    companyName: 'Morrus Digital Connecting',
    shortDescription: 'Partner digital untuk website, aplikasi, dan sistem bisnis yang modern serta scalable.',
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
