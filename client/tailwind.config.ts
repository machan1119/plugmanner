import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: "Satoshi-Variable",
        clash: "Clashdisplay-Variable",
      },
      colors: {
        "green-light": "rgb(1,197,115)",
        "green-dark": "rgb(1,118,69)",
        "black-light": "#f6f6f6",
        "black-dark": "#c7c7c7",
        "black-medium": "rgb(235,235,235)",
        "black-steel": "#b6b6cf",
      },
      gridTemplateColumns: {
        "auto-2": "repeat(2, minmax(0, auto))",
        "auto-3": "repeat(3, minmax(0, auto))",
        "auto-4": "repeat(4, minmax(0, auto))",
        "auto-5": "repeat(5, minmax(0, auto))",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
