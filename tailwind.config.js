/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files:[
      "./views/**/*.ejs",
      "./public/js/**/*.{html, js, ejs}"
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

