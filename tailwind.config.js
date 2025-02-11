/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-outfit)', // Default font (Outfit)
        'dm-serif': 'var(--font-dm-serif)', // Selective font (DM Serif Text)
      },
      colors: {
        sky: {
          DEFAULT: '#85c4d9',
          100: '#112d36',
          200: '#21596c',
          300: '#3286a2',
          400: '#50abc9',
          500: '#85c4d9',
          600: '#9ed1e1',
          700: '#b6dce9',
          800: '#cfe8f0',
          900: '#e7f3f8',
        },
        silver: {
          DEFAULT: '#c9cfcf',
          100: '#262b2b',
          200: '#4d5656',
          300: '#738282',
          400: '#9ea9a9',
          500: '#c9cfcf',
          600: '#d4d9d9',
          700: '#dfe2e2',
          800: '#e9ecec',
          900: '#f4f5f5',
        },
        cement: {
          DEFAULT: '#465354',
          100: '#0e1011',
          200: '#1c2121',
          300: '#2a3132',
          400: '#384243',
          500: '#465354',
          600: '#66797a',
          700: '#8a9c9e',
          800: '#b1bdbe',
          900: '#d8dedf',
        },
        raisin: {
          DEFAULT: '#21262f',
          100: '#07080a',
          200: '#0d0f13',
          300: '#14171d',
          400: '#1b1f27',
          500: '#21262f',
          600: '#454f63',
          700: '#687895',
          800: '#9aa5b9',
          900: '#ccd2dc',
        },
        space: {
          DEFAULT: '#1a1d1e',
          100: '#050606',
          200: '#0a0c0c',
          300: '#101112',
          400: '#151718',
          500: '#1a1d1e',
          600: '#444c4f',
          700: '#6f7b7f',
          800: '#9ea7ab',
          900: '#ced3d5',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}
