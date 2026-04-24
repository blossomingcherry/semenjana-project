import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [
    react(),
    basicSsl(),   // ← tambah ini
  ],
  server: {
    host:  "0.0.0.0",
    port:  5173,
    https: true,  // ← tambah ini
    proxy: {
      "/api":     "http://localhost:3001",
      "/uploads": "http://localhost:3001",
    },
  },
});