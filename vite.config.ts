import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const target = env.VITE_VEIN_BASE_URL ?? env.VEIN_BASE_URL

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: target
        ? {
            // Proxy `/api/*` to the Vein backend to avoid CORS during development
            '/api': {
              target,
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
          }
        : undefined,
    },
  }
})
