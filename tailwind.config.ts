import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],

	theme: {
		colors: {
			primary: {
				DEFAULT: "",
			},
			neutral: {
				50: "#F5F5F5",
			},
		},
	},
} satisfies Config;
