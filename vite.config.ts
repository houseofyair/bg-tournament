import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

const REPO_NAME = '/bg-tournament/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    //   manifest: {
    //     name: 'Weekend Board Game Tournament Manager',
    //     short_name: 'TourneyApp',
    //     description: 'Annual weekend tourney manager',
    //     theme_color: '#1a1a1a',
    //     background_color: '#1a1a1a',
    //     display: 'standalone',
    //     orientation: 'portrait',
    //     scope: REPO_NAME,
    //     start_url: REPO_NAME,
    //     icons: [
    //       {
    //         src: 'pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any maskable',
    //       },
    //     ],
    //   },
    //   workbox: {
    //     // Caching strategies for offline capability
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    //     cleanupOutdatedCaches: true,
    //   },
    //   devOptions: {
    //     enabled: true, // Allows you to test the PWA installation in development
    //   },
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
