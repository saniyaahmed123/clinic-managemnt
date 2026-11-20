/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: "#00112C",
        paper: "#F5F4EF",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        primary: {
          50: "#E6F0FA",
          100: "#d9e8f5",
          200: "#b8d4ea",
          300: "#8bb8d8",
          400: "#5a93bd",
          500: "#2f719c",
          600: "#00112C",
          700: "#000d22",
          800: "#000918",
          900: "#000512",
        },
        accent: {
          50: "#e6f4f4",
          100: "#c7e6e6",
          200: "#8fcccc",
          300: "#57b3b3",
          400: "#229999",
          500: "#008080",
          600: "#006b6b",
          700: "#005656",
          800: "#004242",
          900: "#002f2f",
        },
        ink: {
          50: "#ffffff",
          100: "#f7fafc",
          200: "#e6f0fa",
          300: "#cbd5e1",
          400: "#a0aec0",
          500: "#718096",
          600: "#4a5568",
          700: "#2D3748",
          800: "#1a202c",
          900: "#00112C",
        },
        brand: {
          navy: "#00112C",
          teal: "#008080",
          ice: "#E6F0FA",
          navy: "#00112C",
          paper: "#F3F2F2",
          body: "#2D3748",
        },
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(0, 17, 44, 0.05), 0 8px 24px -12px rgba(0, 17, 44, 0.16)",
        soft: "0 0 30px 0 rgba(0, 17, 44, 0.1)",
      },
    },
  },
  plugins: [],
};
