import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "@/pages/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Register Service Worker for background support and offline capability
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("✓ Service Worker registered for background support");
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}
