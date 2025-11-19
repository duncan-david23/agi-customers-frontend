
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import React from 'react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
   server: {
    host: '0.0.0.0', // 👈 makes the dev server accessible to other devices
    port: 5173,       // or any port you prefer
  },
})