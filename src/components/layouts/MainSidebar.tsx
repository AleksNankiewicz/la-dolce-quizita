import React from "react";
import { sheetShortcuts } from "../pages/home/HomeSheet";
import { auth } from "@/auth";
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

type TNavigaitonShortcut = {
  title: string;
  link?: string;
  icon: React.ReactNode;
  iconStrokeColor?: string;
  iconBackgroundColor?: string;
  themeSwitcher?: boolean;
  loggedOnly?: boolean;
  unloggedOnly?: boolean;
  mobileOnly?: boolean;
};
const navigationShortcuts: TNavigaitonShortcut[] = [
  {
    title: "Profil",
    link: "/profiles",
    icon: <User size={30} />,
    iconStrokeColor: "text-orange-500",
    iconBackgroundColor: "bg-orange-500/20",
    loggedOnly: true,
  },

  {
    title: "Odkrywaj",
    link: "/",
    icon: <Compass size={30} />,
    iconStrokeColor: "text-blue-500",
    iconBackgroundColor: "bg-blue-500/20",
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
  // {
  //   title: "Tryb Ciemny",
  //   icon: <Moon size={30} />,
  //   iconStrokeColor: "text-yellow-500",
  //   iconBackgroundColor: "bg-yellow-500/20",
  //   themeSwitcher: true,
  // },
  {
    title: "O Quizymanii",
    link: "/",
    icon: <Info size={30} />,
    iconStrokeColor: "text-purple-500",
    iconBackgroundColor: "bg-purple-500/20",
  },
  {
    title: "Pomoc",
    link: "/",
    icon: <HelpCircle size={30} />,
    iconStrokeColor: "text-red-500",
    iconBackgroundColor: "bg-red-500/20",
  },
  {
    title: "Wyloguj się",
    link: "/api/auth/logout",
    icon: <LogOut size={30} />,
    iconStrokeColor: "text-gray-500",
    iconBackgroundColor: "bg-gray-500/20",
    loggedOnly: true,
  },
];

const MainSidebar = async () => {
  const session = await auth();

  const userSlug = session?.user.slug;

  return (
    <div className="fixed left-0 top-[66px] hidden h-full w-[155px] flex-col items-center gap-4 overflow-y-auto border-r bg-background p-3 pb-20 sm:flex lg:w-[220px] lg:items-start">
      {navigationShortcuts.map((shortcut) => {
        if (userSlug && shortcut.unloggedOnly) return null;
        if (!userSlug && shortcut.loggedOnly) return null;
        return (
          <Link
            href={
              shortcut.link == "/profiles"
                ? `${shortcut.link}/${userSlug}/quizzes`
                : shortcut.link || "#"
            }
            key={shortcut.title}
            className="flex items-center justify-between py-2"
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
            </div>
            {shortcut.themeSwitcher ? <ThemeSwitcher /> : null}
          </Link>
        );
      })}
    </div>
  );
};

export default MainSidebar;
