import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Inspect from 'vite-plugin-inspect'
import IndexGenerator from './src/plugins/vite/vite-plugin-react-index-generator'
import * as path from 'path'

import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3004
  },
  resolve: {},
  plugins: [react(), Inspect(), IndexGenerator(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'library',
      fileName: (format) => `main.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled'
        }
      },
      plugins: []
    },
    minify: true
  },
  esbuild: {
    minify: true
  }
})
