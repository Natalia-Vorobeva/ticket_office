import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	base: "/ticket_office/",
	plugins: [react()],
	css: {
		postcss: './postcss.config.js', 
	}
})
