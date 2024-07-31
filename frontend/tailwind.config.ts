import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6E63B4",
        urgent: "#FF6B6B",
        medium: "#FFA235",
        low: "#0ECC5A",
        bgPrimary: "#202020",
      },
      fontFamily: {
        barlow: ["Barlow", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(#4C38C2 0%, #2F2188 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
