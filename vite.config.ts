import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl = env.VITE_BACKEND_URL || 'http://127.0.0.1:3000'

  return {
    plugins: [react()],

    server: {
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
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
  }
})
