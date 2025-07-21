"use client";
import React, { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").catch((err) => {
          console.error("SW registration failed:", err);
        });
      });
    }
  }, []);

  return null;
}
