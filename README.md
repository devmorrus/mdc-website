# MDC Website

Website company profile berbasis React + TypeScript dengan fokus pada:

- Visual premium (clean UI)
- Motion interaktif (GSAP)
- Elemen 3D (Three.js)
- Struktur clean architecture agar mudah dikembangkan dari konten statis ke konten dinamis via API

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- GSAP
- Three.js
- Axios (siap untuk integrasi API)

## Tujuan Project

Project ini digunakan sebagai fondasi website company profile yang:

1. Cepat untuk fase awal (konten statis)
2. Mudah diskalakan untuk fase berikutnya (konten API/CMS)
3. Menjaga pemisahan tanggung jawab antar layer (data, service, hook/use case, presentasi)

## Struktur Folder (Ringkas)

```text
src/
  animations/   # GSAP animation hook/utility
  components/   # UI components (presentational)
  data/         # Data statis/mock source
  hooks/        # Use case hooks
  layouts/      # Layout level components
  pages/        # Page composition
  services/     # Service/repository layer (static/api)
  three/        # Three.js canvas/components
  types/        # Type contracts/domain models
```

## Prasyarat

- Node.js 20+
- npm 10+

## Instalasi

1. Clone repository

```bash
git clone <url-repository>
cd mdc-website
```

2. Install dependencies

```bash
npm install
```

3. Jalankan mode development

```bash
npm run dev
```

4. Build production

```bash
npm run build
```

5. Preview hasil build

```bash
npm run preview
```

## Pengaturan Konten Home (Static/API)

Layer service home sudah disiapkan agar bisa switch sumber data.

- Default: static content
- Opsi: API content (saat implementasi endpoint selesai)

Gunakan env berikut jika ingin mode API:

```env
VITE_HOME_CONTENT_MODE=api
```

Saat ini mode `api` akan melempar error placeholder sampai implementasi endpoint ditambahkan di service home.

## Scripts

- `npm run dev`: menjalankan development server
- `npm run build`: type-check + build production
- `npm run preview`: preview build lokal
- `npm run lint`: menjalankan ESLint

## Catatan Pengembangan

- Gunakan folder `types` sebagai kontrak data utama agar perubahan API terkontrol.
- Simpan logic pengambilan data di `services`, jangan langsung di komponen.
- Gunakan `hooks` sebagai use case untuk orchestration loading/error/state.
- Komponen di `components` dijaga presentational (minim business logic).

## Roadmap Singkat

1. Integrasi API/CMS untuk konten company profile
2. Penambahan halaman selain home (about, services detail, contact)
3. SEO metadata + performance hardening
4. Testing (unit + integration)
