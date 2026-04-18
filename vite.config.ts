import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    // Increase timeout for large audio file loading
    middlewareMode: false,
    // Configure MIME types for audio
    mimeTypes: {
      ".mp3": "audio/mpeg",
    },
  },
  // Optimize build for audio assets
  build: {
    assetsInlineLimit: 0, // Don't inline audio files
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
