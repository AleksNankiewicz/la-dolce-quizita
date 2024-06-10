"use client";
import useNavbarStore from "@/lib/store/useNavbarStore";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

const NavbarComponents = () => {
  const navbarComponents = useNavbarStore((state) => state.navbarComponents);
  const setNavbarComponents = useNavbarStore(
    (state) => state.setNavbarComponents,
  );
  const pathname = usePathname();
  const prevPathnameRef = useRef(""); // Store the previous pathname

  useEffect(() => {
    // Check if the previous pathname's top-level route is different from the current one
    if (pathname.split("/")[1] !== prevPathnameRef.current.split("/")[1]) {
      setNavbarComponents([]);
    }

    // Update the previous pathname
    prevPathnameRef.current = pathname;
  }, [pathname, setNavbarComponents]);

  return (
    <div className="mr-4 flex w-full flex-1 items-center gap-4 sm:mr-0">
      {navbarComponents.map((Component, index) => (
        <div key={index}>{Component}</div>
      ))}
    </div>
  );
};

export default NavbarComponents;
