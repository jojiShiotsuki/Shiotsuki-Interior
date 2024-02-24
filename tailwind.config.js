/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/partials/*.{html,js,ejs}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

