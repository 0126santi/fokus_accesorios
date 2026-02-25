/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff', // white
        foreground: '#000000', // black
        primary: '#000000',    // black
        secondary: '#ffffff',  // white
        accent: '#333333',     // dark gray
        card: '#f5f5f5',       // light gray
        muted: '#cccccc',      // gray
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
