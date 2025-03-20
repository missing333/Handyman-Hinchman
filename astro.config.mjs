// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    domains: [],
    remotePatterns: []
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        ecma: 2020,
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 2
        },
        output: {
          comments: false
        }
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Create a vendor chunk for node_modules
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
    // Optimize CSS processing
    css: {
      devSourcemap: false,
    },
    // Add support for HTTP/2 server push by inlining assets
    optimizeDeps: {
      exclude: ['astro:content'],
    },
    ssr: {
      noExternal: []
    }
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  }
});
