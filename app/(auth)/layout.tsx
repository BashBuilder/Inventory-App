import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function RootLayout({ children }: { children: React.ReactNode }) {
  const auth = (await cookies()).get("inventory-auth");

  if (!auth) {
    return redirect("/inventory");
  }

  return <main>{children}</main>;
}

export default RootLayout;
