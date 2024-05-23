/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          main: "#00146d",
          100: "#e6e8f0",
          200: "#ccd0e2",
          300: "#808ab6",
          400: "#4d5b99",
          500: "#1a2c7c",
          600: "#001262",
          700: "#000e4c",
          800: "#000a37",
          900: "#000621",
        },
      },
    },
  },
  plugins: [],
}

