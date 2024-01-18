/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js, jsx, ts, tsx, mdx}"],
  // eslint-disable-next-line no-undef
  plugins: [ require("daisyui")],
  daisyui: {
    themes: ["retro"],
  }
};

