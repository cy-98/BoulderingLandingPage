/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#EF2580',
          'orange-light': '#FF5BA5',
          'orange-dark': '#C01E68',
          black: '#0a0a0a',
          'gray-dark': '#1a1a1a',
          'gray-medium': '#2a2a2a',
          'gray-light': '#808080',
        },
      },
    },
  },
  plugins: [],
}

