import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/story-app-fe-dicoding/', 

  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'src/public'), 
  
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      srcDir: '.', 
      filename: 'sw.js', 
      registerType: 'autoUpdate',
      injectRegister: null, 
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: 'Dicoding Story App',
        short_name: 'StoryApp',
        description: 'Aplikasi berbagi cerita pengalamanmu',
        theme_color: '#ea2027',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './index.html',
        icons: [
          {
            src: 'images/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'images/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: 'images/screenshot-desktop.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Tampilan Dashboard Desktop'
          },
          {
            src: 'images/screenshot-mobile.png',
            sizes: '360x640',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Tampilan Dashboard Mobile'
          }
        ],
        shortcuts: [
            {
                name: "Tambah Cerita",
                short_name: "Tambah",
                description: "Upload cerita baru sekarang",
                url: "#/add",
                icons: [{ src: "images/icon-192x192.png", sizes: "192x192" }]
            }
        ]
      }
    })
  ]
});