/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: true, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
    themes: [
      {
        mytheme: {
        
        "primary": "#91805b",
                
        "secondary": "#4b4e49",
                
        "accent": "#6b7280",
                
        "neutral": "#3a2920",
                
        "base-100": "#1f2937",
                
        "info": "#0057ef",
                
        "success": "#93f400",
                
        "warning": "#ed9c00",
                
        "error": "#c40044",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

