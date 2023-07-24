/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
        "2xs": "375px"
      },
      width: {
        98: "26rem",
        99: "30rem",
        100: "36rem",
      },
      height: {
        98: "26rem",
        99: "30rem",
        100: "36rem",
      }
    },
  },
  plugins: [],
}