module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "hover-hover": { raw: "(hover: hover)" },
      },
      colors: {
        darkGray: "#507787",
        darkBlue: "#003F7A",
        borderColor: "#DBDBDB",
        lightGray: "#EFEFEF",
        darkRed: "#F1152B",
        lighBlue: "#009BDB",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
