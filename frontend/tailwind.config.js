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
        navy: {
          DEFAULT: '#0B1F3A',
          mid: '#132844',
          light: '#1D3A5C',
        },
        gold: {
          DEFAULT: '#C9973A',
          light: '#E8B96A',
          dark: '#A0732A',
        },
        cream: '#FAF7F2',
        stone: '#E8E2D9',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(11,31,58,0.10)',
        'card-lg': '0 12px 48px rgba(11,31,58,0.15)',
      },
    },
  },
  plugins: [],
}
