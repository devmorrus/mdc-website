import type { AboutContent } from '../types/about'

export const ABOUT_STATIC_CONTENT: AboutContent = {
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
