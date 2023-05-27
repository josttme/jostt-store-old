/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				'4xl': '0px 3px 11px 1px rgba(0,0,0,0.5)'
			}
		}
	},
	plugins: ['prettier-plugin-tailwindcss']
}
