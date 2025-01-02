import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        custom: "0 4px 10px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.06)",
      },
      animation: {
        "spin-reverse": "spin 1s linear reverse infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
