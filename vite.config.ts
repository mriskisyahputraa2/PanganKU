import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'; // 🟢 tambahkan baris ini

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'], // 🟢 pastikan CSS ikut
      refresh: true,
    }),
    react(),
    tailwindcss(), // 🟢 aktifkan plugin tailwind di Vite
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
    },
  },
});
