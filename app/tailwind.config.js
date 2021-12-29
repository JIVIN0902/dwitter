/// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'twitter-blue': '#1DA1F2',
        'light-black': "rgb(21, 24, 28)",
        'modal-bg': "rgba(91, 112, 131, 0.4)"
      },
      height: {
        'sm': '0.5px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
