/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        helvetica: ['Helvetica Neue', 'Arial', 'sans-serif'],
        comic: ['Comic Sans MS', 'Arial', 'sans-serif'],
      },
      colors:{
        medBlue:'rgb(121,178,185)'
      }
    },
  },
  plugins: [],
}