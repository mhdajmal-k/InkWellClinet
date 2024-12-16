import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // added to the base
  server: {
    port: 3005,
  },
  define: {
    global: {}, // Add this line to define `global` as an empty object
  },
});
