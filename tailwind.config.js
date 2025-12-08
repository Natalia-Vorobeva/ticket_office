/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme"
export default {
	content: [
		// "./src/**/*.{js,jsx,ts,tsx, css}",
		// "./public/index.html"
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
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
					300: '#8BC34A',
					400: '#68c81f',
					500: '#a4a94e',
					600: '#8da399'
				},
				blue: '#00c1c1',
				orange: '#FF5722',
				orangred: '#FFA726',
				red: '#ff2600',
				brown: '#825b3e',
				darkbrown: '#3e2f20',
				midbrown: '#7c7062',
				midgray: '#8c8170',
			},
			fontFamily: {
				montserrat: ["Montserrat", ...fontFamily.sans],
			},
			boxShadow: {
				// 'custom-light': `4px 4px 10px
				//                          rgba(0, 0, 0, 0.1)`,
				// 'custom-dark': `6px 6px 15px
				//                         rgba(0, 0, 0, 0.3)`,
				// 'custom-color': `5px 5px 20px
				//                          rgba(34, 60, 80, 0.7)`,
				'custom-inset': `0px 94px 49px 0px rgba(0, 193, 193, 0.2) inset`
			},
		},
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		}
	},
	animation: {
		pulse: "pulse 0.5s ease-in-out infinite",
	},
	keyframes: {
		pulse: {
			"0%, 100%": {
				opacity: "1"
			},
			"50%": {
				opacity: ".5"
			},
		},
	},
	safelist: [
		{
			pattern:
				/(from|via|to|bg|text|border)-(transparent|current|white|night|black|blue|orange|orangred|red|brown|midbrown|darkbrown|midgreen|midgray)/,
		},
		{
			pattern: /(from|via|to|bg|text|border)-(silver)-(100|200|300|400|500|600|700)/,
		},
		{
			pattern: /(from|via|to|bg|text|border)-(green)-(300|400|500|600)/,
		},
	]
}
