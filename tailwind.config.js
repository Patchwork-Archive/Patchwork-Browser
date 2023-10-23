/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,tx,jsx,tsx}",
    "./public/index.html"
],
  theme: {
    extend: {
      colors:{
        'background': '#1c1c1c',
        'accent': '#2A4B71',
      },
      animation: {
        spin: 'spin 10s linear infinite'
      }
    },
  },
  plugins: [],
}

