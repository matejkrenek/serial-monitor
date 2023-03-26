const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif', 'system-ui']
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
