import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/apple-touch-icon.png", "photos/**/*", "music/**/*"],
      workbox: {
        // Precache the app shell + fonts. Photos/music are cached at runtime on
        // first open so the letter still works offline afterwards.
        globPatterns: ["**/*.{js,css,html,woff2,svg,png,ico}"],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => /\/(photos|music)\//.test(url.pathname),
            handler: "CacheFirst",
            options: {
              cacheName: "letter-media",
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 365 },
              rangeRequests: true,
            },
          },
        ],
      },
      manifest: {
        name: "eLoveletter",
        short_name: "Loveletter",
        description: "A letter written for you.",
        theme_color: "#7A1F3D",
        background_color: "#FBF3E7",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
