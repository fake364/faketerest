const colors = require('tailwindcss/colors');

module.exports = {
  content: ['pages/**/*.{js,ts,jsx,tsx}', 'src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        common_radius: 'var(--radius-common)',
        form_radius: 32
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
      animation: {
        move_and_disappear: 'move_up 5s ease-in-out infinite',
        slide_bottom: 'slide-to-second-page 2s ease-in-out infinite alternate',
        form_appearance: 'appearance 0.3s ease-in-out'
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12'
      }
    }
  },

  plugins: [
    require('tailwindcss-animation-delay'),
    require('@tailwindcss/line-clamp')
  ]
};
