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
      },
      animation: {
        pulseGlow: 'pulseGlow 2s infinite',
        bounceOnce: 'bounceOnce 0.4s ease-in-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 0px rgba(0, 0, 0, 0.7)',
          },
          '50%': {
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.9)',
          },
        },
        bounceOnce: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
