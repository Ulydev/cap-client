// tailwind.config.js
const production = !process.env.ROLLUP_WATCH; // or some other env var like NODE_ENV

const colors = require("tailwindcss/colors")

module.exports = {
  future: { // for tailwind 2.0 compat
    purgeLayersByDefault: true, 
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
    // for tailwind UI users only
    // other plugins here
  ],
  purge: {
    content: [
      "./src/**/*.svelte",
      // may also want to include base index.html
    ], 
    enabled: production // disable purge in dev
  },
  variants: {
    extend: {
      display: ["dark"],
      opacity: ["dark"],
      backgroundOpacity: ["dark"]
    }
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      gray: colors.warmGray,
      white: colors.white,
      primary: {
        100: "#43ff44",
        200: "#39dc38",
        300: "#2fba2c",
        400: "#249820"
      },
      secondary: {
        100: "#c5c5c7",
        200: "#25254f",
        300: "#1e1e44",
        400: "#1d1c3d"
      }
    }
  },
  darkMode: 'class',
};
