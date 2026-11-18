import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const { VITE_BASE_PATH = '/passkeys/' } = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    base: VITE_BASE_PATH,
    plugins: [react(), tailwindcss()],
    build: {
      license: { fileName: 'third-party-licenses.md' },
      rolldownOptions: {
        input: {
          german: resolve('index.html'),
          english: resolve('en/index.html'),
        },
      },
    },
  }
})
