"use client";
import useNavbarStore from "@/lib/store/useNavbarStore";
import React, { useEffect } from "react";
import EditCollectionDialog from "../profile/collections/EditCollectionDialog";
import { Collection } from "@prisma/client";
import { usePathname } from "next/navigation";

const CollectionNavbar = ({
  collection,
  isAuthor,
}: {
  collection: Collection;
  isAuthor: boolean;
}) => {
  const setNavbarComponents = useNavbarStore(
    (state) => state.setNavbarComponents,
  );

  const pathName = usePathname();
  if (!isAuthor) return;
  useEffect(() => {
    setNavbarComponents([
      <EditCollectionDialog collection={collection} isEditing />,
    ]);
  }, [collection, pathName, setNavbarComponents]);
  return null;
};

export default CollectionNavbar;
