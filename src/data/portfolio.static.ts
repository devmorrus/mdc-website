import heroImage from '../assets/hero.png'
import datImage from '../assets/dat.png'
import iphoneGresikImage from '../assets/iphone_gresik.png'
import logoDefertImage from '../assets/logo-defert.png'
import logoFtcImage from '../assets/logo-ftc.png'
import logoHeroPreviewImage from '../assets/logo-hero-removebg-preview.png'
import logoJaladewaImage from '../assets/logo-jaladewa.png'
import logoMcbImage from '../assets/logo-mcb.png'
import logoMdcImage from '../assets/logo-mdc.png'
import logoMdcPreviewImage from '../assets/logo-mdc-removebg-preview.png'
import type { PortfolioContent } from '../types/portfolio'

export const PORTFOLIO_STATIC_CONTENT: PortfolioContent = {
  navItems: [
    { id: 'about', label: 'Tentang', href: '/about' },
    { id: 'services', label: 'Layanan', href: '/services' },
    { id: 'portfolio', label: 'Portofolio', href: '/portfolio' },
    { id: 'blog', label: 'Blog', href: '/blog' },
    { id: 'contact', label: 'Kontak', href: '/contact' },
  ],
  headerCtaLabel: 'Konsultasi Sekarang',
  headerCtaHref:
    'https://wa.me/6281234567890?text=Halo%20Morrus%20Digital%20Connecting%2C%20saya%20ingin%20konsultasi%20pembuatan%20website.',
  footer: {
    companyName: 'Morrus Digital Connecting',
    shortDescription: 'Partner digital untuk website, aplikasi, dan sistem bisnis yang modern serta scalable.',
    quickLinks: [
      { label: 'Tentang', href: '/about' },
      { label: 'Layanan', href: '/services' },
      { label: 'Portofolio', href: '/portfolio' },
      { label: 'Blog', href: '/blog' },
      { label: 'Kontak', href: '/contact' },
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
    eyebrow: 'Halaman Portfolio',
    title: 'Project Pilihan yang Mewakili Standar Kualitas Morrus',
    description:
      'Berikut adalah kumpulan project lintas industri dengan pendekatan desain modern, struktur konten yang jelas, dan implementasi teknis yang scalable.',
  },
  projects: [
    {
      id: 'jaladewa-champion',
      slug: 'jaladewa-champion',
      name: 'Jaladewa Champion',
      client: 'Jaladewa Group',
      year: '2026',
      category: 'Company Profile',
      industry: 'Community Platform',
      serviceType: 'Website Company Profile',
      summary: 'Platform profil komunitas dengan struktur informasi yang kuat untuk memperkuat kredibilitas organisasi.',
      challenge:
        'Komunikasi value brand dan layanan utama belum cukup tegas untuk dipakai saat presentasi dan pitching.',
      objective:
        'Membuat company profile yang lebih meyakinkan, lebih mudah dibaca, dan siap dipakai untuk kebutuhan komunikasi bisnis.',
      solution:
        'Kami merapikan hierarchy konten, menonjolkan layanan utama, dan menata alur CTA agar lebih fokus pada konversi.',
      outcome:
        'Posisi brand menjadi lebih kuat dan alur informasi lebih mudah dipahami oleh audiens baru.',
      deliverables: ['Information architecture', 'Hero section refinement', 'CTA flow', 'Responsive layout'],
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      thumbnailLabel: 'JC',
      thumbnailTone: 'sky',
      gallery: [
        {
          src: logoJaladewaImage,
          alt: 'Logo Jaladewa Champion',
          caption: 'Brand identity utama',
        },
        {
          src: logoHeroPreviewImage,
          alt: 'Visual identitas proyek Jaladewa Champion',
          caption: 'Visual direction',
        },
        {
          src: heroImage,
          alt: 'Presentasi visual untuk Jaladewa Champion',
          caption: 'Homepage showcase',
        },
      ],
    },
    {
      id: 'jaladewa-absensi',
      slug: 'jaladewa-absensi',
      name: 'JalaDewa Absensi',
      client: 'JalaDewa Group',
      year: '2026',
      category: 'Internal Platform',
      industry: 'Human Resources',
      serviceType: 'Web App Custom',
      summary: 'Aplikasi absensi internal berbasis web dengan alur data ringkas dan tampilan dashboard informatif.',
      challenge:
        'Sistem absensi internal membutuhkan tampilan yang lebih ringkas dan mudah dipantau oleh tim operasional.',
      objective:
        'Menyajikan data kehadiran dan ringkasan operasional dalam dashboard yang mudah dibaca.',
      solution:
        'Kami membangun alur informasi sederhana, menonjolkan statistik utama, dan mempermudah navigasi antar menu.',
      outcome:
        'Pemantauan kehadiran menjadi lebih cepat dan koordinasi tim lebih efisien.',
      deliverables: ['Dashboard summary', 'Attendance flow', 'Role-based access', 'Mobile-first layout'],
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      thumbnailLabel: 'JA',
      thumbnailTone: 'blue',
      gallery: [
        {
          src: iphoneGresikImage,
          alt: 'Tampilan aplikasi internal iPhone Gresik',
          caption: 'Operational dashboard',
        },
        {
          src: logoMcbImage,
          alt: 'Brand asset JalaDewa Absensi',
          caption: 'Interface identity',
        },
        {
          src: logoMdcPreviewImage,
          alt: 'Visual pendukung JalaDewa Absensi',
          caption: 'System preview',
        },
      ],
    },
    {
      id: 'focus-trading-contractor',
      slug: 'focus-trading-contractor',
      name: 'Focus Trading Contractor',
      client: 'Focus Trading Contractor',
      year: '2026',
      category: 'Corporate Website',
      industry: 'Construction & Trading',
      serviceType: 'Website Company Profile',
      summary: 'Website korporat untuk menampilkan layanan, kapabilitas tim, dan proyek unggulan dengan nuansa profesional.',
      challenge:
        'Perusahaan membutuhkan tampilan korporat yang formal dan terpercaya untuk mempresentasikan layanan dan kapabilitas tim.',
      objective:
        'Membuat website company profile yang kuat secara visual dan informatif untuk kebutuhan presentasi bisnis.',
      solution:
        'Kami menyusun section layanan, profil, dan portofolio proyek dengan visual yang lebih tegas dan profesional.',
      outcome:
        'Brand tampil lebih kredibel saat diperkenalkan ke calon partner bisnis.',
      deliverables: ['Corporate structure', 'Services presentation', 'Project showcase', 'Responsive UI'],
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      thumbnailLabel: 'FT',
      thumbnailTone: 'amber',
      gallery: [
        {
          src: logoFtcImage,
          alt: 'Logo Focus Trading Contractor',
          caption: 'Corporate identity',
        },
        {
          src: logoDefertImage,
          alt: 'Visual brand pendukung Focus Trading Contractor',
          caption: 'Brand exploration',
        },
        {
          src: heroImage,
          alt: 'Tampilan presentasi project Focus Trading Contractor',
          caption: 'Homepage showcase',
        },
      ],
    },
    {
      id: 'dat-indonesia',
      slug: 'dat-indonesia',
      name: 'DAT Indonesia',
      client: 'DAT Indonesia',
      year: '2026',
      category: 'Business Landing Page',
      industry: 'Corporate Services',
      serviceType: 'Business Landing Page',
      summary: 'Landing page korporat untuk menampilkan layanan utama dan mempermudah jalur kontak.',
      challenge:
        'Brand membutuhkan halaman yang lebih ringkas untuk menjelaskan value utama dan mempermudah prospek menghubungi tim.',
      objective:
        'Membuat landing page yang mampu menyampaikan value bisnis dengan cepat sekaligus meningkatkan jalur kontak.',
      solution:
        'Kami merancang struktur konten yang lebih padat, menonjolkan layanan utama, dan mengarahkan pengguna ke aksi yang jelas.',
      outcome:
        'Calon pelanggan lebih cepat menemukan layanan dan menghubungi tim.',
      deliverables: ['Landing page structure', 'Lead CTA', 'Service highlight', 'Responsive design'],
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      thumbnailLabel: 'DI',
      thumbnailTone: 'blue',
      gallery: [
        {
          src: datImage,
          alt: 'Logo DAT Indonesia',
          caption: 'Brand identity',
        },
        {
          src: logoMdcImage,
          alt: 'Visual pendukung DAT Indonesia',
          caption: 'Design system',
        },
        {
          src: heroImage,
          alt: 'Visual pendukung halaman DAT Indonesia',
          caption: 'Landing page showcase',
        },
      ],
    },
  ],
  closingCta: {
    title: 'Ingin Project Anda Menjadi Portfolio Berikutnya?',
    description:
      'Kami siap membantu merancang solusi digital yang relevan dengan kebutuhan bisnis Anda, dari tahap konsep hingga implementasi.',
    buttonLabel: 'Mulai Konsultasi Project',
    buttonHref: '/contact',
  },
}

export function getPortfolioProjectBySlug(slug: string) {
  return PORTFOLIO_STATIC_CONTENT.projects.find((project) => project.slug === slug) ?? null
}
