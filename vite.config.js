import { defineConfig } from 'vite'
import million from 'million/compiler'
import react from '@vitejs/plugin-react-swc'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
// https://million.dev/docs/install#use-the-compiler
export default defineConfig({
  plugins: [
    million.vite(),
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  base: '/pomodoro-clock/'
})
