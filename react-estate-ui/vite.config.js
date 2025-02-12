import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    rollupOptions: {
      external: [ 'mock-aws-s3', 'aws-sdk', 'nock', '@mswjs/interceptors','bcrypt', '@mapbox/node-pre-gyp','jsonwebtoken']
    }
  },
  optimizeDeps: {
    exclude: [ 'mock-aws-s3', 'aws-sdk', 'nock', '@mswjs/interceptors','bcrypt', '@mapbox/node-pre-gyp','jsonwebtoken']
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  plugins: [react()]
})
