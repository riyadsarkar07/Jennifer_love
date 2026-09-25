/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        plum: {
          DEFAULT: "#2B0F2C",
          light: "#3E1A40",
          deep: "#180819",
        },
        rose: {
          DEFAULT: "#C4415C",
          light: "#E88BA0",
        },
        blossom: "#F6C9D0",
        lavender: "#C9A9DD",
        cream: "#FBF3EC",
        gold: "#E8B978",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        script: ["'Meddon'", "cursive"],
        body: ["'Quicksand'", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%": { transform: "translateY(-10vh) translateX(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(110vh) translateX(40px) rotate(200deg)", opacity: "0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px 4px rgba(232,185,120,0.35)" },
          "50%": { boxShadow: "0 0 40px 10px rgba(232,185,120,0.6)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.12)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.12)" },
          "70%": { transform: "scale(1)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 9s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite",
        heartbeat: "heartbeat 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
