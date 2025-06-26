/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
  animation: {
    wiggle: 'wiggle 2s ease-in-out infinite',
  },
  keyframes: {
    wiggle: {
      '0%, 100%': { transform: 'translateX(0)' },
      '25%': { transform: 'translateX(-5px)' },
      '75%': { transform: 'translateX(5px)' },
    },
  },
}

  },
  plugins: [],
};