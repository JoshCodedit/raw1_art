/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-purple": "#6358DC", // Add your custom color here
        "user-dash-main": "#1f2937",
        "main-red": "#FF0000", 
      },
      fontFamily: {
        "main-font": ['Kanit', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};
