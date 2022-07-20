/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      xxl: "2560px",
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0FCFEC",
          secondary: "#00a9f5",
          accent: "#3A4256",
          neutral: "#3d4451",
          danger: "#ef4444",
          transparent: "rgba(255, 255, 255, 0)",
          "base-100": "#ffffff",
          // "base-100": "#2A303C",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
};
