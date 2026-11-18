import { defineConfig } from '@playwright/test'

const origin = 'http://127.0.0.1:4173'
const basePath = process.env.VITE_BASE_PATH || '/passkeys/'
const baseURL = new URL(basePath, origin).href

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  forbidOnly: !!process.env.CI,
  workers: 2,
  use: {
    baseURL,
    browserName: 'chromium',
    trace: 'retain-on-failure',
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
})
