/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js", // add this line
  ],
  theme: {
    extend: {
      maxWidth: {
        screen: "92rem",
      },
      minWidth: {
        s: "21rem",
        l: "27.5rem",
        xl: "32rem",
      },
      fontSize: {
        xxs: "0.65rem",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
