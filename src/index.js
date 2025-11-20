// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from 'react-redux';
// import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import App from "./App.js";
// import theme from "./theme/theme.js";
// import { store } from './store';
// // import { HelmetProvider } from "react-helmet-async";
// // import "./utils/i18n.js"; // import before rendering the app

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     {/* <HelmetProvider>   */}
//     <BrowserRouter>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <App />
//       </ThemeProvider>
//     </BrowserRouter>
//     {/* </HelmetProvider> */}
//   </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { AppThemeProvider } from './theme/ThemeProvider';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './utils/i18n';
import { store } from './store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
