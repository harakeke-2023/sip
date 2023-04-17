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
  },
  plugins: [require('tw-elements/dist/plugin.cjs')],
}
