import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import Store from "./store/loginStore";
import { Provider } from "react-redux";
const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
link.integrity =
  "sha384-oCB4kU5MXirSZnU9u0VhboA9hNulPfA4rb6L2zRF0p4U/DBKGT1Gk28h88GGqx8a";
link.crossOrigin = "anonymous";

document.head.appendChild(link);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
reportWebVitals();
