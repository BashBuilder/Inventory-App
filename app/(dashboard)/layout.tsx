import Navbar from "@/components/globals/navbar";
import Sidebar from "@/components/globals/sidebar";
import React from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <Sidebar />
      <div>{children}</div>
    </main>
  );
}

export default RootLayout;
