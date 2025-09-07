import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      include: [
        /\.jsx?$/,
        /\.tsx?$/,
        /\.mjs$/,
        /\.cjs$/,
        /\.js$/,
        /index\.jsx$/,
        /App\.jsx$/,
      ],
      exclude: /node_modules/,
    }),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },

  server: {
    port: 8080,
    open: true,
  },

  build: {
    outDir: "./dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ["lodash"],
        },
      },
    },
  },
});
