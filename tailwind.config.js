/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-theme-secondary-bg": "rgba(237, 235, 235, 0.74)",
        "white-600": "#d9d9d9",
        "white-400": "#f2f2f2",
        "dark-white-400": "rgba(33,36,38)", //"#1f2223",
        // "dark-white-bg": "rgb(22, 24, 25)",
        "black-main": "#000",
        "dark-black-main": "#e8e6e3",
        "242-600": "rgba(242,242,242,0.6)",
        "gray-main": "#666",
        "dark-gray-main": "#a8a095",
        "gray-seconday": "#ddd",
        "dark-gray-seconday": "rgba(31, 34, 35, 0.3)",
        "gray-03": "rgba(237, 237, 237)",
        "orange-main": "#ec5e2a",
        "dark-orange-main": "#c1471c",
        "text-dark-orange-main": "#ee6b3b",
        "light-theme-bg": "#FFFFFF",
        "dark-theme-bg": "rgb(24, 26, 27)", //#181a1b
        "dark-theme-secondary-bg": "rgba(35, 38, 39, 0.8)", //#1f1f1f
        "light-theme-bg": "#fff",
        "black-04": "rgba(0,0,0,.4)",
        "black-06": "rgba(0,0,0,.6)",
        "dark-black-06": "rgba(232, 230, 227, 0.6)",
        "black-07": "rgba(0, 0, 0, 0.7)",
        "dark-black-07": "rgba(232, 230, 227, 0.7)",
        "black-08": "rgba(0, 0, 0, 0.8)",
        "dark-black-8": "rgba(232, 230, 227, 0.8)",
        "red-08": "rgba(255,0,0,.8)",
        "dark-red-08": "rgba(255, 26, 26, 0.8)",
        "green-main": "#369260",
        "green-secondary": "#71d8a0",
        "text-blue": "rgb(10, 50, 81)",
        "dark-text-blue": "rgb(203, 199, 192)",
        "shadow-color": "rgba(0, 0, 0, 0.1)",
        "gray-shadow": "rgba(102, 102, 102, 0.12)",
        "border-white": "#f2f2f2",
        "border-dark-white": "#34383a",
      },
      // container: {
      //   center: true,
      //   screens: {
      //     xl: '1280px', // Define the md breakpoint
      //   },
      //   padding: {
      //     DEFAULT: '5px',
      //     xl: '2rem',
      //   },
      // },
      fontFamily: {
        firago: ["FiraGO", "sans-serif"],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
