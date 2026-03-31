import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Pisahkan Three.js dan GSAP ke chunk terpisah agar tidak
    // masuk bundle utama dan bisa di-cache browser secara independen.
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js ~600KB → chunk sendiri, di-cache setelah kunjungan pertama
          if (id.includes('node_modules/three')) return 'three'
          // GSAP ~80KB → chunk sendiri
          if (id.includes('node_modules/gsap')) return 'gsap'
          // React + React DOM + React Router → satu chunk vendor
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router-dom')
          ) {
            return 'react-vendor'
          }
        },
      },
    },
    // Peringatan chunk besar mulai 600KB (Three.js memang besar)
    chunkSizeWarningLimit: 700,
  },
})