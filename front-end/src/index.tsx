import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./shared/theme";
import { AppContextProvider } from "./shared/store/index";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <AppContextProvider>
        <Router>
          <Routes />
        </Router>
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
