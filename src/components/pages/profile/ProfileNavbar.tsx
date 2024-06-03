import Navbar from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";
import { Settings, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import EditProfileDialog from "./EditProfileDialog";
import { User } from "@prisma/client";

type ProfileNavbarProps = {
  user: User;
  isUserProfile: boolean;
};

const ProfileNavbar = ({ user, isUserProfile }: ProfileNavbarProps) => {
  return (
    <Navbar>
      <div className="flex items-center gap-4">
        <Link href={"/"}>
          <X strokeWidth={3} />
        </Link>

        <h1 className="text-2xl font-bold">Profil</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* <ThemeSwitcher /> */}
        <div className="">
          <EditProfileDialog user={user} />
        </div>
        <Settings size={30} />
      </div>
    </Navbar>
  );
};

export default ProfileNavbar;
