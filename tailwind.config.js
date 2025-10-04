const { heroui } = require("@heroui/theme");
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/flowbite-react/lib/esm/**/*.js",
		"./node_modules/@heroui/theme/dist/components/(popover|button|ripple|spinner).js",
	],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [require("flowbite/plugin"), heroui()],
};
