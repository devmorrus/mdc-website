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
    title: 'Morrus Digital Connecting',
    paragraphs: [
      'Morrus Digital Connecting adalah perusahaan pengembangan digital yang berfokus pada pembuatan website company profile, website custom, serta solusi dashboard bisnis.',
      'Kami percaya bahwa website bukan hanya sekadar tampilan visual, tetapi aset bisnis strategis yang membangun kepercayaan, memperjelas value, dan mendorong pertumbuhan klien.',
    ],
  },
  visionMission: {
    vision: 'Menjadi partner digital terpercaya bagi perusahaan Indonesia dalam membangun fondasi bisnis yang kuat di era digital.',
    missions: [
      'Menyediakan layanan pengembangan website yang modern, cepat, dan responsif di berbagai perangkat.',
      'Menerapkan arsitektur software yang bersih dan siap berkembang untuk kebutuhan bisnis jangka panjang.',
      'Memberikan pengalaman kolaborasi yang profesional, transparan, dan berorientasi pada hasil nyata.',
    ],
  },
  values: [
    {
      id: 'integrity',
      title: 'Integritas',
      description: 'Menjaga komitmen waktu, kejujuran teknis, dan standar kualitas tertinggi dalam setiap proses pengerjaan proyek tanpa kompromi.',
    },
    {
      id: 'innovation',
      title: 'Inovasi',
      description: 'Terus belajar, mengeksplorasi, dan beradaptasi dengan teknologi terbaru untuk memberikan solusi yang paling relevan dan modern.',
    },
    {
      id: 'collaboration',
      title: 'Kolaborasi',
      description: 'Bekerja berdampingan bersama klien bukan sebagai vendor, melainkan sebagai partner strategis untuk mencapai target bisnis bersama.',
    },
    {
      id: 'impact',
      title: 'Dampak Nyata',
      description: 'Setiap fitur yang kami rancang dan kode yang kami tulis diarahkan untuk memberikan dampak yang terukur bagi klien kami.',
    },
  ],
  legalities: [
    {
      type: 'Akta Pendirian',
      summary: 'Dokumen legal pembentukan perusahaan yang disahkan notaris sesuai ketentuan hukum.',
    },
    {
      type: 'NIB',
      summary: 'Nomor Induk Berusaha sebagai identitas resmi untuk menjalankan aktivitas usaha.',
    },
    {
      type: 'NPWP',
      summary: 'Dokumen perpajakan resmi negara sebagai bukti kepatuhan administrasi bisnis.',
    },
  ],
}
