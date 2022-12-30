/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./src/app.vue",
  ],
  theme: {
    extend: {
      colors: {
        mytrans: "#00000000",
        mypurpleh: "#FF008075",
        myorange: "#FF5733",
        mygreen: "#44FF66",
        myiris: "#5D3FD3",
        myirish: "#5D3FD375",
        mytan: "#D2B48C",
        mytanh: "#D2B48C75",
        myaqua: "#00FFFF",
        myaquah: "#00FFFF75",
        mydarkpurple: "#301934",
        myelecticblue: "#7DF9FF",
      },
      keyframes: {
        cursor: {
          "0%": { border: "solid 1px white", "background-color": "white" },
          "49%": { border: "none 1px white", "background-color": "white" },
          "50%": {
            border: "none 0px white",
            "background-color": "transparent",
          },
          "100%": {
            border: "solid 0px white",
            "background-color": "transparent",
          },
        },
        rm: {
          "0%": { width: "100%", height: "100%", opacity: 1 },
          "100%": { width: "0%", height: "0%", opacity: 0 },
        },
      },
      animation: {
        cursor: "cursor 1s ease-in-out infinite",
        rm: "rm 1s ease-in-out 1",
      },
      fontFamily: {
        Audiowide: ["Audiowide"],
        FrederickatheGreat: ["FrederickatheGreat"],
        PirataOne: ["PirataOne"],
        SnigletExtraBold: ["SnigletExtraBold"],
        Sniglet: ["Sniglet"],
        VT323: ["VT323"],
      },
    },
  },
  plugins: [],
};
