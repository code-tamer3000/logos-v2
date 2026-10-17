import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // Доступ через туннель cloudpub: точка в начале разрешает все поддомены
    allowedHosts: ['.cloudpub.ru'],
    // В dev API отдаёт отдельный процесс (server/), см. npm run server
    proxy: {
      '/api': 'http://localhost:3001',
      '/uploads': 'http://localhost:3001',
    },
  },
})
