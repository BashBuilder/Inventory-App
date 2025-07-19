import React from "react";
import Logo from "../globals/logo";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 flex h-12 w-full items-center bg-white px-6 shadow">
      <div className="flex items-center gap-2">
        <Logo />
        <p className="font-serif text-lg font-semibold">StockMate</p>
      </div>
    </header>
  );
};

export default Navbar;
