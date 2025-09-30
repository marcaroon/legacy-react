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
      "a5e00b954176.ngrok-free.app",
      "4e7d97a149e8.ngrok-free.app",
    ],
  },
});
