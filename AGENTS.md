# Panduan Kontribusi MDC Website

## Ruang Lingkup

Repository ini adalah website marketing publik MDC. Terapkan aturan berikut hanya untuk aplikasi ini, bukan untuk CMS dashboard atau backend.

## Teknologi dan Pola Implementasi

- Gunakan React 19, TypeScript, Vite, React Router 7, Tailwind CSS, Axios, Zustand, dan pola konfigurasi yang sudah ada.
- Pertahankan pemisahan yang sudah digunakan: halaman di `src/pages`, bagian halaman di `src/components`, layout di `src/layouts`, hook di `src/hooks`, service di `src/services`, tipe di `src/types`, dan data statis di `src/data`.
- Gunakan `SiteLayout` untuk halaman publik yang membutuhkan kerangka situs yang sama. Jangan membuat layout global baru jika kebutuhan dapat dipenuhi oleh layout atau komponen yang ada.
- Gunakan hook untuk logika state atau efek yang dapat digunakan ulang; gunakan service untuk akses dan pemetaan konten API. Hindari menaruh request API langsung di JSX halaman.
- Ikuti pola `PageStateSection` untuk state loading, error, dan kosong jika relevan. Pertahankan fallback konten statis yang sudah digunakan aplikasi.
- Gunakan komponen dan utilitas yang ada, termasuk helper tautan WhatsApp, metadata halaman, scroll-to-top, dan komponen section yang telah tersedia.

## Aturan Perubahan

- Lakukan perubahan sekecil mungkin dan jangan mengubah kontrak API, struktur data, atau visual halaman lain tanpa kebutuhan task.
- Untuk route publik baru, perbarui konfigurasi route, metadata halaman, dan sitemap. Jalankan `npm run sitemap` bila perlu memeriksa hasil sitemap secara terpisah; `npm run build` juga menjalankannya.
- Pastikan route dinamis tetap memiliki metadata, fallback, dan perilaku error yang aman ketika slug atau data tidak ditemukan.
- Jangan menambahkan dependensi baru untuk kebutuhan yang bisa ditangani dengan pola atau dependensi yang sudah terpasang.
- Jangan menaruh secret, kredensial, atau data internal di source code maupun konten publik.

## Verifikasi

- Jalankan `npm run lint` untuk memeriksa ESLint.
- Jalankan `npm run build` untuk memeriksa TypeScript, bundling Vite, dan pembuatan sitemap.
- Untuk perubahan UI, periksa route yang berubah pada desktop dan mobile, termasuk loading, error, tautan CTA, dan akses keyboard.
