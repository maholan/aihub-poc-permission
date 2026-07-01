import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' → เปิดได้ทุก subpath (GitHub Pages /<repo>/) เพราะเป็น SPA หน้าเดียว ไม่มี router
// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
})
