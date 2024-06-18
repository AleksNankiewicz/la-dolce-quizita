"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

import { cn } from "@/lib/utils";

import {
  ArrowLeft,
  ArrowRight,
  Book,
  Compass,
  HelpCircle,
  Info,
  LibraryBig,
  LogIn,
  LogOut,
  Menu,
  Moon,
  PlusCircle,
  User,
  UserPlus,
} from "lucide-react";

import { usePathname } from "next/navigation";

export type TNavigaitonShortcut = {
  title: string;
  link?: string;
  altLink?: string;
  icon: React.ReactNode;
  iconStrokeColor?: string;
  iconBackgroundColor?: string;
  themeSwitcher?: boolean;
  loggedOnly?: boolean;
  unloggedOnly?: boolean;
  mobileOnly?: boolean;
};
export const navigationShortcuts: TNavigaitonShortcut[] = [
  {
    title: "Zaloguj się",
    link: "/api/auth/signin",
    altLink: "signIn",
    icon: <LogIn size={30} />,
    iconStrokeColor: "text-orange-500",
    iconBackgroundColor: "bg-orange-500/20",
    unloggedOnly: true,
  },

  {
    title: "Odkrywaj",
    link: "/",
    icon: <Compass size={30} />,
    iconStrokeColor: "text-blue-500",
    iconBackgroundColor: "bg-blue-500/20",
  },
  {
    title: "Profil",
    link: "/profiles",
    icon: <User size={30} />,
    iconStrokeColor: "text-orange-500",
    iconBackgroundColor: "bg-orange-500/20",
    loggedOnly: true,
  },

  {
    title: "Kolekcje",
    link: "/collections",
    icon: <LibraryBig size={30} />,
    iconStrokeColor: "text-green-500",
    iconBackgroundColor: "bg-green-500/20",
    loggedOnly: false,
  },
  {
    title: "Stwórz Quiz",
    link: "/editQuiz/newQuiz",
    icon: <PlusCircle size={30} />,
    iconStrokeColor: "text-orange-500",
    iconBackgroundColor: "bg-orange-500/20",
    loggedOnly: true,
  },
  {
    title: "Tryb Ciemny",
    icon: <Moon size={30} />,
    iconStrokeColor: "text-yellow-500",
    iconBackgroundColor: "bg-yellow-500/20",
    themeSwitcher: true,
  },
  {
    title: "O Nas",
    link: "/about",
    icon: <Info size={30} />,
    iconStrokeColor: "text-purple-500",
    iconBackgroundColor: "bg-purple-500/20",
  },
  {
    title: "Pomoc",
    link: "/help",
    icon: <HelpCircle size={30} />,
    iconStrokeColor: "text-red-500",
    iconBackgroundColor: "bg-red-500/20",
  },
  {
    title: "Wyloguj się",
    link: "/api/auth/signout",
    icon: <LogOut size={30} />,
    iconStrokeColor: "text-gray-500",
    iconBackgroundColor: "bg-gray-500/20",
    loggedOnly: true,
  },
];

const MainSidebar = ({
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
  }, [isHidden, pathName]);

  if (isHidden) return;

  return (
    <div className="fixed left-0 top-[66px] hidden h-full w-[155px] flex-col items-center gap-4 overflow-y-auto border-r bg-background p-3 pb-20 sm:flex lg:w-[220px] lg:items-start">
      {navigationShortcuts.map((shortcut) => {
        if (userSlug && shortcut.unloggedOnly) return null;
        if (!userSlug && shortcut.loggedOnly) return null;
        const shouldHighlight =
          (shortcut.link &&
            shortcut.link !== "/" &&
            pathName.includes(shortcut.link) &&
            !(
              pathName.includes("collections") &&
              pathName.includes("profiles") &&
              shortcut.link === "/collections"
            )) ||
          (pathName.includes(shortcut.altLink as string) &&
            !(
              pathName.includes("collections") &&
              pathName.includes("profiles") &&
              shortcut.link === "/collections"
            )) ||
          pathName === shortcut.link ||
          (pathName.includes("profiles") && shortcut.link === "/profiles");

        return (
          <Link
            href={
              shortcut.link == "/profiles"
                ? `${shortcut.link}/${userSlug}/quizzes`
                : shortcut.link || "#"
            }
            key={shortcut.title}
            className={cn(
              "flex w-full items-center justify-center rounded-xl px-2 py-2 lg:justify-between",
              shouldHighlight ? "bg-primary text-white" : "",
            )}
          >
            <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
              <div
                className={cn(
                  "rounded-full p-2",
                  shortcut.iconStrokeColor,
                  shortcut.iconBackgroundColor,
                )}
              >
                {shortcut.icon}
              </div>
              <h1 className="text-center text-lg font-semibold">
                {shortcut.title}
              </h1>
              {shortcut.themeSwitcher ? <ThemeSwitcher /> : null}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MainSidebar;
