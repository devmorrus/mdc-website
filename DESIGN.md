# Standar Desain Website Marketing MDC

Dokumen ini adalah acceptance criteria UI untuk website publik MDC. Isinya tidak berlaku sebagai standar visual untuk CMS dashboard.

## Acceptance Criteria

- Halaman mempertahankan karakter visual MDC: dasar biru-navy, aksen kuning, kontras teks yang jelas, dan hierarki visual yang tenang serta profesional.
- Gunakan `SiteLayout` dan pola section yang sudah ada agar header, navigasi, footer, spacing, dan transisi ant halaman tetap konsisten.
- Setiap halaman publik memiliki struktur yang jelas: judul atau hero, konten utama yang mudah dipindai, dan CTA yang sesuai konteks.
- CTA WhatsApp menggunakan helper dan pola tautan yang sudah tersedia. Label CTA harus menjelaskan tindakan, bukan hanya “Klik di sini”.
- Layout responsif pada ukuran desktop, tablet, dan mobile. Tidak boleh ada konten terpotong, overflow horizontal, atau target sentuh yang sulit digunakan.
- Gunakan heading yang berurutan, label form yang terlihat, alt text untuk gambar informatif, dan indikator fokus untuk navigasi keyboard.
- State loading, error, kosong, dan fallback konten harus tetap memiliki hierarki visual yang jelas serta tidak membuat pengguna buntu.
- Halaman publik baru harus mengikuti pola metadata, route, dan sitemap yang berlaku pada website.
- Detail portfolio, blog, layanan, tentang, dan kontak harus terasa sebagai bagian dari satu situs; jangan memperkenalkan warna, radius, tipografi, atau pola CTA yang berdiri sendiri tanpa alasan.

## Pemeriksaan Sebelum Selesai

- Bandingkan halaman baru dengan halaman publik terdekat untuk memastikan layout dan komponen dapat digunakan ulang.
- Uji keyboard, pembacaan label, kontras, tautan WhatsApp, dan tampilan pada viewport sempit.
- Pastikan perubahan tidak menghilangkan metadata SEO, route publik, atau entry sitemap.
