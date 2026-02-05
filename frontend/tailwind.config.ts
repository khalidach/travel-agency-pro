import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./constants/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "var(--brand-light)",
          DEFAULT: "var(--brand-default)",
          dark: "var(--brand-dark)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
