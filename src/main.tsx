import React from "react";
import ReactDOM from "react-dom/client";
import { App as CapacitorApp } from "@capacitor/app";
import "./index.css";
import App from "@/pages/App.tsx";
import { notificationManager } from "@/utils/notificationManager";

// Initialize Capacitor and notifications
const initializeApp = async () => {
  try {
    // Initialize notifications on both web and Android
    await notificationManager.initialize();
    console.log("✓ Notifications initialized");
  } catch (error) {
    console.log("Notification initialization:", error);
  }

  // Render React app
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

// Start app initialization
initializeApp();

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

// Handle app pause/resume for Capacitor
if ((window as any).Capacitor) {
  CapacitorApp.addListener("pause", () => {
    console.log("App paused");
  });

  CapacitorApp.addListener("resume", () => {
    console.log("App resumed");
  });
}
