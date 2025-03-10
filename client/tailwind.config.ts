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
        "black-normal": "rgb(226,226,226)",
        "black-steel": "#b6b6cf",
        primary: "#00c573",
        secondary: "rgb(1,118,69)",
        accent: "#01a55e",
        background: {
          light: "#f6f6f6",
          dark: "#c7c7c7",
        },
        text: {
          primary: "#000000",
          secondary: "#666666",
          light: "#999999",
        },
      },
      gridTemplateColumns: {
        "auto-2": "repeat(2, minmax(0, auto))",
        "auto-3": "repeat(3, minmax(0, auto))",
        "auto-4": "repeat(4, minmax(0, auto))",
        "auto-5": "repeat(5, minmax(0, auto))",
        sidebar: "250px 1fr",
        header: "auto 1fr auto",
        footer: "repeat(auto-fit, minmax(200px, 1fr))",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scale: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        scale: "scale 0.2s ease-out",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        hover:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
