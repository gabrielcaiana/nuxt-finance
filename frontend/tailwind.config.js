/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
    './node_modules/flowbite/**/*.js',
  ],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}
