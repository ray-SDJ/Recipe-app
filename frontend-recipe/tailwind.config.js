/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js, jsx, ts, tsx, mdx}"],
  theme: {
    extend: {},
  },
  plugins: [ require("daisyui")],
};

