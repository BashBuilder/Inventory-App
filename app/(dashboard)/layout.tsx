import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import React from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Sidebar />
      <Navbar />
      <div className="h-screen bg-zinc-50 pt-12 pl-52">{children}</div>
    </main>
  );
}

export default RootLayout;
