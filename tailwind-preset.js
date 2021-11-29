const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      opacity: ['disabled'],
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [
    // common tailwindcss plugins
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    // custom inline plugin implementation with custom styles
    plugin(function ({ addBase }) {
      addBase({
        // example definition of css variables for colors
        ':root': {
          // '--color-primary': '#ff0000',
          // '--color-secondary': '#00ff00',
        },
        // always show scrollbar on Windows to avoid horizontal jank during loading or transitions
        body: {
          overflowY: 'scroll',
        },
        // remove spinner displayed on number inputs on chrome/safari/edge/opera
        'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: '0',
        },
        // remove spinner displayed on number inputs on firefox
        'input[type="number"]': {
          '-moz-appearance': 'textfield',
        },
      })
    }),
  ],
}
