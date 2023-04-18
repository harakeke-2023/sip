/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './server/public/index.html',
    './client/**/*.{html,js,ts,tsx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    safelist: [
      'animate-[tada_1s_ease-in-out]',
      'animate-[tada_1s_ease-in-out]',
    ],
    extend: {
      colors: {
        perano: {
          50: '#f0f4fd',
          100: '#e4ebfb',
          200: '#ced9f7',
          300: '#bac8f2',
          400: '#91a0e8',
          500: '#7680de',
          600: '#5b5dd0',
          700: '#4c4cb6',
          800: '#404193',
          900: '#393c76',
          950: '#212145',
        },
      },
    },
    // colors: {
    //     50: '#f0f4fd',
    //     100: '#e4ebfb',
    //     200: '#ced9f7',
    //     300: '#bac8f2',
    //     400: '#91a0e8',
    //     500: '#7680de',
    //     600: '#5b5dd0',
    //     700: '#4c4cb6',
    //     800: '#404193',
    //     900: '#393c76',
    //     950: '#212145',
    //   },
    // },
  },
  plugins: [require('tw-elements/dist/plugin.cjs')],
}
