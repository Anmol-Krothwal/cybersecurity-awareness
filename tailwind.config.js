/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Mukta': ['Mukta', 'sans-serif'],
        'Allura': ['Allura', 'cursive']
      },
      screens: {
        'max-w-1150': { max: '1150px' },
      }
    },
  },
  plugins: [],
}