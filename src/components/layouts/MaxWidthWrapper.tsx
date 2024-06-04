import { cn } from "@/lib/utils";
import React from "react";

type MaxWidthWrapperProps = {
  children?: React.ReactNode;
  className?: string;
};

const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        "z-10 mx-auto w-[100%] max-w-screen-2xl pl-4 pr-4 sm:pl-[170px] lg:pl-[235px]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
