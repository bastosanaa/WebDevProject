/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "bubble-gum": "#ff77e9",
        "rosa-claro": "#f8edeb",
        "rosa-claro-1": "#f9f2f2",
        "rosa-inter": "#edcacb",
        "rosa-escuro": "#d78794",
        "branco": "#ffffff",
      },
    },
  },
  plugins: [],
};
