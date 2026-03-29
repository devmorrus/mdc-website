import type { HomeContent } from '../types/home'

export const HOME_STATIC_CONTENT: HomeContent = {
  navItems: [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
    { id: 'contact', label: 'Contact', href: '/#contact' },
  ],
  headerCtaLabel: 'Konsultasi Sekarang',
  headerCtaHref: '/#contact',
  hero: {
    eyebrow: 'Morrus Digital Connecting',
    title: 'Digital Partner for Business Growth',
    description:
      'Kami membangun website company profile yang formal, modern, profesional, dan siap berkembang untuk memperkuat kredibilitas bisnis Anda.',
    primaryCtaLabel: 'Konsultasi Sekarang',
    primaryCtaHref: '/#contact',
    secondaryCtaLabel: 'Lihat Portfolio',
    secondaryCtaHref: '/portfolio',
  },
  stats: [
    { label: 'Project Selesai', value: '120+' },
    { label: 'Retensi Klien', value: '94%' },
    { label: 'Skor Performa Rata-rata', value: '95+' },
  ],
  about: {
    title: 'About Morrus Digital Connecting',
    summary:
      'Morrus Digital Connecting adalah partner digital bisnis yang menggabungkan strategi, desain, dan engineering agar website Anda tampil meyakinkan dan menghasilkan leads.',
    valuePoints: ['Pendekatan strategis berbasis tujuan bisnis', 'Eksekusi cepat dengan standar kualitas tinggi', 'Siap diintegrasikan dengan API dan sistem internal'],
    buttonLabel: 'Pelajari Lebih Lanjut',
    buttonHref: '/about',
  },
  services: [
    {
      id: 'strategy',
      icon: '01',
      title: 'Website Company Profile',
      description:
        'Bangun identitas digital profesional yang memudahkan calon klien memahami value perusahaan Anda.',
      highlights: ['Profil perusahaan terstruktur', 'Copywriting profesional', 'Optimasi konversi lead'],
    },
    {
      id: 'design',
      icon: '02',
      title: 'Website / Aplikasi Custom',
      description:
        'Solusi web dan aplikasi yang disesuaikan dengan kebutuhan operasional dan pertumbuhan bisnis.',
      highlights: ['Scope fleksibel', 'Desain UI modern', 'Arsitektur scalable'],
    },
    {
      id: 'engineering',
      icon: '03',
      title: 'Dashboard & Reporting',
      description:
        'Visualisasi data dan laporan bisnis yang membantu pengambilan keputusan secara cepat dan akurat.',
      highlights: ['Data visualization', 'KPI tracking', 'Akses multi-role'],
    },
    {
      id: 'support',
      icon: '04',
      title: 'Maintenance & Support',
      description:
        'Dukungan berkelanjutan untuk memastikan website Anda stabil, aman, dan selalu up to date.',
      highlights: ['Monitoring rutin', 'Update berkala', 'Response support cepat'],
    },
  ],
  portfolio: [
    {
      id: 'jaladewa-champion',
      name: 'Jaladewa Champion',
      category: 'Company Platform',
      summary: 'Website profil bisnis dengan fokus penguatan kredibilitas brand dan alur informasi yang jelas.',
    },
    {
      id: 'jaladewa-absensi',
      name: 'JalaDewa Absensi',
      category: 'Internal System',
      summary: 'Sistem absensi modern berbasis web dengan dashboard ringkas untuk pemantauan data karyawan.',
    },
    {
      id: 'focus-trading',
      name: 'Focus Trading Contractor',
      category: 'Corporate Profile',
      summary: 'Website perusahaan kontraktor dengan tampilan profesional dan struktur konten yang terarah.',
    },
    {
      id: 'dat-indonesia',
      name: 'DAT Indonesia',
      category: 'Business Website',
      summary: 'Landing company profile untuk meningkatkan visibilitas layanan serta kemudahan kontak calon klien.',
    },
  ],
  contactCta: {
    eyebrow: 'Siap Go Digital?',
    title: 'Mari Bangun Website Company Profile yang Mencerminkan Kualitas Bisnis Anda',
    description: 'Diskusikan kebutuhan digital bisnis Anda bersama tim Morrus Digital Connecting hari ini.',
    buttonLabel: 'Hubungi via WhatsApp',
    buttonHref: '#whatsapp',
  },
  footer: {
    companyName: 'Morrus Digital Connecting',
    shortDescription: 'Partner digital untuk website, aplikasi, dan sistem bisnis yang modern serta scalable.',
    quickLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Contact', href: '/#contact' },
    ],
    email: 'hello@morrusdigital.com',
    phone: '+62 812 3456 7890',
  },
  whatsappNumber: '6281234567890',
  whatsappMessage: 'Halo Morrus Digital Connecting, saya ingin konsultasi pembuatan website company profile.',
}
