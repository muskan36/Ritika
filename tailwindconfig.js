/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          black: "#000000",
          white: "#ffffff",
          primary: "#0B5C64", // your brand's main color
          secondary: "#E9F3F2",
          accent: "#F6A09E",
          muted: "#999999",
          warning: "#FACC15",
          success: "#10B981",
          error: "#EF4444",
          brandGray: "#F5F5F5",
          bgDark: "#1A1A1A",
        },
        fontFamily: {
          instrument: ['var(--font-instrument)', 'sans-serif'],
          inter: ['var(--font-inter)', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
          average: ['var(--font-average)', '"Average Sans"', 'sans-serif'],
          plusjakarta: ['var(--font-plusjakarta)', '"Plus Jakarta Sans"', 'sans-serif'],

        },
        borderRadius: {
          xl: "1.25rem",
          'bl-xl': "0 0 0 1.5rem",
          'br-xl': "0 0 1.5rem 0",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  };
  