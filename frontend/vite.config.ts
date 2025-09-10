import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - generates stats.html after build
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  css: {
    devSourcemap: false,
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  logLevel: 'info',
  build: {
    // Tree-shaking and optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          utils: ['fuse.js', 'uuid']
        }
      }
    },
    // Enable minification and compression
    minify: 'terser',
    // Generate source maps for production debugging (optional)
    sourcemap: false,
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Asset optimization
    assetsInlineLimit: 4096,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'fuse.js', 'uuid'],
    exclude: []
  },
  // Enable modern features for supported browsers
  esbuild: {
    target: 'es2020',
    drop: ['console', 'debugger'], // Remove console and debugger in production
  }
})
