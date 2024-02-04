/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files:[
      "./views/**/*.ejs",
      "./public/js/**/*.js"
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat']
      }
    },
  },
  plugins: [],
}

