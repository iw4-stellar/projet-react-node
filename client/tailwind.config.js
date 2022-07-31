/** @type {import('tailwindcss').Config} */
module.exports = {
  dark: "class",
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Quicksand', sans-serif",
      },
      colors: {
        default: "#d9d9d9",
        primary: "#084C61",
        secondary: "#177E89",
        success: "#40B567",
        info: "#323031",
        danger: "#DB3A34",
        warning: "#FFC857",
      },
      borderWidth: {
        10: "10px",
      },
    },
  },
  plugins: [],
};
