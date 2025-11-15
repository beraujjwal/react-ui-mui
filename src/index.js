import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App.js";
import theme from "./theme/theme.js";
// import { HelmetProvider } from "react-helmet-async";
// import "./utils/i18n.js"; // import before rendering the app

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <HelmetProvider>   */}
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
    {/* </HelmetProvider> */}
  </React.StrictMode>
);
