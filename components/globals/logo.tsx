"use client";
import { RootState } from "@/hooks/store";
import React from "react";
import { useSelector } from "react-redux";

const Logo = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);

  return (
    <div className="flex items-center gap-2">
      <img src={profile?.image} alt={profile?.title} className="h-8 w-8" />
      <p className="font-serif text-lg font-semibold"> {profile?.title} </p>
    </div>
  );
};

export default Logo;
