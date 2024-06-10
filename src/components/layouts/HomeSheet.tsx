"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowLeft,
  ArrowRight,
  Book,
  Compass,
  HelpCircle,
  Info,
  LogIn,
  LogOut,
  Menu,
  Moon,
  PlusCircle,
  User,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationShortcuts } from "./MainSidebar";

type HomeSheetProps = {
  userSlug?: string;
};

const HomeSheet = ({ userSlug }: HomeSheetProps) => {
  // const isMediumScreen = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setOpen(false);
    if (pathName.includes("game")) setIsHidden(true);
    else setIsHidden(false);
  }, [pathName]);
  // if (isMediumScreen) return;

  if (isHidden) return;
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="sm:hidden">
        <Menu size={30} />
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <SheetClose>
              <ArrowLeft strokeWidth={3} />
            </SheetClose>{" "}
            Menu
          </SheetTitle>
          <div className="flex flex-col gap-4 pt-4">
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
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "rounded-full p-2",
                        shortcut.iconStrokeColor,
                        shortcut.iconBackgroundColor,
                      )}
                    >
                      {shortcut.icon}
                    </div>
                    <h1 className="text-xl font-semibold">{shortcut.title}</h1>
                  </div>
                  {shortcut.themeSwitcher ? <ThemeSwitcher /> : <ArrowRight />}
                </Link>
              );
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default HomeSheet;
