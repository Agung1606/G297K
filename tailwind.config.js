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
        RobotoRegular: ["RobotoRegular", "sans-serif"],
      },
      colors: {
        blue: "#1D7ED8",
        grayCustom: "#7d7d7d",
      },
    },
  },
  plugins: [],
};
