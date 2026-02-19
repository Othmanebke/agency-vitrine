import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    // split vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor':  ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
        },
      },
    },
    // inline small assets as base64 to avoid extra requests
    assetsInlineLimit: 8192,
    // enable CSS code splitting
    cssCodeSplit: true,
    // produce source maps only in dev
    sourcemap: false,
  },
})
