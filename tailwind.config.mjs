/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
}
