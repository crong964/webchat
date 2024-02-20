/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/**/**/*.{html,js,ejs}', './dist/**/*.{html,js,ejs}'],
  theme: {
    extend: {
      boxShadow: {
        "cellphone": "0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15)"
      }
    },
  },
  plugins: [],
}

