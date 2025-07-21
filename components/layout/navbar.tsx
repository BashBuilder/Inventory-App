import React from "react";
import Logo from "../globals/logo";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 flex h-12 w-full items-center bg-white px-6 shadow">
      <Logo />
    </header>
  );
};

export default Navbar;
