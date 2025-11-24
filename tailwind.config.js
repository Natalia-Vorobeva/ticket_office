/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx, css}",
		"./public/index.html"
	],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				white: '#ffffff',
				night: '#000',
				black: '#242424',
				silver: {
					100: '#ecebff',
					200: '#deddf0',
					300: '#cdcdde',
					400: '#8DA399',
					500: '#9c9ac9',
					600: '#929292',
					700: '#81818a'
				},
				green: {
					400: '#68c81f',
					500: '#a4a94e',
					600: '#8da399'
				},
				blue: '#00c1c1',
				orange: '#c37a50',
				brown: '#825b3e',
				darkbrown: '#3e2f20',
				midbrown: '#7c7062',
				midgray: '#8c8170',
			},
		},
	},
	safelist: [
		{
			pattern:
				/(from|via|to|bg|text|border)-(transparent|current|white|night|black|orange|brown|midbrown|darkbrown|midgreen|midgray)/,
		},
		{
			pattern: /(from|via|to|bg|text|border)-(silver)-(100|200|300|400|500|600|700)/,
		},
		{
			pattern: /(from|via|to|bg|text|border)-(green)-(400|500|600)/,
		},
	]
}
