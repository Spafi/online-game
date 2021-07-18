module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		minWidth: {
			sm: '20rem',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
			full: '100%',
		},
		maxWidth: {
			102: '32rem',
		
		},
		minHeight: {
			0: '0',
			sm: '20rem',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
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
		extend: {},
	},
	plugins: [require('tailwindcss-neumorphism')],
};
