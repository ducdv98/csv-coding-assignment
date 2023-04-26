module.exports = {
  content: ["./src/**/*.{html,ts}"],
  purge: ["./src/**/*.ts", "./src/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        black: "#000",
        white: "#fff",
        gray: {
          50: "#fafbfc",
          100: "#f7fafc",
          200: "#EBECF0",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
          600: "#718096",
          700: "#4a5568",
          800: "#2d3748",
          900: "#1a202c",
        },
        blue: {
          100: "#ebf8ff",
          150: "#deebffe6",
          200: "#bee3f8",
          300: "#90cdf4",
          400: "#63b3ed",
          500: "#4299e1",
          550: "#4C9AFF",
          600: "#3182ce",
          700: "#2b6cb0",
          800: "#2c5282",
          900: "#2a4365",
        },
        primary: "#0052CC",
        textHeader: "#344563",
        textDark: "#42526E",

        backgroundLight: "#ebecf0",
        backgroundLightest: "#F4F5F7",
        backgroundGray: "#f5f6f8",
        borderLight: "#C1C7D0",
      },
      spacing: {
        sidebar: "240px",
        topbar: "56px",
        boardColumn: "270px",
      },
      fontSize: {
        xxs: "11px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
