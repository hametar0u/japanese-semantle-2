/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": '#fffffe',
        "cardbg": '#faeee7',
        "h1": '#33272a',
        "cardh1": '#33272a',
        "p": '#594a4e',
        "secondary": '#ffc6c7',
        "tertiary": '#c3f0ca',
        "highlight": '#ff8ba7',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
