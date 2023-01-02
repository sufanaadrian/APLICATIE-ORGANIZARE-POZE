// color design tokens export
export const colorValues = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    850: "rgba(0, 0, 0, 0.66)",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorValues.primary[200],
              main: colorValues.primary[500],
              light: colorValues.primary[800],
            },
            neutral: {
              dark: colorValues.grey[100],
              main: colorValues.grey[200],
              mediumMain: colorValues.grey[300],
              medium: colorValues.grey[400],
              light: colorValues.grey[700],
            },
            background: {
              default: colorValues.grey[900],
              default_close: colorValues.grey[850],

              alt: colorValues.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorValues.primary[700],
              main: colorValues.primary[500],
              light: colorValues.primary[50],
            },
            neutral: {
              dark: colorValues.grey[700],
              main: colorValues.grey[500],
              mediumMain: colorValues.grey[400],
              medium: colorValues.grey[300],
              light: colorValues.grey[50],
            },
            background: {
              default: colorValues.grey[10],
              default_close: colorValues.grey[0],

              alt: colorValues.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
