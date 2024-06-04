import Link from "next/link";
import React from "react";
import { Plus, Sparkles, SquarePen, User } from "lucide-react";
import { cn } from "@/lib/utils";
import NavigationDropdown, {
  TSubHeader,
} from "@/components/ui/NavigationDropdown";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import Navbar from "@/components/layouts/Navbar";

import { auth, signIn, signOut } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import HomeSheet from "../pages/home/HomeSheet";

const createQuizSubHeaders: TSubHeader[] = [
  {
    title: "Kreator quizów",
    href: "/editQuiz/newQuiz",
    icon: <SquarePen size={15} />,
  },
  {
    title: "Generuj quiz z AI ",
    href: "/editAiQuiz/newQuiz",
    icon: <Sparkles size={15} />,
  },
];
const MainNavbar = async () => {
  const session = await auth();

  const user = session?.user;
  return (
    <div className="fixed left-0 top-0 z-40 flex w-full items-center justify-between border-b bg-background p-3">
      <h1 className="text-2xl font-bold">Quizymania</h1>

      <div className="hidden items-center gap-4 sm:flex">
        <ThemeSwitcher />
        <Link
          href={"/editQuiz/newQuiz"}
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "flex gap-2",
          )}
        >
          Stwórz Quiz <Plus size={18} />
        </Link>
        {/* <NavigationDropdown
          position="right"
          trigger={
            <Link href={"/editQuiz/newQuiz"} className={cn("flex gap-2")}>
              Stwórz Quiz <Plus size={18} />
            </Link>
          }
          subHeaders={createQuizSubHeaders}
        /> */}

        {/* <NavigationDropdown trigger={<User />} subHeaders={profileSubHeaders} /> */}

        {!user && (
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <Button type="submit" variant={"default"}>
              Zaloguj się
            </Button>
          </form>
        )}
        {user && (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit" variant={"outline"}>
              Wyloguj się
            </Button>
          </form>
        )}
      </div>
      <HomeSheet userSlug={user?.slug} />
    </div>
  );
};

export default MainNavbar;
