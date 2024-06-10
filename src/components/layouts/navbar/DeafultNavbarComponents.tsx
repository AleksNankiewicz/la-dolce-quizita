import React from "react";
import Link from "next/link";

import { Plus, Sparkles, SquarePen, User } from "lucide-react";
import { cn } from "@/lib/utils";
import NavigationDropdown, {
  TSubHeader,
} from "@/components/ui/NavigationDropdown";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth, signIn, signOut } from "@/auth";
const DeafultNavbarComponents = async () => {
  const session = await auth();

  const user = session?.user;
  return (
    <div>
      {" "}
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
    </div>
  );
};

export default DeafultNavbarComponents;
