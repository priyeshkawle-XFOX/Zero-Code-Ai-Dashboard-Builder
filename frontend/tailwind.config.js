module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {

      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
      },

      keyframes: {
        glow: {
          "0%": {
            textShadow: "0 0 5px #a855f7",
          },
          "100%": {
            textShadow: "0 0 20px #a855f7, 0 0 30px #a855f7",
          },
        },
      },

    },
  },
  plugins: [],
};