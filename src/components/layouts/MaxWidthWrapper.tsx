"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type MaxWidthWrapperProps = {
  children?: React.ReactNode;
  isGame?: boolean;
  className?: string;
};

const MaxWidthWrapper = ({
  children,
  className,
  isGame,
}: MaxWidthWrapperProps) => {
  const [isHidden, setIsHidden] = useState(isGame);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName.includes("game")) setIsHidden(true);
    else setIsHidden(false);
  }, [pathName]);

  return (
    <div
      className={cn(
        "z-10 mx-auto w-[100%] max-w-screen-2xl pl-4 pr-4 sm:pl-[170px] lg:pl-[235px]",
        className,
        isHidden && "pl-4 sm:pl-4 lg:pl-4",
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
