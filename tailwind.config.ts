import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        page: "#050A14",
        card: "#0B1222",
        "card-hover": "#0E1830",
        input: "#111B30",
        "input-hover": "#152040",
        border: "#1A2540",
        "border-focus": "#0066FF",
        primary: "#E0E6F0",
        secondary: "#7888A0",
        muted: "#4A5A70",
        accent: "#0066FF",
        danger: "#FF4040",
        warning: "#FFD60A",
        "toggle-on": "#0066FF",
        "toggle-off": "#1A2540",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-up": "slide-up 200ms ease-out",
        "fade-in": "fade-in 200ms ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
