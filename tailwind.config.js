/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // KiwiQ Brand Colors
        'kiwi-green': '#36B37E',
        'intelligence-blue': '#4A90E2',
        'deep-teal': '#14575A',
        'charcoal-grey': '#2D3748',
        'kiwi-cream': '#F8F5E4',
        'kiwi-seed-brown': '#8B572A',
        'soft-sage': '#D4E5D2',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'nunito': ['Nunito Sans', 'sans-serif'],
      },
      lineHeight: {
        'tight': '1.2',
        'normal': '1.5',
        'relaxed': '1.6',
      },
    },
  },
  plugins: [],
};