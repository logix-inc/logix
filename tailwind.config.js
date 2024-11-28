import { logix, logixStyles, commonColors } from '@logi-x/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
	presets: [logixStyles],
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@logi-x/theme/dist/**/*.{js,ts,jsx,tsx}',
		'./global/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: 'class',
	theme: {},
	plugins: [
		logix({
			addCommonColors: true
		}),
		require('@tailwindcss/typography')
	]
};
