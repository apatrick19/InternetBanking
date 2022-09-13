import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./asset/vendor/font-awesome/css/all.min.css";
import "./asset/vendor/currency-flags/css/currency-flags.min.css";
import "./asset/vendor/daterangepicker/daterangepicker.css";
import "./asset/vendor/bootstrap/css/bootstrap.min.css";
import "./asset/vendor/bootstrap/css/bootstrap-grid.min.css";
import "./asset/vendor/bootstrap/css/bootstrap-reboot.min.css";
import "./asset/css/stylesheet.css";
import "./asset/css/mad.css";
import "./asset/css/mad-resize.css";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
