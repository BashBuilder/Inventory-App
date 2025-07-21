"use client";

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the native install prompt
    // @ts-ignore
    deferredPrompt.prompt();

    // Wait for the user to respond
    // @ts-ignore
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="fixed right-4 bottom-4 z-50 rounded bg-blue-600 px-4 py-2 text-white shadow-lg"
    >
      Install App
    </button>
  );
}
