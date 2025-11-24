import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "https://natalia-vorobeva.github.io/ticket_office/",
  plugins: [react()],
})
