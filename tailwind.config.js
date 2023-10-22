/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./webview-main-src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        course: '#1ABCBC',
        challenge: '#777EF2',
        bookmark: '#C6A57B',
        accept: '#16a085',
        reject: '#ec6941',
      },
    },
  },
  // safelist: [
  //   {
  //     pattern: /./
  //   },
  //   ],
  plugins: [],
};
