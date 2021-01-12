const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: ['./src/**/*.tsx'],
  theme: {
    screens: {
      sm: '576px'
    },
    extend: {
      fontFamily: {
        starjedi: ['Karla-regular', ...defaultTheme.fontFamily.sans],
        system: defaultTheme.fontFamily.sans
      },
      colors: {
        ...defaultTheme.colors,
        'sw-yellow': '#FFE81F'
      }
    }
  },
  variants: {},
  plugins: []
}
