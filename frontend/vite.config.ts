import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Check if running in Docker environment
const isDocker = process.env.DOCKER_ENV === 'true'
const backendTarget = isDocker ? 'http://backend:5000' : 'http://localhost:5000'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true,
    allowedHosts: [
      'localhost',
      'roma.codextown.xyz',
      '.ngrok-free.app',
      '.ngrok.io',
      '.ngrok.app'
    ],
    hmr: {
      host: 'roma.codextown.xyz',
      protocol: 'wss',
      clientPort: 443,
    },
    proxy: {
      '/api': { target: 'http://sentient-backend:5000', changeOrigin: true },
      '/socket.io': { target: 'ws://sentient-backend:5000', ws: true }
    }
  },
}) 