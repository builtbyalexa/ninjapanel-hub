import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Kumo CSS — order matters
import "@cloudflare/kumo/styles/standalone";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
