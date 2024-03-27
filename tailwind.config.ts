import daisyui from "daisyui";
import { Config } from "npm:tailwindcss";

export default {
  // @ts-expect-error daisyui is a valid plugin
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  corePlugins: {
    lineHeight: false,
  },
  theme: {
    container: { center: true },
    extend: {
      fontSize: {
        xs: ["0.75rem", {}],
        sm: ["0.875rem", {}],
        base: ["1rem", {}],
        lg: ["1.125rem", {}],
        xl: ["1.25rem", {}],
        "2xl": ["1.5rem", {}],
        "3xl": ["1.875rem", {}],
        "4xl": ["2.25rem", {}],
        "5xl": ["3rem", {}],
        "6xl": ["3.75rem", {}],
        "7xl": ["4.5rem", {}],
        "8xl": ["6rem", {}],
        "9xl": ["8rem", {}],
      },
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
} satisfies Config;
