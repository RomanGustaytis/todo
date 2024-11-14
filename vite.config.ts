import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Эмуляция браузерного окружения
    globals: true, // Включение глобальных переменных (включая expect)
    setupFiles: ['./src/setupTests.ts'], // Для настройки jest-dom matchers
  },
})
