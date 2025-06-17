import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	// Plugins used (React only)
	plugins: [react(), tailwindcss()],

	// Path alias
	resolve: {
		alias: {
			"@": path.resolve(
				path.dirname(
					fileURLToPath(import.meta.url),
				),
				"./src",
			),
		},
	},

	// Development server settings
	server: {
		port: 8080,
		open: true,
	},

	// Build output settings
	build: {
		outDir: "app",
		emptyOutDir: true,
	},
});
