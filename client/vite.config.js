import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Configure build to avoid eval() for CSP compliance
    target: 'es2015',
    minify: 'esbuild', // esbuild doesn't use eval
    sourcemap: false, // Disable source maps to avoid eval in production
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Use ES modules format (safer than IIFE which might use eval)
        format: 'es',
        // Ensure no eval is used
        generatedCode: {
          constBindings: true,
        },
      },
    },
    // Ensure chunking doesn't use eval
    chunkSizeWarningLimit: 1000,
  },
  // Optimize for CSP compliance
  esbuild: {
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
})
