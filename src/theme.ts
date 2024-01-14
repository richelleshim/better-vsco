import { extendTheme } from "@mui/joy/styles";

export const theme = extendTheme({
  fontFamily: {
    display: "Gothic A1", // applies to `h1`–`h4`
    body: "Gothic A1", // applies to `title-*` and `body-*`
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#f5f5f5",
          100: "#e9e9e9",
          200: "#d9d9d9",
          300: "#c4c4c4",
          400: "#9d9d9d",
          500: "#7b7b7b",
          600: "#555555",
          700: "#434343",
          800: "#262626",
          900: "#000000",
          solidBg: "var(--joy-palette-primary-800)",
        },
      },
    },
  },
  components: {
    JoyAutocomplete: {
      defaultProps: {
        variant: "soft",
      },
    },
    JoySelect: {
      defaultProps: {
        variant: "soft",
      },
    },
    JoyInput: {
      defaultProps: {
        variant: "soft",
      },
    },
    JoyChip: {
      defaultProps: {
        color: "neutral",
      },
    },
  },
});

// Then, pass it to `<CssVarsProvider theme={theme}>`.
