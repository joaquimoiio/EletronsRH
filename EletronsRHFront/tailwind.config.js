/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#004AAD',
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#004AAD',
          600: '#003A8A',
          700: '#002B67',
          800: '#001D45',
          900: '#000E22',
        },
        secondary: {
          DEFAULT: '#FFD700',
          50: '#FFFEF5',
          100: '#FFFCE0',
          200: '#FFF9C2',
          300: '#FFF5A3',
          400: '#FFF285',
          500: '#FFD700',
          600: '#E6C200',
          700: '#B39600',
          800: '#806B00',
          900: '#4D4000',
        },
      },
    },
  },
  plugins: [],
}
