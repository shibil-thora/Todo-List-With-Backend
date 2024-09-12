import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Shibil To Do',
        short_name: 'To-Do',
        description: 'Your App Description',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwas.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwas.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
