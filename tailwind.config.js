/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@sk-web-gui/*/dist/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  important: "#servicemoduleroot",
  corePlugins: {
    // preflight: false,
  },
  theme: { extend: {} },
  plugins: [
    //require('@tailwindcss/typography'),
    // require("@tailwindcss/forms"),
    require("@sk-web-gui/core")({
      cssBase: true,
    }),
  ],
  presets: [
    {
      theme: {
        extend: {
          backgroundImage: {
            servanetlogo: "url('../assets/servanetlogo.png')",
          },
          backgroundColor: {
            vux: "#005595",
            servanet: "#0B77B9",
            servanetDark: "#FB77B9",
          },
          fontFamily: {
            vuxHeader: ["Raleway", "Arial", "Helvetica", "sans-serif"],
            vuxDisplay: ["Raleway", "Arial", "Helvetica", "sans-serif"],
            servanetHeader: ["Poppins", "Arial", "Helvetica", "sans-serif"],
            servanetDisplay: ["Poppins", "Arial", "Helvetica", "sans-serif"],
          },
        },
      },
    },
  ],
};
