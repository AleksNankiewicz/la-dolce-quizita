"use client";
import { cn } from "@/lib/utils";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";

type NavbarProps = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  exit?: boolean;
};

const Navbar = ({ children, className, title, exit = false }: NavbarProps) => {
  const router = useRouter();

  return (
    <MaxWidthWrapper
      className={cn(
        "fixed top-0 z-[20] flex items-center justify-between border-b bg-background py-4 md:py-2",
        className,
      )}
    >
      {title || exit ? (
        <div className="flex items-center gap-4">
          {exit && (
            <ArrowLeft
              onClick={() => router.back()}
              className="cursor-pointer"
              strokeWidth={3}
            />
          )}
          {title && (
            <h1 className="line-clamp-1 text-2xl font-bold">{title}</h1>
          )}
        </div>
      ) : null}
      {children}
    </MaxWidthWrapper>
  );
};

export default Navbar;
