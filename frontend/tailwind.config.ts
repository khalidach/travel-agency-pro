import type { Config } from "tailwindcss";

const config: Config = {
  // Change from ["class"] to "class"
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./constants/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#0ea5e9",
          DEFAULT: "#0d9488",
          dark: "#0369a1",
        },
      },
    },
  },
  plugins: [],
};

export default config;
