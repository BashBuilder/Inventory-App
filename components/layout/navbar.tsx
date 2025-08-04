"use client";
import React, { useEffect } from "react";
import Logo from "../globals/logo";
import { getProfile } from "@/lib/db";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "@/hooks/features/authSlice";
import { RootState } from "@/hooks/store";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = React.useState(true);
  const { title, image } = useSelector(
    (state: RootState) => state.auth.profile,
  );

  useEffect(() => {
    getProfile().then((res) => {
      if (res.title && res.image) {
        dispatch(updateProfile({ title: res.title, image: res.image }));
        setPageLoading(false);
      } else {
        router.push("/");
      }
    });
  }, []);

  return (
    <header className="fixed top-0 left-0 flex h-12 w-full items-center bg-white px-6 shadow">
      {pageLoading && (
        <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/50">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {title && image && (
        <div className="flex items-center gap-2">
          <img src={image} alt={title} className="h-8 w-8" />
          <p className="font-serif text-lg font-semibold">{title}</p>
        </div>
      )}
      {/* <Logo /> */}
    </header>
  );
};

export default Navbar;
