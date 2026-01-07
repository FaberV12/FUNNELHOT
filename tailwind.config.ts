import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d5ff",
          300: "#a5b8ff",
          400: "#818cff",
          500: "#6366f1", 
          600: "#4f46e5", 
          700: "#4338ca", 
          800: "#3730a3",
          900: "#312e81",
        },
        dark: {
          50: "#1a1b26",
          100: "#16161e",
          200: "#13141a",
          300: "#0f1016",
          400: "#0c0d12",
          500: "#090a0e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
