/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#E9D5FF',
            a: {
              color: '#A855F7',
              '&:hover': {
                color: '#9333EA',
              },
            },
            strong: {
              color: '#E9D5FF',
            },
            h1: {
              color: '#E9D5FF',
            },
            h2: {
              color: '#E9D5FF',
            },
            h3: {
              color: '#E9D5FF',
            },
            h4: {
              color: '#E9D5FF',
            },
            code: {
              color: '#E9D5FF',
            },
            pre: {
              backgroundColor: '#000000',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};