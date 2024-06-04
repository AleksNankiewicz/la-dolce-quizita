"use client";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const profileShortcuts = [
  {
    link: "quizzes",
    title: "Quizy",
  },
  {
    link: "favorites",
    title: "Ulubione",
  },
  {
    link: "collections",
    title: "Kolekcje",
  },
];
const ProfileNavigation = ({ slug }: { slug: string }) => {
  const pathName = usePathname();
  return (
    <div className="flex gap-3 sm:hidden">
      {profileShortcuts.map((shortcut) => (
        <Link
          key={shortcut.title}
          href={`/profiles/${slug}/${shortcut.link}`}
          className={cn(
            badgeVariants({
              variant: pathName.includes(shortcut.link) ? "default" : "outline",
            }),
            "w-1/3 cursor-pointer justify-center",
          )}
        >
          {shortcut.title}
        </Link>
      ))}
    </div>
  );
};

export default ProfileNavigation;
