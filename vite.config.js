import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      // Optional: Include SVGR options if needed
      svgrOptions: {
        icon: true, // Treat SVGs as icons (scales properly)
      },
    }),
  ],
});
