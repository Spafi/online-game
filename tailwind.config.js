module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		minWidth: {
			sm: '20rem',
			24: '6rem',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
			full: '100%',
		},
		maxWidth: {
			102: '32rem',
		},
		maxHeight: {
			'3/4': '75%',
			full: '100%',
		},
		minHeight: {
			0: '0',
			sm: '20rem',
			md: '30rem',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
			screen: '100vh',
			full: '100%',
		},
		extend: {
			fontFamily: {
				montserrat: ['"Montserrat"', 'sans-serif'],
			},
			colors: {
				'neu-gray': '#2C3135',
				'neu-violet': '#8934DA',
				'neu-purple': '#611DDE',
			},
		},
	},
	variants: {
		scrollbar: ['rounded'],
		extend: {},
	},
	plugins: [require('tailwindcss-neumorphism'), require('tailwind-scrollbar')],
};
