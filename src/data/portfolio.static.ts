import datGalleryOne from '../assets/porto-dat/porto-dat-1.png'
import datGalleryTwo from '../assets/porto-dat/porto-dat-2.png'
import ftcGalleryOne from '../assets/porto-ftc/porto-ftc-1.png'
import ftcGalleryTwo from '../assets/porto-ftc/porto-ftc-2.png'
import jdcCompanyOne from '../assets/porto-jdc-company/porto-jdc-company-1.png'
import jdcCompanyTwo from '../assets/porto-jdc-company/porto-jdc-company-2.png'
import jdcManagementOne from '../assets/porto-jdc-management/porto-jdc-management-1.png'
import jdcManagementTwo from '../assets/porto-jdc-management/porto-jdc-management-2.png'
import jdcManagementThree from '../assets/porto-jdc-management/porto-jdc-management-3.png'
import jdcManagementFour from '../assets/porto-jdc-management/porto-jdc-management-4.png'
import jdcManagementFive from '../assets/porto-jdc-management/porto-jdc-management-5.png'
import jdcManagementSix from '../assets/porto-jdc-management/porto-jdc-management-6.png'
import type { PortfolioContent } from '../types/portfolio'

export const PORTFOLIO_STATIC_CONTENT: PortfolioContent = {
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
    eyebrow: 'Halaman Portfolio',
    title: 'Project Pilihan yang Menunjukkan Cara Kami Membangun Solusi Digital',
    description:
      'Dari website company profile, sistem operasional internal, hingga e-commerce, setiap project kami susun dengan pendekatan yang fokus pada kebutuhan bisnis dan hasil yang terukur.',
  },
  projects: [
    {
      id: 'jaladewa-champion',
      slug: 'jaladewa-champion',
      name: 'Jaladewa Champion',
      client: 'Jaladewa Champion',
      year: '2026',
      category: 'Company Profile',
      industry: 'Pendidikan & Olahraga',
      serviceType: 'Company Profile Website + Online Registration',
      summary:
        'Website company profile untuk memperkenalkan program kelas sekaligus mempermudah proses pendaftaran calon siswa secara online.',
      challenge:
        'Jaladewa Champion membutuhkan website yang dapat menjelaskan program, instruktur, dan aktivitas kelas dengan lebih meyakinkan, sekaligus membuka jalur pendaftaran yang lebih praktis bagi calon wali murid.',
      objective:
        'Membuat website company profile yang informatif, mudah dinavigasi, dan siap membantu proses pendaftaran online tanpa membuat calon pendaftar bingung.',
      solution:
        'Kami menyusun struktur halaman yang menonjolkan informasi kelas, profil instruktur, galeri kegiatan, dan form pendaftaran agar calon wali murid bisa memahami program lalu langsung mengambil tindakan.',
      outcome:
        'Website ini membantu calon wali murid mengenal program Jaladewa Champion dengan lebih cepat dan melakukan pendaftaran secara online dengan alur yang lebih sederhana.',
      deliverables: [
        'Informasi kelas',
        'Halaman instruktur',
        'Galeri kegiatan',
        'Form pendaftaran online',
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive UI'],
      thumbnailLabel: 'JC',
      thumbnailTone: 'amber',
      gallery: [
        {
          src: jdcCompanyOne,
          alt: 'Halaman utama website Jaladewa Champion',
          caption: 'Hero section dan navigasi utama website',
        },
        {
          src: jdcCompanyTwo,
          alt: 'Form pendaftaran online Jaladewa Champion',
          caption: 'Form pendaftaran online untuk calon siswa',
        },
      ],
    },
    {
      id: 'jaladewa-management-system',
      slug: 'jaladewa-management-system',
      name: 'Jaladewa Management System',
      client: 'Jaladewa Champion',
      year: '2026',
      category: 'Internal Platform',
      industry: 'Pendidikan & Operasional',
      serviceType: 'Attendance & Operational Management System',
      summary:
        'Sistem manajemen operasional untuk mengelola jadwal latihan, absensi coach, invoice, dan budgeting dalam satu dashboard terpusat.',
      challenge:
        'Tim Jaladewa memerlukan sistem yang bisa menyatukan data operasional harian agar jadwal, absensi, pembayaran, dan pengajuan kebutuhan tidak lagi tersebar di banyak alur manual.',
      objective:
        'Membangun dashboard operasional yang memudahkan tim mengatur aktivitas kelas, memantau transaksi, dan menjaga proses internal tetap rapi.',
      solution:
        'Kami merancang modul dashboard, jadwal latihan, absensi coach, invoice, dan budgeting plan dengan alur yang terhubung agar operasional kelas dapat dipantau dari satu tempat.',
      outcome:
        'Sistem ini membantu pengelolaan jadwal, absensi, pembayaran, dan operasional kelas menjadi lebih rapi, cepat dipantau, dan terpusat.',
      deliverables: [
        'Dashboard operasional',
        'Jadwal latihan',
        'Absensi coach',
        'Invoice',
        'Budgeting plan',
      ],
      technologies: ['React', 'TypeScript', 'Dashboard UI', 'Role-based Access'],
      thumbnailLabel: 'JMS',
      thumbnailTone: 'blue',
      gallery: [
        {
          src: jdcManagementOne,
          alt: 'Dashboard utama Jaladewa Management System',
          caption: 'Dashboard utama untuk ringkasan operasional',
        },
        {
          src: jdcManagementTwo,
          alt: 'Kalender jadwal latihan Jaladewa Management System',
          caption: 'Manajemen jadwal latihan dan kalender kelas',
        },
        {
          src: jdcManagementThree,
          alt: 'Halaman budgeting plan Jaladewa Management System',
          caption: 'Budgeting plan untuk kebutuhan operasional',
        },
        {
          src: jdcManagementFour,
          alt: 'Daftar invoice Jaladewa Management System',
          caption: 'Pengelolaan invoice dan status pembayaran',
        },
        {
          src: jdcManagementFive,
          alt: 'Daftar jadwal latihan Jaladewa Management System',
          caption: 'Monitoring jadwal latihan per sesi',
        },
        {
          src: jdcManagementSix,
          alt: 'Tampilan mobile kelas Jaladewa Management System',
          caption: 'Akses mobile untuk pengelolaan kelas',
        },
      ],
    },
    {
      id: 'dat-indonesia',
      slug: 'dat-indonesia',
      name: 'DAT Indonesia',
      client: 'DAT Indonesia',
      year: '2026',
      category: 'E-Commerce',
      industry: 'Retail Elektronik',
      serviceType: 'E-Commerce Website + Admin Dashboard',
      summary:
        'Platform e-commerce untuk menampilkan katalog produk, memproses checkout, dan membantu tim mengelola transaksi dari dashboard admin.',
      challenge:
        'DAT Indonesia membutuhkan website penjualan yang tidak hanya menampilkan produk, tetapi juga mampu mendukung alur checkout, pembayaran, dan pengelolaan transaksi dengan lebih efisien.',
      objective:
        'Membuat website e-commerce yang mempermudah pelanggan berbelanja sekaligus memberi tim internal kontrol yang lebih baik terhadap transaksi.',
      solution:
        'Kami menyiapkan struktur katalog produk, ongkir otomatis, payment gateway, dan dashboard administrasi agar proses pembelian dan pengelolaan transaksi berjalan lebih terintegrasi.',
      outcome:
        'Website ini membantu proses penjualan online dari katalog produk, checkout, pembayaran, hingga pengelolaan transaksi dalam satu alur yang lebih rapi.',
      deliverables: [
        'Katalog produk',
        'Ongkir otomatis',
        'Payment gateway',
        'Manajemen transaksi',
      ],
      technologies: ['React', 'TypeScript', 'E-Commerce UI', 'Admin Dashboard'],
      thumbnailLabel: 'DAT',
      thumbnailTone: 'sky',
      gallery: [
        {
          src: datGalleryOne,
          alt: 'Halaman utama e-commerce DAT Indonesia',
          caption: 'Homepage e-commerce untuk promosi produk unggulan',
        },
        {
          src: datGalleryTwo,
          alt: 'Halaman katalog produk DAT Indonesia',
          caption: 'Katalog produk untuk pengalaman belanja online',
        },
      ],
    },
    {
      id: 'focus-trading-contractor',
      slug: 'focus-trading-contractor',
      name: 'CV. Focus Trading Contractor',
      client: 'CV. Focus Trading Contractor',
      year: '2026',
      category: 'Corporate Website',
      industry: 'Kontraktor & Infrastruktur',
      serviceType: 'Company Profile Website + Admin Dashboard',
      summary:
        'Website company profile untuk menampilkan layanan dan portfolio project, dilengkapi dashboard admin agar konten dan inquiry dapat dikelola lebih terstruktur.',
      challenge:
        'Perusahaan membutuhkan website yang lebih profesional untuk menampilkan kapabilitas, portfolio project, dan memudahkan calon klien mengirim permintaan penawaran.',
      objective:
        'Membangun website company profile yang kuat secara visual dan informatif, sekaligus memberi tim cara yang lebih mudah untuk mengelola konten portfolio.',
      solution:
        'Kami merancang halaman profil perusahaan, portfolio project, request quotation, dan content management agar informasi layanan serta inquiry project dapat tersusun rapi.',
      outcome:
        'Website ini membantu perusahaan menampilkan layanan, mengelola portfolio, dan menerima inquiry project secara lebih terstruktur.',
      deliverables: [
        'Profil perusahaan',
        'Portfolio project',
        'Request quotation',
        'Content management',
      ],
      technologies: ['React', 'TypeScript', 'Content Management UI', 'Responsive Layout'],
      thumbnailLabel: 'FTC',
      thumbnailTone: 'amber',
      gallery: [
        {
          src: ftcGalleryOne,
          alt: 'Halaman portfolio CV Focus Trading Contractor',
          caption: 'Portfolio project untuk menampilkan dokumentasi pekerjaan',
        },
        {
          src: ftcGalleryTwo,
          alt: 'Halaman hero website CV Focus Trading Contractor',
          caption: 'Hero section untuk profil perusahaan dan layanan utama',
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
