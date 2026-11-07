import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@projects': fileURLToPath(new URL('./projects', import.meta.url)),
      '@assets': fileURLToPath(new URL('./assets', import.meta.url)),
      '@ds': fileURLToPath(new URL('./src/ds', import.meta.url))
    }
  },
  server: {
    port: 5173,
    open: false,
    watch: { usePolling: true, interval: 300 },
    fs: {
      // السماح لـ Vite بقراءة الملفات خارج src
      allow: ['..']
    }
  }
});
