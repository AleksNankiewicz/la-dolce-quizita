"use client";
// src/components/ProfileNavbar.tsx

import React, { useEffect } from "react";
import EditProfileDialog from "./EditProfileDialog";
import { User } from "@prisma/client";
import useNavbarStore from "@/lib/store/useNavbarStore";
import { Button } from "@/components/ui/button";

type ProfileNavbarProps = {
  user: User;
  isUserProfile: boolean;
};

const ProfileNavbar = ({ user, isUserProfile }: ProfileNavbarProps) => {
  const setNavbarComponents = useNavbarStore(
    (state) => state.setNavbarComponents,
  );

  useEffect(() => {
    setNavbarComponents([
      <div key={"profile-navbar"} className="flex items-center gap-2">
        {isUserProfile ? (
          <EditProfileDialog user={user} />
        ) : (
          <Button>Obserwuj</Button>
        )}
      </div>,
    ]);
  }, [user, setNavbarComponents]);

  return null;
};

export default ProfileNavbar;
