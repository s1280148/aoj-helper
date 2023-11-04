/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./webview-main-src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        course: {
          lighter: '#28e1e1',
          DEFAULT: '#1abcbc',
          dark: '#148f8f',
        },
        challenge: {
          lighter: '#bdc0f9',
          DEFAULT: '#777ef2',
          dark: '#313ceb',
        },
        bookmark: {
          lighter: '#f7c327',
          DEFAULT: '#c6a57b',
          dark: '#c6a57b',
        },
        arena: {
          lighter: '#65b5f5',
          DEFAULT: '#2196f3',
          dark: '#0b8ef7',
        },
        accept: '#16a085',
        reject: '#ec6941',
        aoj: {
          DEFAULT: '#232a3b',
          click: '#5b5f72',
        },
        darkMode: {
          DEFAULT: '#4f4f4f',
          lighter: '#5e5e5e',
          lightest: '#6e6e6e',
          dark: '#3e3e3e',
          darkest: '#2e2e2e',
          bg: '#1e1e1e',
          text: '#dfdfdf',
        },
      },
    },
  },
  safelist: [
    'p-0',
    'bg-white',
    'dark:bg-darkMode-bg',
    'text-black',
  ],
  plugins: [],
  darkMode: 'class',
  important: true
}
