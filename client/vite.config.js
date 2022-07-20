import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.CLIENT_HOST,
    port: process.env.CLIENT_PORT
  },
  build: {
    outDir: "../build/client",
    emptyOutDir: true
  }
})
