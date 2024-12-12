import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a73e8",
        bgColor: "#f7f4ed",
        secondary: "#f4f4f4",
        background: "#FFFFFF",
      },
      spacing: {
        sm: "8px",
        md: "16px",
        lg: "32px",
      },
      borderRadius: {
        custom: "12px",
      },
      boxShadow: {
        custom: "0 4px 6px rgba(69, 123, 157, 0.5)",
      },
    },
  },
  plugins: [nextui()],
};
