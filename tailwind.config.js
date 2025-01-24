import { resolve } from "node:path";
import cssplugin from "./cssplugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": [".65rem", { lineHeight: "1rem" }],
        "3xs": [".55rem", { lineHeight: ".75rem" }],
      },
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "roobert-medium": ["roobert-medium", "sans-serif"],
        "roobert-regular": ["roobert-regular", "sans-serif"],
      },
      colors: {
        "zentry-blue": {
          50: "#DFDFF0",
          75: "#DFDFF2",
          100: "#F0F2FA",
          300: "#4FB7DD",
        },
        "zentry-violet": {
          500: "#5542FF",
          800: "#29227F",
        },
        "zentry-yellow": {
          100: "#8e983f",
          300: "#edff66",
        },
      },
    },
  },
  plugins: [cssplugin(resolve(__dirname, "./src/index.css"))],
};
