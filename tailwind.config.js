module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		neumorphismColor: {
			gray: {
				200: '#E5E7EB',
				400: '#9CA3AF',
				800: '#1F2937',
				neu: '#2C3135',
			},
			red: { 600: '#DC2626' },
			purple: { 600: '#7C3AED' },
		},

		extend: {
			transitionProperty: ['hover', 'focus'],
			backgroundColor: ['active'],
			fontFamily: {
				montserrat: ['"Montserrat"', 'sans-serif'],
			},
			colors: {
				'gray-neu': '#2C3135',
				'neu-violet': '#8934DA',
				'neu-purple': '#611DDE',
			},
			width: { 102: '32rem' },
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
				sm: '20rem',
				md: '40rem',
				'3/4': '75%',
				24: '6rem',
				30: '10rem',
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
		},
	},
	variants: {
		scrollbar: ['rounded'],
		extend: {},
	},
	plugins: [require('tailwindcss-neumorphism'), require('tailwind-scrollbar')],
};
