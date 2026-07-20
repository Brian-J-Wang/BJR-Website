// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	integrations: [react()],

	vite: {
		plugins: [tailwindcss()],
		resolve: {
			//@ts-ignore
			tsconfigPaths: true,
		},
		optimizeDeps: {
			include: ["cookie"],
		},
	},
	output: "server",

	adapter: node({
		mode: "standalone",
	}),
});
