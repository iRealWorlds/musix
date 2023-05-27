/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#49148c',
          800: '#691b9a',
          700: '#7a1fa2',
          600: '#8d24aa',
          500: '#9b27b0',
          400: '#ab47bc',
          300: '#ba68c8',
          200: '#ce93d8',
          100: '#e1bee7',
          50: '#f3e5f5',
        }
      }
    },
  },
  plugins: [],
}
