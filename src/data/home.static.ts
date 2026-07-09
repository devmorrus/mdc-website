import datGalleryOne from '../assets/porto-dat/porto-dat-1.png'
import ftcGalleryTwo from '../assets/porto-ftc/porto-ftc-2.png'
import jdcCompanyOne from '../assets/porto-jdc-company/porto-jdc-company-1.png'
import jdcManagementOne from '../assets/porto-jdc-management/porto-jdc-management-1.png'
import type { HomeContent } from '../types/home'

export const HOME_STATIC_CONTENT: HomeContent = {
  navItems: [
    { id: 'about', label: 'Tentang', href: '/#about' },
    { id: 'services', label: 'Layanan', href: '/#services' },
    { id: 'portfolio', label: 'Portofolio', href: '/#portfolio' },
    { id: 'blog', label: 'Blog', href: '/#blog' },
    { id: 'contact', label: 'Kontak', href: '/#contact' },
  ],
  headerCtaLabel: 'Konsultasi Sekarang',
  headerCtaHref:
    'https://wa.me/6281229999752?text=Halo%20Morrus%20Digital%20Connecting%2C%20saya%20ingin%20konsultasi%20pembuatan%20website.',
  hero: {
    eyebrow: 'Website untuk Bisnis yang Ingin Naik Kelas',
    title: 'Website Profesional yang Lebih Meyakinkan.',
    description:
      'Kami bantu bisnis tampil lebih rapi, lebih cepat dipercaya, dan lebih siap mendatangkan klien.',
    primaryCtaLabel: 'Konsultasi Gratis',
    primaryCtaHref: '/#contact',
    secondaryCtaLabel: 'Lihat Layanan',
    secondaryCtaHref: '/#services',
    trustPoints: [],
  },
  stats: [
    {
      label: 'Proyek Selesai',
      value: '120+',
      description: 'Website dan sistem digital yang telah selesai dikerjakan.',
    },
    {
      label: 'Klien Aktif',
      value: '30+',
      description: 'Bisnis yang masih mempercayakan kebutuhan digitalnya kepada kami.',
    },
    {
      label: 'Klien Kembali',
      value: '94%',
      description: 'Persentase klien yang kembali untuk kebutuhan berikutnya.',
    },
    {
      label: 'Kickoff Pertama',
      value: '5 Hari',
      description: 'Rata-rata waktu dari konsultasi awal hingga project dimulai.',
    },
  ],
  about: {
    eyebrow: 'Tentang Perusahaan',
    title: 'Partner Digital untuk Bisnis yang Ingin Naik Kelas.',
    summary:
      'Kami membantu bisnis tampil lebih profesional, lebih dipercaya, dan lebih siap bersaing di ranah digital.',
    description:
      'Dari strategi, desain, hingga pengembangan, kami membangun website dan platform yang tidak hanya enak dilihat, tetapi juga membantu bisnis bergerak lebih percaya diri.',
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
        name: 'Office Meeting',
        role: 'Gallery Slide',
        imageUrl:
          'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
      },
      {
        id: 'nadia',
        name: 'Workspace',
        role: 'Gallery Slide',
        imageUrl:
          'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
      },
      {
        id: 'bagas',
        name: 'Presentation',
        role: 'Gallery Slide',
        imageUrl:
          'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
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
      originalPrice: '12 Jt',
      priceSuffix: 'per project',
      isFeatured: true,
      description: 'Tampil profesional di hadapan klien & Google.',
      features: [
        { label: 'Halaman: Beranda, Tentang, Layanan, Kontak', included: true },
        { label: 'Konten & copywriting terstruktur', included: true },
        { label: 'Tombol CTA & Form kontak terintegrasi', included: true },
        { label: 'Optimasi Mobile & Desktop sempurna', included: true },
      ],
      ctaLabel: 'Mulai Konsultasi Gratis',
      whatsappMessage:
        'Halo Morrus Digital Connecting, saya tertarik dengan layanan Website Company Profile. Saya ingin konsultasi lebih lanjut.',
      href: '/services',
    },
    {
      id: 'custom-web',
      tier: 'Growth',
      tag: 'Custom Development',
      title: 'Website & Aplikasi Custom',
      price: 'Mulai 15 Jt',
      originalPrice: '21 Jt',
      priceSuffix: 'per project',
      description: 'Sistem untuk alur kerja operasional khusus.',
      features: [
        { label: 'Fitur disesuaikan kebutuhan bisnis', included: true },
        { label: 'Desain UI modern & responsif', included: true },
        { label: 'Koneksi API sistem pihak ketiga', included: true },
        { label: 'Source code bersih & terukur', included: true },
      ],
      ctaLabel: 'Diskusikan Kebutuhan Anda',
      whatsappMessage:
        'Halo Morrus Digital Connecting, saya tertarik dengan layanan Website dan Aplikasi Custom. Saya ingin diskusi kebutuhan project saya.',
      href: '/services',
    },
    {
      id: 'dashboard',
      tier: 'Business',
      tag: 'Business Tools',
      title: 'Dashboard & Sistem Internal',
      price: 'Mulai 12 Jt',
      originalPrice: '18 Jt',
      priceSuffix: 'per modul',
      description: 'Pantau performa tim dari satu tempat.',
      features: [
        { label: 'Tampilan KPI & pemantauan real-time', included: true },
        { label: 'Login multi-role (Admin, Manajer, Staf)', included: true },
        { label: 'Visualisasi data interaktif', included: true },
        { label: 'Filter, cetak & ekspor laporan otomatis', included: true },
      ],
      ctaLabel: 'Lihat Detail Layanan',
      whatsappMessage:
        'Halo Morrus Digital Connecting, saya tertarik dengan layanan Dashboard dan Sistem Internal. Saya ingin konsultasi lebih lanjut.',
      href: '/services',
    },
    // {
    //   id: 'support',
    //   tier: 'Support',
    //   tag: 'Support',
    //   title: 'Maintenance dan Improvement',
    //   price: 'Mulai 3 Jt',
    //   originalPrice: '5 Jt',
    //   priceSuffix: 'per bulan',
    //   description:
    //     'Untuk bisnis yang ingin website tetap stabil, aman, dan terus berkembang setelah proses launch selesai.',
    //   features: [
    //     { label: 'Monitoring berkala', included: true },
    //     { label: 'Perbaikan cepat untuk issue prioritas', included: true },
    //     { label: 'Update keamanan dan performa', included: true },
    //     { label: 'Pengembangan bertahap', included: true },
    //     { label: 'Pembuatan website baru dari nol', included: false },
    //     { label: 'Dashboard bisnis custom penuh', included: false },
    //   ],
    //   ctaLabel: 'Pilih Paket Support',
    //   whatsappMessage:
    //     'Halo Morrus Digital Connecting, saya tertarik dengan Paket Support untuk Maintenance dan Improvement. Saya ingin konsultasi lebih lanjut.',
    //   href: '/services',
    // },
  ],
  advantages: [
    {
      id: 'brand-first',
      title: 'Brand-first structure',
      description: 'Struktur halaman menonjolkan positioning dan kredibilitas brand.',
      stat: 'SEO-ready',
      accent: {
        iconColor: '#b7791f',
        iconBackground: '#fff3d6',
        iconHoverBackground: 'rgba(255,243,214,0.18)',
      },
      imageUrl:
        'https://images.pexels.com/photos/21405617/pexels-photo-21405617.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200',
      imageAlt: 'Laptop dan meja kerja modern sebagai representasi fondasi brand digital yang rapi.',
    },
    {
      id: 'responsive',
      title: 'Responsive by default',
      description: 'Tampilan tetap nyaman dari mobile sampai desktop.',
      stat: 'Mobile-first',
      accent: {
        iconColor: '#1d6fd8',
        iconBackground: '#e6f1ff',
        iconHoverBackground: 'rgba(230,241,255,0.18)',
      },
      imageUrl:
        'https://images.pexels.com/photos/8068255/pexels-photo-8068255.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200',
      imageAlt: 'Tim bekerja dengan laptop di kantor modern sebagai representasi pengalaman digital responsif.',
    },
    {
      id: 'scalable',
      title: 'Mudah dikembangkan',
      description: 'Fondasi rapi untuk integrasi API atau CMS berikutnya.',
      stat: 'Future-proof',
      accent: {
        iconColor: '#118a66',
        iconBackground: '#e1f6ef',
        iconHoverBackground: 'rgba(225,246,239,0.18)',
      },
      imageUrl:
        'https://images.pexels.com/photos/34069/pexels-photo.jpg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200',
      imageAlt: 'Layar laptop dengan grafik analytics sebagai representasi sistem yang siap dikembangkan.',
    },
    {
      id: 'collaborative',
      title: 'Kolaborasi terarah',
      description: 'Alur kerja transparan membuat revisi dan approval lebih efisien.',
      stat: 'Clear process',
      accent: {
        iconColor: '#8b5cf6',
        iconBackground: '#efe7ff',
        iconHoverBackground: 'rgba(239,231,255,0.18)',
      },
      imageUrl:
        'https://images.pexels.com/photos/7643742/pexels-photo-7643742.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200',
      imageAlt: 'Tim berdiskusi di depan laptop sebagai representasi kolaborasi proyek yang terarah.',
    },
  ],
  portfolio: [
    {
      id: 'jaladewa-champion',
      name: 'Jaladewa Champion',
      category: 'Company Profile',
      summary: 'Company profile website dengan informasi kelas, instruktur, galeri, dan pendaftaran online.',
      outcome: 'Mempermudah calon wali murid mengenal program dan mendaftar secara online.',
      href: '/#portfolio',
      imageUrl: jdcCompanyOne,
      imageAlt: 'Halaman utama website Jaladewa Champion.',
    },
    {
      id: 'jaladewa-management-system',
      name: 'Jaladewa Management System',
      category: 'Internal Platform',
      summary: 'Dashboard operasional untuk jadwal latihan, absensi coach, invoice, dan budgeting plan.',
      outcome: 'Membuat pengelolaan operasional kelas lebih rapi dan terpusat.',
      href: '/#portfolio',
      imageUrl: jdcManagementOne,
      imageAlt: 'Dashboard operasional Jaladewa Management System.',
    },
    {
      id: 'dat-indonesia',
      name: 'DAT Indonesia',
      category: 'E-Commerce',
      summary: 'Website e-commerce dengan katalog produk, ongkir otomatis, payment gateway, dan admin transaksi.',
      outcome: 'Membantu proses penjualan online dari katalog hingga pengelolaan transaksi.',
      href: '/#portfolio',
      imageUrl: datGalleryOne,
      imageAlt: 'Halaman utama e-commerce DAT Indonesia.',
    },
    {
      id: 'focus-trading-contractor',
      name: 'CV. Focus Trading Contractor',
      category: 'Corporate Website',
      summary: 'Company profile website dengan portfolio project, request quotation, dan content management.',
      outcome: 'Membantu perusahaan menampilkan layanan dan menerima inquiry project lebih terstruktur.',
      href: '/#portfolio',
      imageUrl: ftcGalleryTwo,
      imageAlt: 'Hero section website CV. Focus Trading Contractor.',
    },
  ],
  testimonials: [
    {
      id: '1',
      headline: 'Tampil Lebih Profesional',
      name: 'Rizki Ramadhan',
      role: 'Business Development',
      company: 'PT Fokus Trading Contractor',
      quote:
        'Tim Morrus membantu kami merapikan penyampaian profil perusahaan secara digital. Hasilnya terlihat lebih profesional dan jauh lebih mudah dipresentasikan ke calon klien.',
    },
    {
      id: '2',
      headline: 'Kolaborasi Lancar',
      name: 'Anisa Putri',
      role: 'Operations Lead',
      company: 'JalaDewa Group',
      quote:
        'Kolaborasinya enak, cepat, dan jelas. Dari sisi desain sampai implementasi, tim sangat memahami kebutuhan bisnis kami.',
    },
    {
      id: '3',
      headline: 'Brand Tampil Kredibel',
      name: 'Hendra Saputra',
      role: 'Marketing Manager',
      company: 'DAT Indonesia',
      quote:
        'Website baru membuat brand kami tampil lebih kredibel. Struktur informasinya juga lebih membantu saat calon pelanggan mencari detail layanan.',
    },
    {
      id: '4',
      headline: 'Solutif dan Inovatif',
      name: 'Budi Santoso',
      role: 'Product Owner',
      company: 'TechSynergy',
      quote:
        'Mereka tidak hanya mengeksekusi ide, tetapi juga memberi insight yang membuat hasil akhir jauh melampaui ekspektasi awal kami.',
    },
  ],
  partners: [
    { id: '1', name: 'Jaladewa Champion', abbreviation: 'JC' },
    { id: '2', name: 'Focus Trading Contractor', abbreviation: 'FTC' },
    { id: '3', name: 'Mitra Cemerlang Bersama', abbreviation: 'MCB' },
    { id: '4', name: 'Deferd Concept', abbreviation: 'DC' },
    { id: '5', name: 'DAT Indonesia', abbreviation: 'DAT' },
    { id: '6', name: 'iPhone Gresik', abbreviation: 'IG' },
  ],
  articles: [
    {
      id: '1',
      category: 'Company Profile',
      title: '5 elemen penting homepage company profile yang membuat brand lebih meyakinkan',
      summary:
        'Ringkasan struktur konten yang membantu website perusahaan terasa lebih jelas, rapi, dan siap digunakan untuk presentasi bisnis.',
      publishedAt: '02 Juni 2026',
      author: 'Tim Morrus',
      href: '/#',
      imageUrl:
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
      imageAlt: 'Tim bisnis berdiskusi di ruang meeting sebagai cover artikel company profile.',
    },
    {
      id: '2',
      category: 'Web Strategy',
      title: 'Kenapa struktur informasi lebih penting daripada sekadar tampilan visual',
      summary:
        'Desain yang baik perlu ditopang hierarchy konten yang tepat agar pengunjung cepat memahami value perusahaan.',
      publishedAt: '28 Mei 2026',
      author: 'Morrus Insight',
      href: '/#',
      imageUrl:
        'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
      imageAlt: 'Sticky notes dan alur strategi sebagai cover artikel web strategy.',
    },
    {
      id: '3',
      category: 'Digital Branding',
      title: 'Cara menyusun CTA website agar calon klien lebih mudah menghubungi bisnis Anda',
      summary:
        'CTA yang terarah dapat membantu homepage bekerja lebih efektif sebagai titik awal komunikasi dengan prospek.',
      publishedAt: '21 Mei 2026',
      author: 'Admin Editorial',
      href: '/#',
      imageUrl:
        'https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
      imageAlt: 'Laptop dan diskusi tim pemasaran sebagai cover artikel digital branding.',
    },
  ],
  contactCta: {
    eyebrow: 'Siap Memulai?',
    title: 'Bangun solusi digital yang rapi, modern, dan meyakinkan.',
    description:
      'Ceritakan tantangan bisnis Anda, lalu tim kami akan merekomendasikan strategi dan pengembangan platform yang selaras dengan tujuan pertumbuhan perusahaan Anda.',
    primaryCtaLabel: 'Hubungi Tim Kami',
    primaryCtaHref: '/contact',
    secondaryCtaLabel: 'Widget WhatsApp',
    secondaryCtaHref: '#whatsapp',
    bulletPoints: ['Diskusi kebutuhan awal', 'Estimasi dan scope jelas', 'Desain responsif modern'],
  },
  footer: {
    companyName: 'Morrus Digital Connecting',
    shortDescription: 'Partner digital untuk website company profile, aplikasi web, dan sistem bisnis yang modern.',
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
  whatsappNumber: '6281229999752',
  whatsappMessage: 'Halo Morrus Digital Connecting, saya ingin konsultasi pembuatan website company profile.',
}
