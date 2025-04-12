/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        secondary: '#28A745',
        background: '#F8F9FA',
        text: '#343A40',
        accent: '#DC3545',
      }
    },
  },
  plugins: [],
}

