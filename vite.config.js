import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from 'vite'

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    port: 6001,
    host: '0.0.0.0',
    strictPort: true,
    origin: 'http://localhost:6001',
    proxy: {
      "/api": "http://localhost:8000",
    },
    watch: {},
  }
});
