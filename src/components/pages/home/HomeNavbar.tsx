import Link from "next/link";
import React from "react";
import { Menu, Plus, Sparkles, SquarePen, User } from "lucide-react";
import { cn } from "@/lib/utils";
import NavigationDropdown, {
  TSubHeader,
} from "@/components/ui/NavigationDropdown";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import Navbar from "@/components/layouts/Navbar";
import HomeSheet from "./HomeSheet";
import { db } from "@/lib/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const profileSubHeaders: TSubHeader[] = [
  {
    title: "Profil",
    href: "/profile",
  },
  {
    title: "Biblioteka",
    href: "/profile",
  },
  {
    title: "Ustawienia",
    href: "/profile",
  },
];
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

const HomeNavbar = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const kindeUser = await getUser();
  const isAuth = await isAuthenticated();
  const user = await db.user.findFirst({
    where: {
      kindeId: kindeUser?.id,
    },
  });

  return (
    <Navbar>
      <h1 className="text-2xl font-bold">Quizymania</h1>

      <HomeSheet userSlug={user?.slug} isAuth={isAuth} />
      <div className="hidden gap-4 md:flex">
        <ThemeSwitcher />

        <NavigationDropdown
          position="right"
          trigger={
            <Link href={"/editQuiz/newQuiz"} className={cn("flex gap-2")}>
              Stwórz Quiz <Plus size={18} />
            </Link>
          }
          subHeaders={createQuizSubHeaders}
        />
        <NavigationDropdown trigger={<User />} subHeaders={profileSubHeaders} />
      </div>
    </Navbar>
  );
};

export default HomeNavbar;
