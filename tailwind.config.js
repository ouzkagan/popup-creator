/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/templates/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', ...defaultTheme.fontFamily.sans],
        inter: ['"Inter"', ...defaultTheme.fontFamily.sans],
        robotomono: ['"Roboto Mono"', ...defaultTheme.fontFamily.sans],
        display: ['"Poppins"'],
        html: ['"Poppins"', 'sans-serif'],
      },
      lineHeight: {
        'extra-loose': '3.375rem',
      },
      backgroundPosition: {
        'left-42': '-42px center',
      },
      letterSpacing: {
        'half-tighter': '-0.03em',
        tigher: '-0.015em',
      },
      colors: {
        '[#777777]': '[#777777]',
        '[#F37C34]': '[#F37C34]',
        '[#000000]': '[#000000]',
        '[#FFFFFF]': '[#FFFFFF]',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
