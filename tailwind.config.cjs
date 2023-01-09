const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './main.js'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Space Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        'strong-cyan': 'hsl(172, 67%, 45%)',
        'dark-cyan': 'hsl(183, 100%, 15%)',
        'dark-gray-cyan': 'hsl(186, 14%, 43%)',
        'gray-cyan': 'hsl(184, 14%, 56%)',
        'light-gray-cyan': 'hsl(185, 41%, 84%)',
        'light-gray': ' hsl(189, 41%, 97%)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
