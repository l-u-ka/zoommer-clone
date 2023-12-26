/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'gray-primary': '#f2f2f2',
        'orange-primary': '#ec5e2a',
        'dark-theme-bg': '#141414'
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
        'firago': ['FiraGO', 'sans-serif'],
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

