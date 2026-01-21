/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B0000', // Deep Red
        secondary: '#C19A6B', // Earth Yellow
        accent: '#4B0082', // Indigo Blue
        paper: '#fdfbf7', // Warm background
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
