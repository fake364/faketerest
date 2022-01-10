const colors = require('tailwindcss/colors');

// eslint-disable-next-line no-undef
module.exports = {
	content: ['pages/**/*.{js,ts,jsx,tsx}', 'src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			borderRadius: {
				common_radius: 'var(--radius-common)'
			},
			colors: {
				primary: 'var(--color-primary)',
				primary_hovered: 'var(--color-primary-hovered)',
				secondary: 'var(--color-secondary)',
				secondary_hovered: 'var(--color-secondary-hovered)',
				text_primary: 'var(--color-text-primary)',
				text_secondary: 'var(--color-text-secondary)'
			}
		}
	},

	plugins: []
};
