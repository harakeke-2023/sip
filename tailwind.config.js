/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./server/public/index.html', './client/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
