import React from "react";
import { createRoot } from "react-dom/client";
import { Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import App from "./containers/App";
import { history } from "./utils/historyUtils";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ff6200",
    },
  },
});

const root = createRoot(document.getElementById("root")!);

root.render(
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>
);
