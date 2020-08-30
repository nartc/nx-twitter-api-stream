const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  prefix: '',
  separator: ':',
  future: {
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    fontFamily: {
      sans: ['Poppins', ...fontFamily.sans],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        background: 'var(--background)',
        accent: 'var(--accent)',
        'gray-light': 'var(--gray-light)',
        'gray-medium': 'var(--gray-medium)',
        'gray-dark': 'var(--gray-dark)',
      },
      transitionProperty: {
        image: 'background-image',
      },
      maxHeight: {
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
      },
    },
  },
};
