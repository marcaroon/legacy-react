import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
  },
  server: {
    allowedHosts: [
      "fromlegacy.tqpartner.com",
      "admin.fromlegacy.tqpartner.com",
      "8d4b5f3b7e85.ngrok-free.app",
    ],
  },
});
