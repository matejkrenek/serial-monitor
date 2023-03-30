const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif', 'system-ui']
    },
    extend: {
      keyframes: {
        fade_up: {
          '0%': {
            opacity: 0,
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0px)'
          }
        }
      },
      animation: {
        fade_up: 'fade_up 0.3s ease-in-out'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
