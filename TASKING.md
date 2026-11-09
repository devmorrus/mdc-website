# FE: Tasking Website MDC

## Objective

Jelaskan hasil frontend website publik yang ingin dicapai, halaman atau komponen yang terdampak, dan alasan perubahan.

## Business Rules

- Sebutkan apakah task menambah atau mengubah route publik. Jika ya, sertakan path, kebutuhan metadata, dan kewajiban memperbarui sitemap.
- Jelaskan sumber data: API/service, data statis, atau kombinasi keduanya.
- Sebutkan kebutuhan state loading, error, kosong, fallback, dan CTA WhatsApp bila relevan.
- Bedakan perubahan visual website marketing dari kebutuhan CMS atau backend.

## Acceptance Criteria

- Halaman atau komponen mengikuti `SiteLayout`, pola visual biru-navy dan aksen kuning, serta responsivitas website.
- Konten, navigasi, metadata, CTA, aksesibilitas, dan route yang terdampak bekerja sesuai task.
- Jika route publik berubah, sitemap ikut diperbarui.

## Testing

- Jalankan `npm run lint`.
- Jalankan `npm run build`.
- Periksa halaman terdampak pada desktop dan mobile, termasuk loading/error dan tautan CTA bila ada.
