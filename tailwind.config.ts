import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        c0: "#F6F9F4",
        c1: "#CAD2C5",
        c2: "#84A98C",
        c3: "#52796F",
        c5: "#354F52",
        point: "#EE8080",
      },
    },
  },
  plugins: [],
};
export default config;
