/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        InterBold: ["InterBold", "sans-serif"],
        InterSemiBold: ["InterSemiBold", "sans-serif"],
        InterMedium: ["InterMedium", "sans-serif"],
        InterRegular: ["InterRegular", "sans-serif"],
        InterLight: ["InterLight", "sans-serif"],
        LoraBold: ["LoraBold", "sans-serif"],
        LoraSemiBold: ["LoraSemiBold", "sans-serif"],
        LoraMedium: ["LoraMedium", "sans-serif"],
        LoraRegular: ["LoraRegular", "sans-serif"],
      },
    },
  },
  plugins: [],
};

