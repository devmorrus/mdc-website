import type { HomeContent } from '../types/home'

export const HOME_STATIC_CONTENT: HomeContent = {
  navItems: [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'Tentang', href: '/#about' },
    { id: 'services', label: 'Layanan', href: '/#services' },
    { id: 'portfolio', label: 'Portofolio', href: '/#portfolio' },
    { id: 'contact', label: 'Kontak', href: '/#contact' },
  ],
  headerCtaLabel: 'Konsultasi Proyek',
  headerCtaHref: '/#contact',
  hero: {
    eyebrow: '',
    title: 'Website Company Profile yang Tampil Lebih Meyakinkan',
    description:
      'Bantu brand Anda terlihat lebih profesional dengan tampilan modern, struktur rapi, dan komunikasi yang lebih jelas.',
    primaryCtaLabel: 'Jadwalkan Konsultasi',
    primaryCtaHref: '/contact',
    secondaryCtaLabel: 'Layanan Kami',
    secondaryCtaHref: '/#services',
    trustPoints: [],
  },
  stats: [
    {
      label: 'Project Selesai',
      value: '120+',
      description: 'Implementasi website, dashboard, dan landing page lintas kebutuhan bisnis.',
    },
    {
      label: 'Mitra Aktif',
      value: '30+',
      description: 'Kolaborasi berulang dengan perusahaan yang membutuhkan partner digital jangka panjang.',
    },
    {
      label: 'Retensi Klien',
      value: '94%',
      description: 'Mayoritas klien kembali untuk pengembangan lanjutan dan dukungan maintenance.',
    },
    {
      label: 'Rata-rata Kickoff',
      value: '7 Hari',
      description: 'Alur kerja yang jelas membantu proyek bergerak cepat sejak fase awal.',
    },
  ],
  about: {
    eyebrow: 'Tentang Perusahaan',
    title: 'Partner digital yang menggabungkan strategi, desain, dan implementasi teknis.',
    summary:
      'Morrus Digital Connecting berfokus pada pengembangan website company profile dan solusi web bisnis yang membantu perusahaan tampil lebih meyakinkan di hadapan calon klien, partner, dan investor.',
    description:
      'Pendekatan kami dimulai dari struktur informasi, narasi brand, hingga eksekusi antarmuka yang responsif agar website tidak hanya terlihat rapi, tetapi juga efektif menyampaikan value perusahaan.',
    valuePoints: [
      'Struktur konten company profile yang rapi dan mudah dipahami.',
      'Desain modern yang tetap formal, profesional, dan konsisten dengan brand.',
      'Teknologi frontend yang ringan, responsif, dan siap dikembangkan ke tahap berikutnya.',
    ],
    buttonLabel: 'Pelajari Profil Perusahaan',
    buttonHref: '/about',
    teamMembers: [
      {
        id: 'raka',
        name: 'Raka Pratama',
        role: 'Creative Director',
        imageUrl: 'https://i.pravatar.cc/480?img=12',
      },
      {
        id: 'nadia',
        name: 'Nadia Putri',
        role: 'UI/UX Designer',
        imageUrl: 'https://i.pravatar.cc/480?img=32',
      },
      {
        id: 'bagas',
        name: 'Bagas Mahendra',
        role: 'Frontend Developer',
        imageUrl: 'https://i.pravatar.cc/480?img=15',
      },
      {
        id: 'tiara',
        name: 'Tiara Lestari',
        role: 'Project Manager',
        imageUrl: 'https://i.pravatar.cc/480?img=47',
      },
    ],
  },
  services: [
    {
      id: 'company-profile',
      tier: 'Starter',
      tag: 'Website',
      title: 'Website Company Profile',
      price: 'Mulai 8 Jt',
      priceSuffix: 'per project',
      description:
        'Untuk bisnis yang ingin memiliki company profile rapi, profesional, dan siap dipresentasikan ke calon klien.',
      highlights: ['Struktur halaman lengkap', 'Copy yang lebih rapi', 'Optimasi CTA dan kontak'],
      ctaLabel: 'Pilih Paket Starter',
      href: '/services',
    },
    {
      id: 'custom-web',
      tier: 'Growth',
      tag: 'Custom Development',
      title: 'Website dan Aplikasi Custom',
      price: 'Mulai 15 Jt',
      priceSuffix: 'per project',
      description:
        'Untuk kebutuhan website atau aplikasi yang perlu menyesuaikan alur operasional dan proses bisnis perusahaan.',
      highlights: ['Scope fleksibel', 'UI modern responsif', 'Arsitektur siap scale'],
      ctaLabel: 'Pilih Paket Growth',
      href: '/services',
    },
    {
      id: 'dashboard',
      tier: 'Business',
      tag: 'Business Tools',
      title: 'Dashboard dan Reporting',
      price: 'Mulai 12 Jt',
      priceSuffix: 'per module',
      description:
        'Untuk perusahaan yang membutuhkan ringkasan data, KPI, dan reporting yang lebih mudah dipantau tim internal.',
      highlights: ['Visual KPI', 'Hak akses multi-role', 'Ringkasan data yang jelas'],
      ctaLabel: 'Pilih Paket Business',
      href: '/services',
    },
    {
      id: 'support',
      tier: 'Support',
      tag: 'Support',
      title: 'Maintenance dan Improvement',
      price: 'Mulai 3 Jt',
      priceSuffix: 'per bulan',
      description:
        'Untuk bisnis yang ingin website tetap stabil, aman, dan terus berkembang setelah proses launch selesai.',
      highlights: ['Monitoring berkala', 'Perbaikan cepat', 'Pengembangan bertahap'],
      ctaLabel: 'Pilih Paket Support',
      href: '/services',
    },
  ],
  advantages: [
    {
      id: 'brand-first',
      title: 'Brand-first structure',
      description: 'Setiap halaman disusun untuk menegaskan positioning, value, dan kredibilitas perusahaan.',
      stat: 'SEO-ready',
    },
    {
      id: 'responsive',
      title: 'Responsive by default',
      description: 'Pengalaman pengguna tetap nyaman dari mobile hingga desktop tanpa mengorbankan tampilan.',
      stat: 'Mobile-first',
    },
    {
      id: 'scalable',
      title: 'Mudah dikembangkan',
      description: 'Fondasi konten dan komponen dibuat rapi agar mudah dihubungkan ke API atau CMS nanti.',
      stat: 'Future-proof',
    },
    {
      id: 'collaborative',
      title: 'Kolaborasi terarah',
      description: 'Proses kerja dibuat transparan supaya revisi, approval, dan delivery lebih efisien.',
      stat: 'Clear process',
    },
  ],
  portfolio: [
    {
      id: 'jaladewa-champion',
      name: 'Jaladewa Champion',
      category: 'Company Profile',
      summary: 'Website profil perusahaan dengan struktur layanan dan CTA yang lebih tegas.',
      outcome: 'Memperjelas positioning brand dan alur informasi untuk calon klien.',
      imageUrl:
        'https://images.pexels.com/photos/17988760/pexels-photo-17988760.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
      imageAlt: 'Gedung kantor modern sebagai placeholder project company profile.',
    },
    {
      id: 'jaladewa-absensi',
      name: 'JalaDewa Absensi',
      category: 'Internal Platform',
      summary: 'Sistem absensi berbasis web dengan tampilan dashboard yang ringkas dan mudah dipantau.',
      outcome: 'Membantu tim memonitor kehadiran dan ringkasan data operasional lebih cepat.',
      imageUrl:
        'https://images.pexels.com/photos/7947843/pexels-photo-7947843.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
      imageAlt: 'Laptop dengan tampilan dashboard analytics sebagai placeholder internal platform.',
    },
    {
      id: 'focus-trading',
      name: 'Focus Trading Contractor',
      category: 'Corporate Website',
      summary: 'Website perusahaan kontraktor yang dirancang lebih formal, kuat secara visual, dan informatif.',
      outcome: 'Meningkatkan kesan profesional saat brand diperkenalkan ke calon partner bisnis.',
      imageUrl:
        'https://images.pexels.com/photos/16253977/pexels-photo-16253977.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
      imageAlt: 'Struktur bangunan baja sebagai placeholder project website kontraktor.',
    },
    {
      id: 'dat-indonesia',
      name: 'DAT Indonesia',
      category: 'Business Landing Page',
      summary: 'Landing page korporat untuk menampilkan layanan utama dan mempermudah jalur kontak.',
      outcome: 'Mempercepat calon pelanggan menemukan layanan dan menghubungi tim.',
      imageUrl:
        'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
      imageAlt: 'Tim bisnis sedang rapat sebagai placeholder business landing page.',
    },
  ],
  testimonials: [
    {
      id: '1',
      name: 'Rizki Ramadhan',
      role: 'Business Development',
      company: 'PT Fokus Trading Contractor',
      quote:
        'Tim Morrus membantu kami merapikan penyampaian profil perusahaan secara digital. Hasilnya terlihat lebih profesional dan jauh lebih mudah dipresentasikan ke calon klien.',
    },
    {
      id: '2',
      name: 'Anisa Putri',
      role: 'Operations Lead',
      company: 'JalaDewa Group',
      quote:
        'Kolaborasinya enak, cepat, dan jelas. Dari sisi desain sampai implementasi, tim sangat memahami kebutuhan bisnis kami.',
    },
    {
      id: '3',
      name: 'Hendra Saputra',
      role: 'Marketing Manager',
      company: 'DAT Indonesia',
      quote:
        'Website baru membuat brand kami tampil lebih kredibel. Struktur informasinya juga lebih membantu saat calon pelanggan mencari detail layanan.',
    },
  ],
  partners: [
    { id: '1', name: 'JalaDewa Group', abbreviation: 'JG' },
    { id: '2', name: 'Focus Trading', abbreviation: 'FT' },
    { id: '3', name: 'DAT Indonesia', abbreviation: 'DI' },
    { id: '4', name: 'Nusa Integrasi', abbreviation: 'NI' },
    { id: '5', name: 'Astra Karya Mitra', abbreviation: 'AK' },
    { id: '6', name: 'Urban Logistik', abbreviation: 'UL' },
  ],
  articles: [
    {
      id: '1',
      category: 'Company Profile',
      title: '5 elemen penting homepage company profile yang membuat brand lebih meyakinkan',
      summary:
        'Ringkasan struktur konten yang membantu website perusahaan terasa lebih jelas, rapi, dan siap digunakan untuk presentasi bisnis.',
      publishedAt: '02 Juni 2026',
      readTime: '4 menit baca',
    },
    {
      id: '2',
      category: 'Web Strategy',
      title: 'Kenapa struktur informasi lebih penting daripada sekadar tampilan visual',
      summary:
        'Desain yang baik perlu ditopang hierarchy konten yang tepat agar pengunjung cepat memahami value perusahaan.',
      publishedAt: '28 Mei 2026',
      readTime: '5 menit baca',
    },
    {
      id: '3',
      category: 'Digital Branding',
      title: 'Cara menyusun CTA website agar calon klien lebih mudah menghubungi bisnis Anda',
      summary:
        'CTA yang terarah dapat membantu homepage bekerja lebih efektif sebagai titik awal komunikasi dengan prospek.',
      publishedAt: '21 Mei 2026',
      readTime: '3 menit baca',
    },
  ],
  contactCta: {
    eyebrow: 'Siap Memulai?',
    title: 'Bangun website company profile yang rapi, modern, dan siap dipresentasikan.',
    description:
      'Ceritakan kebutuhan bisnis Anda, lalu kita susun homepage yang selaras dengan branding dan tujuan komunikasi perusahaan.',
    primaryCtaLabel: 'Hubungi Tim Kami',
    primaryCtaHref: '/contact',
    secondaryCtaLabel: 'Chat via WhatsApp',
    secondaryCtaHref: '#whatsapp',
    bulletPoints: ['Diskusi kebutuhan awal', 'Estimasi dan scope jelas', 'Desain responsif modern'],
  },
  footer: {
    companyName: 'Morrus Digital Connecting',
    shortDescription: 'Partner digital untuk website company profile, aplikasi web, dan sistem bisnis yang modern.',
    quickLinks: [
      { label: 'Home', href: '/' },
      { label: 'Tentang', href: '/about' },
      { label: 'Layanan', href: '/services' },
      { label: 'Portofolio', href: '/portfolio' },
      { label: 'Kontak', href: '/contact' },
    ],
    email: 'hello@morrusdigital.com',
    phone: '+62 812 3456 7890',
  },
  whatsappNumber: '6281234567890',
  whatsappMessage: 'Halo Morrus Digital Connecting, saya ingin konsultasi pembuatan website company profile.',
}
