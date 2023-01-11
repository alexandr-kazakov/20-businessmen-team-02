import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: Number(process.env.SERVER_PORT) || 3001,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: './index.html',
        main: './src/main.tsx',
        'service-worker': './src/service-worker.ts',
      },
      output: {
        entryFileNames: assetInfo => {
          return assetInfo.name === 'service-worker' ? '[name].js' : 'assets/[name]-[hash].js'
        },
      },
    },
  },
})
