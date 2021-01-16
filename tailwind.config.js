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
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animations: {
        spin: 'spin 0s ease-in-out infinite'
      },
      fontFamily: {
        'karla-light': ['Karla-regular', ...defaultTheme.fontFamily.sans],
        'karla-regular': ['Karla-regular', ...defaultTheme.fontFamily.sans],
        'karla-bold': ['Karla-bold', ...defaultTheme.fontFamily.sans],
        system: defaultTheme.fontFamily.sans
      },
      colors: {
        ...defaultTheme.colors,
        gray: defaultTheme.colors.gray,
        'sw-yellow': '#FFE81F'
      }
    }
  },
  variants: {},
  plugins: []
}
