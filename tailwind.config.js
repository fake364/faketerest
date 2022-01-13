const colors = require('tailwindcss/colors');

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
				text_secondary: 'var(--color-text-secondary)',
				slider_theme: 'var(--slider-theme)'
			},
			keyframes: {
				move_up: {
					'0%': { transform: 'translateY(50%)', opacity: '0' },
					'20%,70%': { opacity: '1', transform: 'translateY(0%)' },
					'100%': { transform: 'translateY(-50%)', opacity: '0' }
				}
			},
			animation: {
				move_up: 'move_up 1s ease-in-out infinite',
				opacity_up: 'opacity_up 1s linear infinite',
				opacity_down: 'opacity_down 1s linear infinite',
				stay_as_it: 'stay_as_it 1s ease-in-out infinite',
				move_and_disappear: 'move_up 3s ease-in-out infinite'
			} // TODO сделать это через keyframes , чтобы остановилось на середине
		}
	},

	plugins: [require('tailwindcss-animation-delay')]
};
