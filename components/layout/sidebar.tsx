"use client";

import { sidebarLinks } from "@/app/(dashboard)/data/statics";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <aside className="fixed top-12 h-[calc(100vh-3.5rem)] w-52 bg-white px-2 py-4 shadow">
      <nav>
        <ul className="space-y-2">
          {sidebarLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center space-x-2 rounded-md p-2 text-sm hover:bg-blue-50 ${
                  pathName === link.href
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
