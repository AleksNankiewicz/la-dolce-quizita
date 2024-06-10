import { cn } from "@/lib/utils";
import { Compass, Home, PlusSquare, User } from "lucide-react";
import Link from "next/link";
import React from "react";

type BottomNavbarProps = {
  children: React.ReactNode;
  className?: string;
};

const BottomNavbar = ({ children, className }: BottomNavbarProps) => {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 z-50 flex w-full justify-evenly border-t bg-background p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BottomNavbar;
