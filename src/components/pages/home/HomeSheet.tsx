import React from "react";
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
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

type Shortcut = {
  title: string;
  link?: string;
  icon: React.ReactNode;
  iconStrokeColor?: string;
  iconBackgroundColor?: string;
  themeSwitcher?: boolean;
  loggedOnly?: boolean;
  unloggedOnly?: boolean;
};

const sheetShortcuts: Shortcut[] = [
  {
    title: "Profil",
    link: "/profiles",
    icon: <User size={30} />,
    iconStrokeColor: "text-orange-500",
    iconBackgroundColor: "bg-orange-500/20",
    loggedOnly: true,
  },
  {
    title: "Zaloguj się",
    link: "/api/auth/login?",
    icon: <LogIn size={30} />,
    iconStrokeColor: "text-orange-500",
    iconBackgroundColor: "bg-orange-500/20",
    unloggedOnly: true,
  },
  {
    title: "Zarejestruj się",
    link: "/api/auth/register?",
    icon: <UserPlus size={30} />,
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
    title: "Biblioteka",
    link: "/",
    icon: <Book size={30} />,
    iconStrokeColor: "text-green-500",
    iconBackgroundColor: "bg-green-500/20",
    loggedOnly: true,
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
    title: "O Quizymanii",
    link: "/",
    icon: <Info size={30} />,
    iconStrokeColor: "text-purple-500",
    iconBackgroundColor: "bg-purple-500/20",
  },
  {
    title: "Centrum Pomocy",
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

type HomeSheetProps = {
  isAuth: boolean;
  userSlug?: string;
};

const HomeSheet = ({ isAuth, userSlug }: HomeSheetProps) => {
  console.log(isAuth);
  return (
    <Sheet>
      <SheetTrigger>
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
            {sheetShortcuts.map((shortcut) => {
              if (isAuth && shortcut.unloggedOnly) return null;
              if (!isAuth && shortcut.loggedOnly) return null;
              return (
                <Link
                  href={
                    shortcut.link == "/profiles"
                      ? `${shortcut.link}/${userSlug}`
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
