import type { ServicesContent } from '../types/services'

export const SERVICES_STATIC_CONTENT: ServicesContent = {
  navItems: [
    { id: 'about', label: 'Tentang', href: '/#about' },
    { id: 'services', label: 'Layanan', href: '/#services' },
    { id: 'portfolio', label: 'Portofolio', href: '/#portfolio' },
    { id: 'blog', label: 'Blog', href: '/#blog' },
    { id: 'contact', label: 'Kontak', href: '/#contact' },
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
    eyebrow: 'Apa yang Kami Tawarkan',
    title: 'Layanan Digital yang Terstruktur untuk Pertumbuhan Bisnis',
    description:
      'Kami menghadirkan layanan dengan pendekatan strategis, desain modern, dan implementasi teknis yang rapi agar mudah di-maintain.',
  },
  services: [
    {
      id: 'company-profile',
      icon: '01',
      title: 'Website Company Profile',
      description:
        'Bangun citra perusahaan yang profesional melalui website yang formal, clean, dan meyakinkan untuk calon klien.',
      benefits: [
        'Meningkatkan kredibilitas perusahaan',
        'Menyajikan informasi bisnis secara terstruktur',
        'Mendorong lead melalui CTA yang jelas',
      ],
      ctaLabel: 'Konsultasi Company Profile',
      ctaHref: '/contact',
    },
    {
      id: 'custom-web-app',
      icon: '02',
      title: 'Website / Aplikasi Custom',
      description:
        'Kembangkan solusi digital yang disesuaikan dengan alur kerja bisnis Anda untuk efisiensi operasional yang lebih baik.',
      benefits: [
        'Fitur sesuai kebutuhan bisnis',
        'Arsitektur scalable dan modular',
        'Integrasi dengan sistem internal',
      ],
      ctaLabel: 'Diskusikan Solusi Custom',
      ctaHref: '/contact',
    },
    {
      id: 'dashboard-reporting',
      icon: '03',
      title: 'Dashboard & Reporting System',
      description:
        'Visualisasikan data bisnis dalam dashboard yang mudah dipahami untuk mempercepat proses analisis dan keputusan.',
      benefits: [
        'Pelacakan KPI real-time',
        'Ringkasan data yang lebih akurat',
        'Tampilan data yang user-friendly',
      ],
      ctaLabel: 'Mulai Project Dashboard',
      ctaHref: '/contact',
    },
    {
      id: 'maintenance-support',
      icon: '04',
      title: 'Maintenance & Support',
      description:
        'Pastikan website dan aplikasi tetap optimal dengan dukungan teknis berkala, monitoring, serta update preventif.',
      benefits: [
        'Performa dan keamanan terjaga',
        'Response support yang cepat',
        'Biaya maintenance terprediksi',
      ],
      ctaLabel: 'Aktifkan Paket Support',
      ctaHref: '/contact',
    },
  ],
  closingCta: {
    title: 'Butuh Rekomendasi Layanan yang Paling Tepat?',
    description:
      'Tim Morrus Digital Connecting siap membantu Anda menentukan prioritas layanan berdasarkan target bisnis dan tahap pertumbuhan perusahaan.',
    buttonLabel: 'Jadwalkan Konsultasi',
    buttonHref: '/contact',
  },
}
