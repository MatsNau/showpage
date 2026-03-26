import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// Set BASE_URL to your GitHub Pages repo path, e.g. '/my-portfolio/'
// Leave as '/' for a user/org page (username.github.io)
export default defineConfig({
  plugins: [vue()],
  base: process.env.BASE_URL ?? '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
