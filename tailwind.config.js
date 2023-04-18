/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './server/public/index.html',
    './client/**/*.{html,js,ts,tsx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {},
    safelist: [
      'animate-[tada_1s_ease-in-out]',
      'animate-[tada_1s_ease-in-out]',
    ],
    colors: {
      tahiti: {
        50: '#f0f4fd',

        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
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
