/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
    "./resources/**/*.jsx",
    "./resources/**/*.tsx",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CC2936',
        secondary: '#800020'
      },
      fontFamily: {
        Montserrat: "Montserrat",
        Poppins: "Poppins"
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

