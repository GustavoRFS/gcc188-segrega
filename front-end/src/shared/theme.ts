import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    background: {
      default: "#fef9ff",
      paper: "fef9ff",
    },
    primary: {
      main: "#1793A6",
    },
    secondary: {
      main: "#2B2D42",
    },
    text: {
      primary: "#2B2D42",
      secondary: "#404155",
      disabled: "#404155",
    },
    error: {
      main: "#E9190F",
    },
    success: {
      main: "#4CB944",
    },
    divider: "#2B2D42",
  },
});
