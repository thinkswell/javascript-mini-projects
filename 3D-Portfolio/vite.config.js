import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { webpack } from 'webpack'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
