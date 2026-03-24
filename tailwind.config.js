/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3faf6',
          100: '#dcefe4',
          200: '#b7dac4',
          300: '#8fc2a2',
          400: '#5ea67b',
          500: '#2f7a58',
          600: '#245f45',
          700: '#1d4d38',
          800: '#183e2f',
          900: '#122f24',
        },
      },
      boxShadow: {
        card: '0 8px 24px rgba(13, 33, 24, 0.08)',
      },
      borderRadius: {
        xl2: '18px',
      },
    },
  },
  plugins: [],
};
