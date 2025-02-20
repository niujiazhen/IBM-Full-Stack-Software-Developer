import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/IBM-Full-Stack-Software-Developer",
  plugins: [react()],
})
