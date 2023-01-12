const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						code: {
							backgroundColor: 'hsl(var(--a))',
							color: 'hsl(var(--ac))',
							borderRadius: theme('borderRadius.md')
						},
						'code::before': {
							content: 'normal'
						},
						'code::after': {
							content: 'normal'
						}
					}
				}
			}),
			cursor: {
				grab: 'grab'
			}
		},
		boxShadow: {
			animate:
				'0.5px 0.5px rgba(255,255,255,1), 1.5px 1.5px rgba(255,255,255,1), 2.5px 2.5px rgba(255,255,255,1), 3.5px 3.5px rgba(255,255,255,1), 4.5px 4.5px rgba(255,255,255,1)'
		}
	},
	plugins: [typography, daisyui],
	daisyui: {
		themes: ['night', 'winter']
	}
};
