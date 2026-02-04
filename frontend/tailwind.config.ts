// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // You can customize your brand "Trevio" blues here
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
