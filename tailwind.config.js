/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-bg": "#fcfcfc",
        "app-black-400": "#05150C",

        "app-green-50": "#1B9D00",
        "app-green-100": "#eef3f0",
        "app-green-200": "#D7DED7",
        "app-green-300": "#70897b",
        "app-green-300": "#71867A",
        "app-green-500": "#018F3B",
        "app-accent": "#C42E1C",
        "app-line": "#D7DED7",

        "app-purple-100": "#ece3fc",

        "app-blue-50": "#ECFAEC",
        "app-blue-100": "#caecfcd8",
        "app-blue-500": "#018F3B",
        "app-blue-500-lighter": "#006affe2",

        "app-dark-blue-50": "#b7c9e3",
        "app-dark-blue-100": "#ecfaed",
        "app-dark-blue-300": "#7081a0",
        "app-dark-blue-400": "#10244f",
        "app-dark-blue-500": "#70897B",

        "app-grey-100": "#f8f9f9",
        "app-primary-200": "#147efa",
        "app-yellow-500": "#9c5721",
        "app-system-success": "#15c077",
        "app-system-error": "#d23b3b",
      },
    },
  },
  plugins: [],
};
