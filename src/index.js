import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { onLCP, onINP, onCLS } from "web-vitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

onCLS(console.log);
onINP(console.log);
onLCP(console.log);
