/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./views/*.{html,ejs,js}", "./views/partials/*.{html,ejs,js}", "./views/partials/nav-links/*.{html,ejs,js}"],
  theme: {
    extend: {
      colors: {
          sky: colors.sky,
          teal: colors.teal,
        },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}
