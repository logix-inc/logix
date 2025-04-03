import { heroui } from '@heroui/react';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}',
		'./src/global/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		extend: {
			colors: {},

			fontFamily: {
				proxima: [
					'var(--font-proxima-nova)',
					'Inter',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Ubuntu',
					'Roboto',
					'Helvetica Neue'
				],
				playfair: [
					'var(--font-playfair)',
					'Inter',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Ubuntu',
					'Roboto',
					'Helvetica Neue'
				],
				muna: [
					'var(--font-muna)',
					'Inter',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Ubuntu',
					'Roboto',
					'Helvetica Neue'
				],
				tajawal: [
					'var(--font-tajawal)',
					'Inter',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Ubuntu',
					'Roboto',
					'Helvetica Neue'
				]
			},
			fontSize: {
				xxs: '0.625rem'
			},
			screens: {
				xxs: '469px',
				xs: '640px',
				sm: '769px',
				md: '1024px',
				lg: '1280px',
				xl: '1536px',
				xxl: '2240px'
			},
			borderRadius: {
				xl: 'calc(var(--radius) + 2px)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: []
};
