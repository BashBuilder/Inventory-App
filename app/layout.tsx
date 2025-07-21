import type { Metadata } from "next";
import { Mona_Sans, Nunito_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProider";
import { ServiceWorkerRegister } from "@/providers/PWAProvider";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stock Mate",
  description: "Easily manage your inventory with our app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monaSans.variable} ${monaSans.className} ${nunitoSans.variable} antialiased`}
      >
        <ReduxProvider>
          <ServiceWorkerRegister />
          {/* The ServiceWorkerRegister component is assumed to be imported from providers/PWAProvider.tsx */}
          {/* Ensure that the service worker is registered for PWA functionality */}
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
