import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";

import { init } from "./components/Config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
init();
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
