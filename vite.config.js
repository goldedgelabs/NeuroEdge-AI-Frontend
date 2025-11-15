import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "offline.html", "neuroedge-logo.png"],
      manifest: {
        name: "NeuroEdge AI",
        short_name: "NeuroEdge",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
          {
            src: "/neuroedge-logo.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            // Cache all local static assets (images, CSS, JS)
            urlPattern: /^.*\.(png|jpg|jpeg|svg|css|js)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "asset-cache",
              // FIX APPLIED: 'expiration' object is now correctly structured
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 2592000 // 30 days
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    outDir: "dist",
    minify: "esbuild",
    sourcemap: false
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
