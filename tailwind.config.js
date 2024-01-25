/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "white-07": "rgba(237, 235, 235, 0.74)",
        'gray-main': '#666',
        'gray-seconday': '#ddd',
        "gray-03": "rgba(237, 237, 237)",
        "orange-primary": "#ec5e2a",
        "dark-theme-bg": "#000",
        "light-theme-bg": "#fff",
        "black-04": "rgba(0,0,0,.4)",
        "black-06": "rgba(0,0,0,.6)",
        "black-07": "rgba(0, 0, 0, 0.7)",
        "black-08": "rgba(0, 0, 0, 0.8)",
        "black-main": "#000",
        "red-08": "rgba(255,0,0,.8)",
        "green-main": "#369260",
        "green-secondary": "#71d8a0",
        "white-600": "#d9d9d9",
        "white-400": "#f2f2f2",
        "text-blue": "rgb(10, 50, 81)",
        "shadow-color": "rgba(0, 0, 0, 0.1)",
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
