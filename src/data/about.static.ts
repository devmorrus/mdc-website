import type { AboutContent } from '../types/about'

export const ABOUT_STATIC_CONTENT: AboutContent = {
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
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Contact', href: '/contact' },
    ],
    address: 'Jakarta, Indonesia',
    email: 'hello@morrusdigital.com',
    phone: '+62 812 3456 7890',
    mapEmbedUrl: 'https://www.google.com/maps?q=Jakarta%2C%20Indonesia&z=12&output=embed',
  },
  hero: {
    eyebrow: 'About Us',
    title: 'Morrus Digital Connecting, Partner Digital untuk Bisnis yang Ingin Tumbuh',
    description:
      'Kami membantu perusahaan membangun kehadiran digital yang profesional melalui strategi, desain, dan engineering yang terukur.',
  },
  companyProfile: {
    title: 'Profil Perusahaan',
    paragraphs: [
      'Morrus Digital Connecting adalah perusahaan pengembangan digital yang berfokus pada pembuatan website company profile, website custom, serta solusi dashboard bisnis.',
      'Kami percaya bahwa website bukan hanya tampilan, tetapi aset bisnis yang membangun kepercayaan, memperjelas value, dan mendorong pertumbuhan klien.',
    ],
  },
  visionMission: {
    vision: 'Menjadi partner digital terpercaya bagi perusahaan Indonesia dalam membangun fondasi bisnis yang kuat di era digital.',
    missions: [
      'Menyediakan layanan pengembangan website yang modern, cepat, dan responsif.',
      'Menerapkan arsitektur software yang bersih dan siap berkembang untuk kebutuhan jangka panjang.',
      'Memberikan pengalaman kolaborasi yang profesional, transparan, dan berorientasi hasil.',
    ],
  },
  values: [
    {
      id: 'integrity',
      title: 'Integritas',
      description: 'Kami menjaga komitmen, kejujuran, dan kualitas dalam setiap proses pengerjaan proyek.',
    },
    {
      id: 'innovation',
      title: 'Inovasi',
      description: 'Kami terus belajar dan beradaptasi dengan teknologi untuk memberi solusi yang relevan.',
    },
    {
      id: 'collaboration',
      title: 'Kolaborasi',
      description: 'Kami bekerja bersama klien sebagai partner untuk mencapai target bisnis secara terukur.',
    },
    {
      id: 'impact',
      title: 'Dampak',
      description: 'Setiap deliverable kami arahkan agar memberikan dampak nyata terhadap pertumbuhan bisnis.',
    },
  ],
  legalities: [
    {
      type: 'Akta Pendirian',
      summary: 'Dokumen legal pembentukan perusahaan sesuai ketentuan hukum yang berlaku.',
    },
    {
      type: 'NIB',
      summary: 'Nomor Induk Berusaha sebagai identitas resmi aktivitas usaha perusahaan.',
    },
    {
      type: 'NPWP',
      summary: 'Dokumen perpajakan resmi sebagai bukti kepatuhan administrasi perusahaan.',
    },
  ],
}
