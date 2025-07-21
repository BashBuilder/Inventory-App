import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src="/logo/stockmate.png" alt="logo" className="h-8 w-8" />
      <p className="font-serif text-lg font-semibold">StockMate</p>
    </div>
  );
};

export default Logo;
