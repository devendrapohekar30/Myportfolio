import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/Myportfolio/',
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
