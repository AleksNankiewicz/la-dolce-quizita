"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import HomeSheet from "../HomeSheet";
import NavbarComponents from "./NavbarComponents";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";

const Navbar = ({
  userSlug,
  isGame,
}: {
  userSlug?: string;
  isGame: boolean;
}) => {
  const [isHidden, setIsHidden] = useState(isGame);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName.includes("game")) setIsHidden(true);
    else setIsHidden(false);
  }, [pathName]);

  return (
    <div className="fixed left-0 top-0 z-40 flex min-h-[65px] w-full items-center justify-between bg-background p-3">
      {!isHidden && (
        <Link href={"/"} className="text-2xl font-bold">
          <p className="hidden sm:block">Quizymania</p>
          <p className="text-3xl text-primary sm:hidden">Q</p>
        </Link>
      )}
      {!pathName.includes("game") && !pathName.includes("editQuiz") ? (
        <SearchBar />
      ) : null}
      <div className={cn("flex items-center", isHidden && "w-full flex-1")}>
        <NavbarComponents />
        {!isHidden && <HomeSheet userSlug={userSlug} />}
      </div>
    </div>
  );
};

export default Navbar;
