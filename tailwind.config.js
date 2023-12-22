/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray-primary': 'rgba(237, 235, 235, 0.74)',
        'orange-primary': '#ec5e2a',
      },
      container: {
        center: true,
        // screens: {
        //   xl: '1280px', // Define the md breakpoint
        // },
        // padding: {
        //   DEFAULT: '5px',
        //   xl: '2rem',
        // },
      },
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

