import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import { MuiThemeProvider } from "@material-ui/core";
import Theme from "./Theme";
import App from "./App";

/**
 * The root of the project
 */
ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={Theme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
