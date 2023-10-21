/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./webview-main-src/**/*.{js,jsx,ts,tsx}"],
  extend: {
    colors: {
      course: '#1sbcbc',
      challenge: '#777ef2',
      bookmark: '#c6a57b',
      accept: '#16a085',
      reject: '#ec6941',
    },
  },
  // safelist: [
  //   {
  //     pattern: /./
  //   },
  //   ],
  plugins: [],
};
