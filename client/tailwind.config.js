/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg1: '#333333',
        darkbg2: '#262626',
      },
    },
  },
  plugins: [],
}

